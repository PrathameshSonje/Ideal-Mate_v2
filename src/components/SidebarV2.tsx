'use client'

import { useState } from "react"
import { ChevronsLeft, Menu, Plus, MessageSquare, ArrowUpRight } from "lucide-react"
import { Button } from "./ui/button";
import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";
import UploadButton from "./home/uploadButton";
import SearchButton from "./ui/SearchButton";
import { trpc } from "@/app/_trpc/client";

export const SidebarV2 = () => {

    const { data: files, isLoading: isFilesLoading } = trpc.getUserFiles.useQuery();

    return (
        <div className="w-[60px] items-center flex flex-col pb-4 px-2 border-r h-screen">
            <div className="flex-1">
                <div className="flex items-center justify-center h-[55px]">
                    <div className="cursor-pointer hover:bg-zinc-200 p-2 flex items-center justify-center rounded-md h-[36px] w-[36px]">
                    </div>
                </div>
                <div className="h-[44px] w-[44px] my-5">
                    <UploadButton className="h-full w-full" size="icon">
                    </UploadButton>
                </div>
                <div className="h-[44px] w-[44px] mb-2">
                    <SearchButton className="h-full w-full" size="icon">
                    </SearchButton>
                </div>
                <div className="flex flex-col gap-2 max-h-[calc(100vh-280px)] overflow-y-auto hide-scrollbar">
                    {
                        files && (
                            files.map((file) => (
                                <Link key={file.id} href={`/chat/${file.id}`}>
                                    <div
                                        className="shrink-0 h-[44px] w-[44px] border-2 hover:text-zinc-900 rounded-sm flex items-center justify-center font-medium text-zinc-700 text-[15px] cursor-pointer hover:bg-zinc-200"
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
                <div className="h-[44px] w-[44px] bg-zinc-700 rounded-sm flex items-center justify-center font-medium text-zinc-700 text-sm cursor-pointer hover:bg-zinc-600">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4034 12.2803C17.405 12.5414 17.3257 12.7966 17.1763 13.0108C17.0269 13.2249 16.8149 13.3875 16.5693 13.4762L12.4405 15.0019L10.9196 19.1339C10.8296 19.3785 10.6666 19.5897 10.4528 19.7389C10.2389 19.888 9.98446 19.968 9.72373 19.968C9.46301 19.968 9.20855 19.888 8.99471 19.7389C8.78086 19.5897 8.61791 19.3785 8.52784 19.1339L6.99736 15.0019L2.86538 13.481C2.62071 13.3909 2.40954 13.228 2.26038 13.0141C2.11122 12.8003 2.03125 12.5458 2.03125 12.2851C2.03125 12.0244 2.11122 11.7699 2.26038 11.5561C2.40954 11.3422 2.62071 11.1793 2.86538 11.0892L6.99736 9.55875L8.51824 5.42677C8.6083 5.18209 8.77125 4.97092 8.9851 4.82177C9.19895 4.67261 9.4534 4.59263 9.71413 4.59263C9.97485 4.59263 10.2293 4.67261 10.4432 4.82177C10.657 4.97092 10.82 5.18209 10.91 5.42677L12.4405 9.55875L16.5725 11.0796C16.8182 11.1691 17.0302 11.3327 17.179 11.5477C17.3278 11.7628 17.4062 12.0188 17.4034 12.2803ZM12.9208 4.59589H14.2015V5.87662C14.2015 6.04646 14.269 6.20934 14.3891 6.32943C14.5092 6.44953 14.672 6.51699 14.8419 6.51699C15.0117 6.51699 15.1746 6.44953 15.2947 6.32943C15.4148 6.20934 15.4822 6.04646 15.4822 5.87662V4.59589H16.763C16.9328 4.59589 17.0957 4.52842 17.2158 4.40833C17.3359 4.28823 17.4034 4.12535 17.4034 3.95552C17.4034 3.78568 17.3359 3.6228 17.2158 3.50271C17.0957 3.38262 16.9328 3.31515 16.763 3.31515H15.4822V2.03441C15.4822 1.86458 15.4148 1.7017 15.2947 1.5816C15.1746 1.46151 15.0117 1.39404 14.8419 1.39404C14.672 1.39404 14.5092 1.46151 14.3891 1.5816C14.269 1.7017 14.2015 1.86458 14.2015 2.03441V3.31515H12.9208C12.7509 3.31515 12.5881 3.38262 12.468 3.50271C12.3479 3.6228 12.2804 3.78568 12.2804 3.95552C12.2804 4.12535 12.3479 4.28823 12.468 4.40833C12.5881 4.52842 12.7509 4.59589 12.9208 4.59589ZM19.9648 7.15736H19.3245V6.51699C19.3245 6.34716 19.257 6.18428 19.1369 6.06418C19.0168 5.94409 18.8539 5.87662 18.6841 5.87662C18.5143 5.87662 18.3514 5.94409 18.2313 6.06418C18.1112 6.18428 18.0437 6.34716 18.0437 6.51699V7.15736H17.4034C17.2335 7.15736 17.0706 7.22483 16.9505 7.34492C16.8305 7.46501 16.763 7.62789 16.763 7.79773C16.763 7.96757 16.8305 8.13045 16.9505 8.25054C17.0706 8.37063 17.2335 8.4381 17.4034 8.4381H18.0437V9.07847C18.0437 9.24831 18.1112 9.41119 18.2313 9.53128C18.3514 9.65137 18.5143 9.71884 18.6841 9.71884C18.8539 9.71884 19.0168 9.65137 19.1369 9.53128C19.257 9.41119 19.3245 9.24831 19.3245 9.07847V8.4381H19.9648C20.1347 8.4381 20.2975 8.37063 20.4176 8.25054C20.5377 8.13045 20.6052 7.96757 20.6052 7.79773C20.6052 7.62789 20.5377 7.46501 20.4176 7.34492C20.2975 7.22483 20.1347 7.15736 19.9648 7.15736Z" fill="#FFFB99" />
                    </svg>
                </div>
            </Link>
        </div>
    )
}
