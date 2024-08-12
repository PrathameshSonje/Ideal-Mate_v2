import { trpc } from "@/app/_trpc/client";
import ChatWrapper from "@/components/chat/chatWrapper";
import { PdfView } from "@/components/Pdf/PdfView";
import { getFileURL } from "@/lib/data/file";
import { notFound, usePathname } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../../../../auth";
import { Loader2 } from "lucide-react";

interface PageProps {
    params: {
        fileid: string
    }
}

const ChatPage = async ({ params }: PageProps) => {
    // const pathname = usePathname();
    // const fileId = pathname.split('/')[2];

    const session = await auth();
    const { fileid } = params;
    const fileURL = await getFileURL(fileid, session?.user?.id!);

    if (!fileURL) notFound();

    return (
        <div className="flex h-full">
            <div className="flex-1">
                {!fileURL ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <PdfView fileUrl={fileURL!} />
                )}
            </div>
            <div className="flex-1 border-l h-full max-h-[calc(100vh-55px)]">
                <ChatWrapper />
            </div>
        </div>
    )
}

export default ChatPage;