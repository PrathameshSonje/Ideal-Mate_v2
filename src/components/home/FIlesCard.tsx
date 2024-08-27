import { Loader2, Trash } from "lucide-react"
import { CardWrapper } from "./CardWrapper"
import Link from "next/link"
import { SearchBar } from "./SearchBar"
import { SortBy } from "./SortBy"
import { formatDistanceToNow } from 'date-fns';
import UploadButton from "./uploadButton"
import { useCallback, useEffect, useState } from "react"
import { FaRegMessage } from "react-icons/fa6"
import { formatFileSize, sortFilesByDate, sortFilesByName } from "@/lib/helpers/utils"
import { File as FileType } from "@/lib/types/types"
import Skeleton from "react-loading-skeleton"

export const FilesCard = (
    {
        userFiles,
        deleteFile,
        currentlyDeletingFile,
        isFilesLoading
    }:
        {
            userFiles: FileType,
            deleteFile: any,
            currentlyDeletingFile: string | null,
            isFilesLoading: boolean
        }
) => {

    const [Files, setFiles] = useState<FileType | null>(null);

    useEffect(() => {
        setFiles(userFiles);
    }, [isFilesLoading, userFiles])

    const searchFile = useCallback((keyword: string) => {
        if (userFiles) {
            const newFiles = userFiles.filter(({ name }) => {
                return name.toLowerCase().includes(keyword.toLowerCase());
            });
            setFiles(newFiles);
        }
    }, [userFiles]);

    const sortFile = (key: string) => {
        let sortedFiles;
        if (key == 'date') {
            sortedFiles = sortFilesByDate(Files!);
        } else {
            sortedFiles = sortFilesByName(Files!);
        }
        console.log(sortedFiles);
        setFiles(sortedFiles);
    };

    return (
        <CardWrapper className="h-[434px]">
            <div className="flex justify-between gap-2 text-zinc-600 text-sm">
                <SearchBar className="w-full" handleChange={searchFile} />
                <SortBy handleChange={sortFile} />
                <UploadButton className="h-[36px]">
                    Import
                </UploadButton>
            </div>
            <div className="flex flex-col gap-2 w-full mt-10 overflow-y-auto hide-scrollbar max-h-[310px]">
                {isFilesLoading ? (
                    <Skeleton count={8} className="min-h-[33px]" />
                ) : (
                    userFiles && Files?.map((file, index) => {

                        const fileDate = new Date(file.createAt);
                        const timeAgo = formatDistanceToNow(fileDate, { addSuffix: true });
                        const fileSize = formatFileSize(file.size);

                        return (
                            <div key={index} className="text-[15px] flex border-b pb-2 items-center justify-between">
                                <Link href={`/chat/${file.id}`} className=" cursor-pointer">
                                    <div className="flex-1 gap-3 flex pt-[2px] items-center">
                                        <FaRegMessage className="text-zinc-500 shrink-0" />
                                        <span className="font-medium text-zinc-800 hover:text-zinc-600">{file.name}</span>
                                    </div>
                                </Link>
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
                    )
                )}
            </div>
        </CardWrapper>
    )
}
