import { AuthError, CredentialsSignin, type NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/lib/types/types"
import { getUserbyEmail } from "@/lib/data/user"
import bcrypt from 'bcryptjs'

export default {
    providers: [Credentials({
        authorize: async (credentials) => {
            const validatedFields = LoginSchema.safeParse(credentials);

            if (validatedFields.success) {
                const { email, password } = validatedFields.data;

                const userData = await getUserbyEmail(email);
                if (!userData) throw new Error("User not found!");
                if (!userData.password) throw new Error("No password associated with this account")

                const passwordsMatch = await bcrypt.compare(
                    password,
                    userData.password
                )

                const user = {
                    id: JSON.stringify(userData.id),
                    email: userData.email,
                    name: userData.name
                }

                if (passwordsMatch) return user;
            }

            throw new Error("User not found");
        }
    }),
        GitHub,
        Google
    ]
} satisfies NextAuthConfig