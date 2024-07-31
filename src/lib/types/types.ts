import { z } from 'zod'

export interface userInterface {
    name: string,
    imports: number,
    generations: number,
    plan: "regular" | "premium"
}

export const RegisterSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().min(1, { message: "Email is required" }).email(),
})

export const LoginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
})

