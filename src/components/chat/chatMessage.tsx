import { trpc } from "@/app/_trpc/client"
import { Message } from "./message"
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"
import { useContext, useEffect, useRef } from "react"
import { ChatContext } from "./ChatContext"
import { Loader2, MessageSquare } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useIntersection } from '@mantine/hooks'

interface MessageProps {
    fileId: string,
    currentUserName: string
}

export const ChatMessage = ({ fileId, currentUserName }: MessageProps) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    });

    const { isLoading: isAiThinking } = useContext(ChatContext)

    //TODO: Implement infinitQueries
    const { data, isLoading, fetchNextPage } = trpc.getFileMessages.useInfiniteQuery({
        fileId,
        limit: INFINITE_QUERY_LIMIT,
    }, {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
    })



    // const { data, isLoading } =
    //     trpc.getFileMessages.useQuery({
    //         fileId,
    //     })

    const loadingMessage = {
        createdAt: new Date().toISOString(),
        id: 'loading-message',
        isUserMessage: false,
        text: (
            <span className='flex h-full items-center justify-center'>
                <Loader2 className='h-4 w-4 animate-spin' />
            </span>
        ),
    }

    // const messages = data?.pages.flatMap(
    //     (page) => page.messages
    // )

    const messages = data?.pages.flatMap((page) => page.messages)

    const combinedMessages = [
        ...(isAiThinking ? [loadingMessage] : []),
        ...(messages ?? []),
    ]

    useEffect(() => {
        if (entry?.isIntersecting) {
            console.log("next page fetched");
            fetchNextPage()
        }
    }, [entry?.isIntersecting, fetchNextPage])

    return (
        <div className="h-full flex flex-col-reverse gap-8 max-h-[calc(100vh-3.5rem-6rem)] overflow-y-auto scrollbar-thumb-red scrollbar-thumb-rounded scrollbar-track-red-lighter scrollbar-w-2  pr-3" ref={containerRef}>
            {combinedMessages && combinedMessages.length > 0 ? (
                combinedMessages.map((message, i) => {
                    const isNextMessageSamePerson =
                        combinedMessages[i - 1]?.isUserMessage ===
                        combinedMessages[i]?.isUserMessage

                    if (i === combinedMessages.length - 1) {
                        return (
                            <Message
                                ref={ref}
                                message={message}
                                isNextMessageSamePerson={
                                    isNextMessageSamePerson
                                }
                                currentUserName={"msgwithRef"}
                                key={message.id}
                            />
                        )
                    } else
                        return (
                            <Message
                                message={message}
                                isNextMessageSamePerson={
                                    isNextMessageSamePerson
                                }
                                currentUserName={currentUserName}
                                key={message.id}
                            />
                        )
                })
            ) : isLoading ? (
                <div className="w-full">
                    <div className='w-full flex flex-col gap-2 mb-8 items-end'>
                        <div className="w-1/3">
                            <Skeleton />
                        </div>
                        <div className="w-3/4">
                            <Skeleton count={2} className="h-6" />
                        </div>
                    </div>
                    <div className='w-3/4 flex flex-col gap-2 mb-8'>
                        <div className="w-1/3">
                            <Skeleton />
                        </div>
                        <Skeleton count={2} className="h-6" />
                    </div>
                    <div className='w-full flex flex-col gap-2 mb-4 items-end'>
                        <div className="w-1/3">
                            <Skeleton />
                        </div>
                        <div className="w-3/4">
                            <Skeleton count={2} className="h-6" />
                        </div>
                    </div>
                    <div className='w-3/4 flex flex-col gap-2 mb-8'>
                        <div className="w-1/3">
                            <Skeleton />
                        </div>
                        <Skeleton count={2} className="h-6" />
                    </div>
                </div>
            ) : (
                <div className='flex-1 flex flex-col items-center justify-center gap-2'>
                    <MessageSquare className='h-8 w-8 text-orange-500' />
                    <h3 className='font-semibold text-xl'>
                        You&apos;re all set!
                    </h3>
                    <p className='text-zinc-500 text-sm'>
                        Ask your first question to get started.
                    </p>
                </div>
            )}

        </div>
    )
}