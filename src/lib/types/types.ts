import { z } from 'zod'

export interface userInterface {
    name: string,
    imports: number,
    generations: number,
    plan: "regular" | "premium"
}

export const RegisterSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z.string().min(8),
})

export const LoginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z.string().min(8),
})

