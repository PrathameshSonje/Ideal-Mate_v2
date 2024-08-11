import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { FolderSearch, Plus } from "lucide-react";
import { Button } from "./button";
import { DialogHeader } from "./dialog";
import { SearchBar } from "../home/SearchBar";
import { useState, useCallback } from "react";
import { FaRegMessage } from "react-icons/fa6";

const SearchFileCard = () => {

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


    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
            <SearchBar className="w-full h-10 text-[15px]" handleChange={searchFile} />
            <div className="flex flex-col gap-2 w-full mt-5 overflow-y-auto hide-scrollbar max-h-[310px]">
                {userFiles.map((file, index) => {
                    return (
                        <div key={index} className="text-[15px] flex border-b pb-2 items-center justify-between cursor-pointer">
                            <div className="flex-1 gap-3 flex pt-[2px] items-center">
                                <FaRegMessage className="text-zinc-500" />
                                <span className="font-medium text-zinc-800 hover:text-zinc-600">{file.fileName}</span>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

const SearchButton = ({ className, children, size }: { className: string, children?: any, size?: "icon" | null | undefined }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={className} size={size} variant="outline">
                    <FolderSearch className="h-[20px] w-[20xpx] text-zinc-700" strokeWidth={2} />
                    {children}
                </Button>
            </DialogTrigger>

            <DialogContent className="min-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-zinc-700 text-xl">Search a Document</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <SearchFileCard />
            </DialogContent>
        </Dialog>
    )
}

export default SearchButton;