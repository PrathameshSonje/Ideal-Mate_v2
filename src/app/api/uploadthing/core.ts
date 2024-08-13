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
            return { userId: session?.user?.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await prisma.user.update({
                where: {
                    id: metadata.userId
                },
                data: {
                    imports: {
                        increment: 1,
                    }
                },
            });

            await prisma.file.create({
                data: {
                    key: file.key,
                    name: file.name,
                    userId: metadata.userId,
                    url: file.url,
                    size: file.size,
                    uploadstatus: "PROCESSING"
                }
            });
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;