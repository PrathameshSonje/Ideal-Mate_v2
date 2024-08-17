"use server"

import prisma from "@/db/prismaClient";

export const getFile = async (id: string, userId: string) => {
    try {
        console.log("Fetching file with id:", id, "and userId:", userId);

        const file = await prisma.file.findFirst({
            where: {
                id: id,
                userId: userId,
            },
        });

        if (!file) {
            return null;
        }

        return file;
    } catch (error) {
        return null;
    }
};
