import { ChatInput } from "./ChatInput"
import { ChatMessage } from "./ChatMessage"


export const ChatWrapper = () => {
    return (
        <div className="p-4 flex flex-col h-full">
            <div className="flex-grow">
                <ChatMessage />
            </div>
            <div className="w-full mt-4">
                <ChatInput />
            </div>
        </div>
    )
}