import { z } from 'zod'
import prisma from '@/db/prismaClient'
import type { File as PrismaFile, User as PrismaUser } from '@prisma/client';

export type File =  Omit<PrismaFile, 'createAt' | 'updatedAt'> & {
    createAt: string;
    updatedAt: string;
  };
  
export type User = PrismaUser

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

