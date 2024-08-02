import type { NextAuthConfig } from "next-auth"
import Resend from "next-auth/providers/resend"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
    providers: [
        GitHub,
        Google
    ]
} satisfies NextAuthConfig