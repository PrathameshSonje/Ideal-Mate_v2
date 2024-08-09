import { TRPCError, initTRPC } from '@trpc/server'
import { auth } from '../../auth';

const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
    const session = await auth();

    if (!session?.user || !session.user.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return opts.next({
        ctx: {
            userId: session.user.id,
        },
    })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)