"use client"

import { FilesCard } from "@/components/home/FIlesCard";
import { InsightsCard } from "@/components/home/InsightsCard";
import { TodoCard } from "@/components/home/TodoCard";
import { getUserbyEmail } from "@/lib/data/user";
import { auth } from "../../../auth";
import { trpc } from "../_trpc/client";
import { useState } from "react";
import { User } from "@/lib/types/types";

const Page = () => {

    const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null)
    const utils = trpc.useUtils()
    const { data: userFiles, isLoading } = trpc.getUserFiles.useQuery();
    const { data: User, isLoading: userLoading } = trpc.getUser.useQuery();

    const { mutate: deleteFile } = trpc.deleteFile.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate();
            utils.getUser.invalidate();
        },
        onMutate({ id }) {
            setCurrentlyDeletingFile(id)
        },
        onSettled() {
            setCurrentlyDeletingFile(null)
        }
    })

    return (
        <div id="dashboard" className="w-full h-full flex items-center justify-center px-12">
            <div className="grid grid-cols-10 gap-3">
                <div className="flex flex-col gap-3 col-span-7">
                    <InsightsCard User={User!} isLoading={userLoading} />
                    <FilesCard userFiles={userFiles!} isFilesLoading={isLoading} deleteFile={deleteFile} currentlyDeletingFile={currentlyDeletingFile} />
                </div>
                <TodoCard />
            </div>
        </div>
    )
}

export default Page;