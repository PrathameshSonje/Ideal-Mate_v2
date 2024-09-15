import { TypeOf, z } from 'zod';
import { router, publicProcedure, privateProcedure } from './trpc';
import prisma from '@/db/prismaClient';
import { TRPCError } from '@trpc/server';
import { auth } from '../../auth';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { getPineconeClient } from '@/lib/others/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query';

export const appRouter = router({
    getUser:
        privateProcedure.query(async ({ ctx }) => {
            const { userId } = ctx;
            const User = await prisma.user.findFirst({
                where: {
                    id: userId,
                }
            })

            return User

        }),

    getUserFiles:
        privateProcedure.query(async ({ ctx }) => {
            try {
                const { userId } = ctx;
                const files = await prisma.file.findMany({
                    where: {
                        userId: userId
                    },
                    orderBy: {
                        createAt: "desc"
                    }
                })

                return files
            } catch (error) {
                console.error('Error fetching user files:', error);
            }
        }),

    getFile:
        privateProcedure.input(z.object({
            key: z.string()
        })).mutation(
            async ({ ctx, input }) => {
                const { userId } = ctx

                const file = await prisma.file.findFirst({
                    where: {
                        key: input.key,
                        userId,
                    },
                })

                if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

                return file
            }
        ),

    deleteFile:
        privateProcedure.input(z.object({
            id: z.string()
        })).mutation(async ({ ctx, input }) => {
            const { userId } = ctx

            const file = await prisma.file.findFirst({
                where: {
                    id: input.id,
                    userId,
                },
            })

            if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

            await prisma.message.deleteMany({
                where: {
                    fileId: input.id,
                },
            })

            await prisma.file.delete({
                where: {
                    id: input.id,
                },
            })

            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    imports: {
                        decrement: 1
                    }
                }
            })

            return file;
        }),

    uploadWebsite:
        privateProcedure.input(z.object({
            url: z.string().url()
        })).mutation(async ({ ctx, input }) => {
            const { userId } = ctx

            const parsedUrl = new URL(input.url);
            const fileName = `${parsedUrl.hostname}${parsedUrl.pathname}`;

            const createdFile = await prisma.file.create({
                data: {
                    key: "N/A",
                    name: fileName,
                    userId: userId,
                    url: input.url,
                    size: 0,
                    uploadstatus: "PROCESSING"
                }
            })

            try {
                const loader = new CheerioWebBaseLoader(input.url);
                const docs = await loader.load();
                const textSplitter = new RecursiveCharacterTextSplitter({
                    chunkSize: 500,
                    chunkOverlap: 0,
                });
                const allSplits = await textSplitter.splitDocuments(docs);

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

            return createdFile;
        }),

    getFileUploadStatus:
        privateProcedure.input(z.object({
            fileId: z.string()
        })).query(async ({ input, ctx }) => {
            const file = await prisma.file.findFirst({
                where: {
                    id: input.fileId,
                    userId: ctx.userId
                }
            })

            if (!file) return { status: 'PENDING' as const }

            return { status: file.uploadstatus }
        }),

    getFileMessages: privateProcedure.input(
        z.object({
            limit: z.number().min(1).max(100).nullish(),
            cursor: z.string().nullish(),
            fileId: z.string()
        })).query(async ({ ctx, input }) => {
            const { userId } = ctx
            const { fileId, cursor } = input
            const limit = input.limit ?? INFINITE_QUERY_LIMIT


            const file = prisma.file.findFirst({
                where: {
                    id: fileId,
                    userId
                }
            })

            if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

            const messages = await prisma.message.findMany({
                take: limit + 1,
                where: {
                    fileId
                },
                orderBy: {
                    createdAt: 'asc'
                },
                cursor: cursor ? { id: cursor } : undefined,
                select: {
                    id: true,
                    isUserMessage: true,
                    createdAt: true,
                    text: true
                }
            })

            let nextCursor: typeof cursor | undefined = undefined
            if (messages.length > limit) {
                const nextItem = messages.pop()
                nextCursor = nextItem?.id
            }

            return {
                messages,
                nextCursor
            }
        })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;