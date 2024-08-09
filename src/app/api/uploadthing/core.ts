import prisma from "@/db/prismaClient"
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "../../../../auth";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
        .middleware(async ({ req }) => {
            const session = await auth();

            // if (!session?.user || !session.user?.id) throw new Error('unauthorized')
            if (!session?.user) throw new UploadThingError("No user ID");
            
            console.log("session from uploadthing middleware");
            return { userId: session.user?.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const createdFile = await prisma.file.create({
                data: {
                    key: file.key,
                    name: file.name,
                    userId: metadata.userId,
                    url: file.url,
                    uploadstatus: "PROCESSING"
                }
            })
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;