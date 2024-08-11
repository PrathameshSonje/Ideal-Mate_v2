"use client"

import { Loader2, MessageSquare, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { CardWrapper } from "./CardWrapper"
import Link from "next/link"
import { SearchBar } from "./SearchBar"
import { SortBy } from "./SortBy"
import { formatDistanceToNow, parse } from 'date-fns';
import UploadButton from "./uploadButton"
import { useCallback, useState } from "react"
import { FaRegMessage } from "react-icons/fa6"
import { formatFileSize, sortFilesByDate, sortFilesByName } from "@/lib/helpers/utils"
import { trpc } from "@/app/_trpc/client"
import { File } from "@/lib/types/types"

export const FilesCard = () => {
    
    const utils = trpc.useUtils()

    const { mutate: deleteFile } = trpc.deleteFile.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate()
        },
        onMutate({ id }) {
            setCurrentlyDeletingFile(id)
        },
        onSettled() {
            setCurrentlyDeletingFile(null)
        }
    })

    const { data: userFiles, isLoading } =
        trpc.getUserFiles.useQuery();

    const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null)
    // const [userFiles, setUserFiles] = useState<typeof files | undefined>(files);

    // const searchFile = useCallback((keyword: string) => {
    //     setUserFiles(() => {
    //         const newFiles = userFiles?.filter(({ name }) => {
    //             return name.toLowerCase().includes(keyword.toLowerCase());
    //         })

    //         return newFiles;
    //     })
    // }, [])

    // const sortFile = useCallback((key: "DATE" | "NAME") => {
    //     setUserFiles(() => {
    //         return key === "DATE" ? sortFilesByDate(userFiles) : sortFilesByName(userFiles);
    //     })
    // }, [])

    return (
        <CardWrapper className="h-[434px]">
            <div className="flex justify-between gap-2 text-zinc-600 text-sm">
                <SearchBar className="w-full" handleChange={function (keyword: string): void {
                    throw new Error("Function not implemented.")
                }} />
                <SortBy />
                <UploadButton className="h-[36px]">
                    Import
                </UploadButton>
            </div>
            <div className="flex flex-col gap-2 w-full mt-10 overflow-y-auto hide-scrollbar max-h-[310px]">
                {userFiles && userFiles?.map((file, index) => {

                    const fileDate = new Date(file.createAt);
                    const timeAgo = formatDistanceToNow(fileDate, { addSuffix: true });
                    const fileSize = formatFileSize(file.size);

                    return (
                        <div key={index} className="text-[15px] flex border-b pb-2 items-center justify-between cursor-pointer">
                            <div className="flex-1 gap-3 flex pt-[2px] items-center">
                                <FaRegMessage className="text-zinc-500" />
                                <span className="font-medium text-zinc-800 hover:text-zinc-600">{file.name}</span>
                            </div>
                            <div className="flex w-[250px] text-sm justify-between items-center">
                                <span className="text-zinc-500">{fileSize}</span>
                                <span className="text-zinc-500">{timeAgo}</span>
                                <div className="text-[#7d7d7d] hover:text-red-500">
                                    <button className="flex items-center justify-center" onClick={() => {
                                        deleteFile({ id: file.id })
                                    }}>
                                        {currentlyDeletingFile === file.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : <Trash className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </CardWrapper>
    )
}
