import { trpc } from "@/app/_trpc/client";
import ChatWrapper from "@/components/chat/chatWrapper";
import { PdfView } from "@/components/Pdf/PdfView";
import { notFound, usePathname } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../../../../../auth";
import { Loader2 } from "lucide-react";
import { getFile } from "@/lib/data/file";
import { absoluteUrl } from "@/lib/helpers/utils";
import { WebsiteView } from "@/components/Pdf/websiteView";

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
    const file = await getFile(fileid, session?.user?.id!);
    const currentUserName = session?.user?.name

    if (!file) notFound();

    //its a website

    return (
        <div className="flex flex-col md:flex-row h-full">
            {!file ? (
                <div className="w-full h-full flex items-center flex-1 justify-center">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                file.key == "N/A" && file.size == 0 ? (
                    <WebsiteView url={file.url} />
                ) : (
                    <PdfView fileUrl={file.url} />
                )
            )}
            <div className="md:flex-1 border-l h-full max-h-[calc(100vh-60px)]">
                <ChatWrapper fileId={fileid} currentUserName={currentUserName!} />
            </div>
        </div>
    )
}

export default ChatPage;