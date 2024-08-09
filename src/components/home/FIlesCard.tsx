import { MessageSquare, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { CardWrapper } from "./CardWrapper"
import Link from "next/link"
import { SearchBar } from "./SearchBar"
import { SortBy } from "./SortBy"
import { formatDistanceToNow, parse } from 'date-fns';
import UploadButton from "./uploadButton"
import { useCallback, useState } from "react"
import { FaRegMessage } from "react-icons/fa6"

export const FilesCard = () => {

    const files = [{
        fileName: "The mechanics of nuclear fission",
        size: "4 mb",
        date: "14-03-24"
    },
    {
        fileName: "A Tale of Two Cities",
        size: "4 mb",
        date: "14-06-24"
    },
    {
        fileName: "The Little Prince (Le Petit Prince)",
        size: "4 mb",
        date: "14-05-24"
    },
    {
        fileName: "And Then There Were None",
        size: "4 mb",
        date: "26-06-24"
    },
    {
        fileName: "And Then There Were None",
        size: "4 mb",
        date: "26-06-24"
    },
    {
        fileName: "And Then There Were None",
        size: "4 mb",
        date: "26-06-24"
    },
    {
        fileName: "And Then There Were None",
        size: "4 mb",
        date: "26-06-24"
    },
    {
        fileName: "And Then There Were None",
        size: "4 mb",
        date: "26-06-24"
    },
    {
        fileName: "And Then There Were None",
        size: "4 mb",
        date: "26-06-24"
    },
    {
        fileName: "And Then There Were None",
        size: "4 mb",
        date: "26-06-24"
    },
    {
        fileName: "And Then There Were None",
        size: "4 mb",
        date: "26-06-24"
    }]

    const [userFiles, setUserFiles] = useState(files);

    const searchFile = useCallback((keyword: string) => {
        setUserFiles(() => {
            const newFiles = userFiles.filter(({ fileName }) => {
                return fileName.toLowerCase().includes(keyword.toLowerCase());
            })

            return newFiles;
        })
    }, [])

    const sortFile = useCallback((key: "DATE" | "NAME") => {
        setUserFiles(() => {
            return key === "DATE" ? sortFilesByDate(userFiles) : sortFilesByName(userFiles);
        })
    }, [])

    return (
        <CardWrapper className="h-[434px]">
            <div className="flex justify-between gap-2 text-zinc-600 text-sm">
                <SearchBar className="w-full" handleChange={searchFile} />
                <SortBy />
                <UploadButton className="h-[36px]">
                    Import
                </UploadButton>
            </div>
            <div className="flex flex-col gap-2 w-full mt-10 overflow-y-auto hide-scrollbar max-h-[310px]">
                {userFiles.map((file, index) => {

                    const fileDate = parse(file.date, 'dd-MM-yy', new Date());
                    const timeAgo = formatDistanceToNow(fileDate, { addSuffix: true });

                    return (
                        <div key={index} className="text-[15px] flex border-b pb-2 items-center justify-between cursor-pointer">
                            <div className="flex-1 gap-3 flex pt-[2px] items-center">
                                <FaRegMessage className="text-zinc-500" />
                                <span className="font-medium text-zinc-800 hover:text-zinc-600">{file.fileName}</span>
                            </div>
                            <div className="flex w-[250px] text-sm justify-between items-center">
                                <span className="text-zinc-500">{file.size}</span>
                                <span className="text-zinc-500">{timeAgo}</span>
                                <div className="text-[#7d7d7d] hover:text-red-500"><Trash className="h-4" /></div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </CardWrapper>
    )
}