import {
    ReactNode,
    createContext,
    useState,
} from 'react'
import { useToast } from '../ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/client'
import prisma from '@/db/prismaClient'

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

            return response.body
        },
        onMutate: async () => {
            setIsLoading(true)
        },
        onSuccess: () => {
            setIsLoading(false)
        },
        onSettled: async () => {
            setIsLoading(false)
            await utils.getFileMessages.invalidate()
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