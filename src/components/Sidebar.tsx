'use client'

import { useState } from "react"
import { ChevronsLeft, Menu, Plus, MessageSquare, ArrowUpRight } from "lucide-react"
import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";
import UploadButton from "./home/uploadButton";
import { ImLogo, PremiumLogo } from "./IMLogo";
import SearchButton from "./ui/SearchButton";
import { trpc } from "@/app/_trpc/client";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { data: files, isLoading: isFilesLoading } = trpc.getUserFiles.useQuery();
    const pathname = usePathname();
    const fileId = pathname.split('/')[2];

    const handleOnClick = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div className={`h-screen transition-all duration-300 ease-in-out border-r`}>
            {collapsed ? (
                <div className="w-[60px] px-2 flex flex-col h-full pb-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-center h-[60px]">
                            <div
                                className="cursor-pointer hover:bg-zinc-200 p-2 flex items-center justify-center rounded-md h-[36px] w-[36px] transition-all duration-300 ease-in-out"
                                onClick={handleOnClick}
                            >
                                <Menu className="h-[16px] w-[16px] transition-all duration-300 ease-in-out" color="#7d7d7d" />
                            </div>
                        </div>
                        <div className="h-[44px] w-[44px] mb-3 mt-10 transition-all duration-300 ease-in-out">
                            <UploadButton className="h-full w-full" size="icon" />
                        </div>
                        <div className="h-[44px] w-[44px] mb-6">
                            <SearchButton className="h-full w-full" size="icon">
                            </SearchButton>
                        </div>
                        <div className="flex flex-col gap-2 max-h-[calc(100vh-360px)] overflow-y-auto hide-scrollbar">
                            {
                                files && (
                                    files.map((file) => (
                                        <Link key={file.id} href={`/chat/${file.id}`}>
                                            <div
                                                className={clsx(
                                                    "shrink-0 h-[44px] w-[44px] border-2 rounded-sm flex items-center justify-center font-medium text-zinc-700 text-[16px] cursor-pointer transition-all duration-300 ease-in-out hover:text-zinc-900 hover:bg-zinc-200",
                                                    {
                                                        " border-orange-500": file.id === fileId
                                                    }
                                                )}
                                                title={file.name}>
                                                {file.name[0]}
                                            </div>
                                        </Link>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <Link href="/pricing">
                        <div className="h-[44px] w-[44px] bg-zinc-700 rounded-sm flex items-center justify-center font-medium text-zinc-700 text-sm cursor-pointer hover:bg-zinc-600 transition-all duration-300 ease-in-out">
                            <PremiumLogo />
                        </div>
                    </Link>
                </div>
            ) : (
                <div className="w-[260px] px-3.5 flex flex-col pb-4 h-full transition-all duration-300 ease-in-out">
                    <div className="flex-1">
                        <div className="flex items-center justify-between h-[60px]">
                            <div id="logo" className="flex gap-2 items-center justify-center transition-all duration-300 ease-in-out">
                                <ImLogo />
                                <span className="text-zinc-800 font-bold text-xl transition-all duration-300 ease-in-out ">IdealMate.</span>
                            </div>
                            <div
                                className="cursor-pointer hover:bg-zinc-200 p-2 rounded-md transition-all duration-300 ease-in-out"
                                onClick={handleOnClick}
                            >
                                <ChevronsLeft className="h-[20px] w-[20px] transition-all duration-300 ease-in-out" color="#7d7d7d" />
                            </div>
                        </div>
                        <div id="upload_button" className="h-[44px] w-full mb-3 mt-10 transition-all duration-300 ease-in-out">
                            <UploadButton className="w-full h-full">Import</UploadButton>
                        </div>
                        <div className="h-[44px] w-full mb-6">
                            <SearchButton className="h-full w-full shadow-sm" size="icon">
                                Search Documents
                            </SearchButton>
                        </div>
                        <div id="files" className="flex gap-2 flex-col max-h-[calc(100vh-360px)] overflow-y-auto hide-scrollbar">
                            {
                                files && (
                                    files.map((file, index) => (
                                        <Link key={file.id} href={`/chat/${file.id}`}>
                                            <div
                                                key={index}
                                                className={clsx("h-[44px] shrink-0 w-full rounded-sm flex items-center gap-1 justify-between px-2.5 py-2 overflow-hidden text-[15px] font-medium cursor-pointer hover:bg-zinc-200", {
                                                    "border-2 border-orange-500": file.id === fileId
                                                })}
                                            >
                                                <div className="flex-shrink-0 mr-2.5 flex pt-[2px] transition-all duration-300 ease-in-out">
                                                    <FaRegMessage className="text-zinc-500" />
                                                </div>
                                                <div className="flex-grow text-zinc-800 hover:text-zinc-600 overflow-hidden whitespace-nowrap text-ellipsis transition-all duration-300 ease-in-out text-start">
                                                    {file.name}
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <Link href="/pricing">
                        <div className="h-[44px] w-full bg-zinc-700 rounded-sm flex items-center justify-center font-medium text-zinc-700 text-sm cursor-pointer hover:bg-zinc-600 gap-4 transition-all duration-300 ease-in-out overflow-hidden">
                            <PremiumLogo />
                            <span className="text-zinc-200 font-semibold transition-all duration-300 ease-in-out whitespace-nowrap text-ellipsis">Upgrade to Premium</span>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    )
}
