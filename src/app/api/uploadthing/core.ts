import prisma from "@/db/prismaClient"
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "../../../../auth";
import { UploadThingError } from "uploadthing/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { getPineconeClient } from "@/lib/others/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HfInference } from '@huggingface/inference'
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

const f = createUploadthing();

const middleware = async () => {
    const session = await auth();
    if (!session?.user) throw new UploadThingError("No user ID");
    return { userId: session?.user?.id };
}

const onUploadComplete = async ({ metadata, file }: {
    metadata: Awaited<ReturnType<typeof middleware>>
    file: {
        key: string
        name: string
        url: string
        size: number
    }
}) => {

    const isFileExist = await prisma.file.findFirst({
        where: {
            key: file.key,
        },
    })

    if (isFileExist) return

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

    const createdFile = await prisma.file.create({
        data: {
            key: file.key,
            name: file.name,
            userId: metadata.userId,
            url: file.url,
            size: file.size,
            uploadstatus: "PROCESSING"
        }
    });

    try {
        //get the document
        const response = await fetch(file.url)

        const blob = await response.blob();
        const loader = new WebPDFLoader(blob)
        const pageLevelDocs = await loader.load()
        console.log(pageLevelDocs);
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 0,
        });
        const allSplits = await textSplitter.splitDocuments(pageLevelDocs);

        const embeddings = new HuggingFaceInferenceEmbeddings({
            apiKey: process.env.HF_TOKEN,
            model: 'dunzhang/stella_en_1.5B_v5',
        });

        const pinecone = await getPineconeClient()
        const pineconeIndex = pinecone.Index('ideal-mate-v2')
        await PineconeStore.fromDocuments(
            allSplits,
            embeddings,
            {
                pineconeIndex,
                namespace: createdFile.id
            }
        )

        await prisma.file.update({
            data: {
                uploadstatus: 'SUCCESS',
            },
            where: {
                id: createdFile.id,
            },
        })

    } catch (error) {
        await prisma.file.update({
            data: {
                uploadstatus: 'FAILED',
            },
            where: {
                id: createdFile.id,
            },
        })
        console.log(error);

    }
}

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
        .middleware(middleware)
        .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;