import { z } from 'zod';
import { router, publicProcedure, privateProcedure } from './trpc';
import prisma from '@/db/prismaClient';
import { TRPCError } from '@trpc/server';
import { auth } from '../../auth';

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

            const newFile = await prisma.file.create({
                data: {
                    key: "N/A",
                    name: fileName,
                    userId: userId,
                    url: input.url,
                    size: 0,
                    uploadstatus: "PROCESSING"
                }
            })

            return newFile;
        }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;