import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import prisma from "@/db/prismaClient"
import { loginToast } from "@/components/auth/loginToast"

export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    emailVerified: new Date()
                }
            })
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {                
                session.user.id = token.sub.replace(/^"|"$/g, '');
            }
            console.log(session);
            
            return session;
        },
        async jwt({ token }) {
            return token;
        }
    },
    ...authConfig,
})