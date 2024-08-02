import prisma from "@/db/prismaClient";

export const getUserbyId = async (userId : string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user;

    } catch {
        return null
    }
}   

export const getUserbyEmail = async (userEmail: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })

        return user;

    } catch {
        return null
    }
}  