import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { FolderSearch, Plus } from "lucide-react";
import { Button } from "./button";
import { DialogHeader } from "./dialog";
import { SearchBar } from "../home/SearchBar";
import { useState, useCallback, useEffect } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { trpc } from "@/app/_trpc/client";
import Skeleton from "react-loading-skeleton";

const SearchFileCard = () => {

    const { data: Files, isLoading } = trpc.getUserFiles.useQuery();

    const [userFiles, setUserFiles] = useState<typeof Files | null>(null);

    useEffect(() => {
        setUserFiles(Files);
    }, [isLoading])

    const searchFile = useCallback((keyword: string) => {
        if (Files) {
            const newFiles = Files.filter(({ name }) => {
                return name.toLowerCase().includes(keyword.toLowerCase());
            });
            setUserFiles(newFiles);
        }
    }, [Files]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
            <SearchBar className="w-full h-10 text-[15px]" handleChange={searchFile} />
            <div className="flex flex-col gap-2 w-full mt-5 overflow-y-auto hide-scrollbar max-h-[310px]">
                {isLoading ? (
                    <Skeleton />
                ) : (
                    userFiles && userFiles.map((file, index) => (
                        <div key={index} className="text-[15px] flex border-b pb-2 items-center justify-between cursor-pointer">
                            <div className="flex-1 gap-3 flex pt-[2px] items-center">
                                <FaRegMessage className="text-zinc-500" />
                                <span className="font-medium text-zinc-800 hover:text-zinc-600">{file.name}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

const SearchButton = (
    {
        className,
        children,
        size
    }:
        {
            className: string,
            children?: any,
            size?: "icon" | null | undefined
        }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={className} size={size} variant="outline" title="Search Documents">
                    <div className="flex gap-2 transition-all duration-300 ease-in-out text-ellipsis whitespace-nowrap">
                        <FolderSearch className="h-[20px] w-[20xpx] text-zinc-700" strokeWidth={2} />
                        {children}
                    </div>
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