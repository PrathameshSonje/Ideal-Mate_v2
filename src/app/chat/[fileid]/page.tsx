import { ChatWrapper } from "@/components/chat/ChatWrapper";
import { PdfView } from "@/components/Pdf/PdfView";

const ChatPage = () => {
    return (
        <div className="flex h-full">
            <div className="flex-1">
                <PdfView />
            </div>
            <div className="flex-1 border-l h-full">
                <ChatWrapper />
            </div>
        </div>
    )
}

export default ChatPage;