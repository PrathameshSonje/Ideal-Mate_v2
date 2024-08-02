'use server'

import { z } from 'zod'
import { RegisterSchema } from "@/lib/types/types"
import prisma from '@/db/prismaClient'
import { signIn } from '../../auth'
import { AuthError } from 'next-auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/middleware/routes'
import bcrypt from 'bcryptjs'

export const registerUser = async (formData: z.infer<typeof RegisterSchema>) => {    
    const validatedFields = RegisterSchema.safeParse(formData);
    if (!validatedFields) return { error: "Invalid fields" };

    const { email, firstName, lastName, password } = validatedFields.data!


    const existing_user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existing_user) return {
        error: 'Email already in use'
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const new_user = await prisma.user.create({
        data: {
            email,
            password: hashedpassword,
            name: firstName + " " + lastName
        }
    })

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: 'Invalid credentials!' }
                default:
                    return { error: 'something went wrong!' }
            }
        }
        throw error;
    }

    console.log(new_user);
    return { success: "Successfully registered" }
}