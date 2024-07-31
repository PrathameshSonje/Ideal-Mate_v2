import { ChatInput } from "./chatInput"
import { ChatMessage } from "./chatMessage"

const ChatWrapper = () => {
    return (
        <div className="pl-4 py-4 pr-[2px] flex flex-col h-full ">
            <div className="h-full max-h-[calc(100vh-3.5rem-6rem)] overflow-y-auto scrollbar-thumb-red scrollbar-thumb-rounded scrollbar-track-red-lighter scrollbar-w-2 pr-3">
                <ChatMessage />
            </div>
            <div className="w-full mt-4 flex-1 flex items-end">
                <ChatInput />
            </div>
        </div>
    )
}

export default ChatWrapper