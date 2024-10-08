import {
    ReactNode,
    createContext,
    useRef,
    useState,
} from 'react'
import { useMutation } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/client'
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query'

type StreamResponse = {
    addMessage: () => void
    message: string
    handleInputChange: (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => void
    isLoading: boolean
}

interface Props {
    fileId: string
    children: ReactNode
}

export const ChatContext = createContext<StreamResponse>({
    addMessage: () => { },
    message: '',
    handleInputChange: () => { },
    isLoading: false,
})

export const ChatContextProvider = ({
    fileId,
    children,
}: Props) => {
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const utils = trpc.useUtils();
    const backUpMessage = useRef('')

    //TODO: Implement optimistic updates
    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({
            message,
        }: {
            message: string
        }) => {
            const response = await fetch('/api/message', {
                method: 'POST',
                body: JSON.stringify({
                    fileId,
                    message,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to send message')
            }

            return await response.text()
        },
        onMutate: async ({ message }) => {
            backUpMessage.current = message
            setMessage('')

            await utils.getFileMessages.cancel()
            const previousMessages = utils.getFileMessages.getInfiniteData()

            utils.getFileMessages.setInfiniteData(
                { fileId, limit: INFINITE_QUERY_LIMIT },
                (old) => {
                    if (!old) {
                        return {
                            pages: [],
                            pageParams: [],
                        }
                    }

                    let newPages = [...old.pages]

                    let latestPage = newPages[0]!

                    latestPage.messages = [
                        {
                            createdAt: new Date().toISOString(),
                            id: crypto.randomUUID(),
                            text: message,
                            isUserMessage: true,
                        },
                        ...latestPage.messages,
                    ]

                    newPages[0] = latestPage

                    return {
                        ...old,
                        pages: newPages,
                    }
                }
            )

            setIsLoading(true)

            return {
                previousMessages:
                    previousMessages?.pages.flatMap(
                        (page) => page.messages
                    ) ?? [],
            }
        },
        onSuccess: async (accResponse) => {
            setIsLoading(false)

            // if (!stream) {
            //     return toast.error('There was a problem sending this message')
            // }

            // const reader = stream.getReader();
            // const decoder = new TextDecoder('utf-8');
            // let done = false

            // let accResponse = ''

            utils.getFileMessages.setInfiniteData(
                { fileId, limit: INFINITE_QUERY_LIMIT },
                (old) => {
                    if (!old) return { pages: [], pageParams: [] };

                    let isAiResponseCreated = old.pages.some(
                        (page) =>
                            page.messages.some(
                                (message) => message.id === 'ai-response'
                            )
                    );

                    let updatedPages = old.pages.map((page) => {
                        if (page === old.pages[0]) {
                            let updatedMessages;

                            if (!isAiResponseCreated) {
                                updatedMessages = [
                                    {
                                        createdAt: new Date().toISOString(),
                                        id: 'ai-response',
                                        text: accResponse,
                                        isUserMessage: false,
                                    },
                                    ...page.messages,
                                ];
                            } else {
                                updatedMessages = page.messages.map((message) => {
                                    if (message.id === 'ai-response') {
                                        return {
                                            ...message,
                                            text: accResponse,
                                        };
                                    }
                                    return message;
                                });
                            }

                            return {
                                ...page,
                                messages: updatedMessages,
                            };
                        }

                        return page;
                    });

                    return { ...old, pages: updatedPages };
                }
            );



        },
        onSettled: async () => {
            setIsLoading(false)
            await utils.getFileMessages.invalidate({ fileId })
        }
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMessage(e.target.value)
    }

    const addMessage = () => sendMessage({ message })

    return (
        <ChatContext.Provider
            value={{
                addMessage,
                message,
                handleInputChange,
                isLoading,
            }}>
            {children}
        </ChatContext.Provider>
    )

}