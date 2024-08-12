"use server"

import prisma from "@/db/prismaClient";

export const getFileURL = async (id: string, userId: string) => {
    try {
        console.log("Fetching file with id:", id, "and userId:", userId);
        
        const file = await prisma.file.findFirst({
            where: {
                id: id,
                userId: userId,
            },
        });

        if (!file) {
            console.log("File not found");
            return null;
        }

        console.log("File found:", file.url);
        return file.url;
    } catch (error) {
        console.error("Error fetching file URL:", error);
        return null;
    }
};
