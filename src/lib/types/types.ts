import { z } from 'zod'
import { AppRouter } from '@/server'
import { inferRouterOutputs } from '@trpc/server'

type RouterOutput = inferRouterOutputs<AppRouter>

export type File = RouterOutput['getUserFiles']
export type User = RouterOutput['getUser']
export type SingleFile = RouterOutput['getFile']

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

