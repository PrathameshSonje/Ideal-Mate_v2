import { TRPCError, initTRPC } from '@trpc/server'
import { auth } from '../../auth';
import { getUserbyEmail } from '@/lib/data/user';

const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
    const session = await auth();

    const user = await getUserbyEmail(session?.user?.email!);

    if (!session?.user || !user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return opts.next({
        ctx: {
            userId: user?.id,
        },
    })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)