import ChatWrapper from "@/components/chat/chatWrapper";
import { PdfView } from "@/components/Pdf/PdfView";

const ChatPage = () => {
    return (
        <div className="flex h-full">
            <div className="flex-1">
                <PdfView fileUrl="/Prathames-72288231K-Capstone-Project.pdf" />
            </div>
            <div className="flex-1 border-l h-full max-h-[calc(100vh-55px)]">
                <ChatWrapper />
            </div>
        </div>
    )
}

export default ChatPage;