import { trpc } from "@/app/_trpc/client"
import { Message } from "./message"
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query"
import { useContext } from "react"
import { ChatContext } from "./ChatContext"
import { Loader2 } from "lucide-react"

interface MessageProps {
    fileId: string
}

export const ChatMessage = ({ fileId }: MessageProps) => {

    const { isLoading: isAiThinking } =
        useContext(ChatContext)

    const { data, isLoading, fetchNextPage } =
        trpc.getFileMessages.useInfiniteQuery(
            {
                fileId,
                limit: INFINITE_QUERY_LIMIT,
            },
            {
                getNextPageParam: (lastPage) => lastPage?.nextCursor,
            }
        )

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

    const messages = data?.pages.flatMap(
        (page) => page.messages
    )

    const combinedMessages = [
        ...(isAiThinking ? [loadingMessage] : []),
        ...(messages ?? []),
    ]

    return (
        <div className="h-full flex flex-col gap-8">
            <Message message="hello there" isUserMessage={combinedMessages[0].isUserMessage} />
        </div>
    )
}