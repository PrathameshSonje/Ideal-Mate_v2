'use server'

import * as z from 'zod'
import { signIn } from '../../auth';
import { LoginSchema } from '@/lib/types/types';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields" }

    const { email } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            redirectTo: '/'
        })
    } catch(error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: 'Invalid credentials!'}
                default:
                    return { error: 'something went wrong!'}
            }
        }
        throw error;
    }
}