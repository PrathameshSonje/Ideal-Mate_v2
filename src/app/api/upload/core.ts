import prisma from "@/db/prismaClient"
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "../../../../auth";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await auth();

      if (!session || !session.user?.id) throw new Error('unauthorized')
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