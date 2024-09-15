'use client'

import { trpc } from "@/app/_trpc/client"
import { ChatInput } from "./chatInput"
import { ChatMessage } from "./chatMessage"
import { ChevronLeft, Loader2, XCircle } from "lucide-react"
import { buttonVariants } from "../ui/button"
import Link from "next/link"
import { ChatContextProvider } from "./ChatContext"

const ChatWrapper = (
    {
        fileId,
        currentUserName
    }: {
        fileId: string,
        currentUserName: string
    }) => {

    const { data, isLoading } =
        trpc.getFileUploadStatus.useQuery(
            {
                fileId: fileId
            },
            {
                refetchInterval: (data) =>
                    data.state.data?.status === 'SUCCESS' ||
                        data.state.data?.status === 'FAILED'
                        ? false
                        : 500
            }
        )

    if (isLoading)
        return (
            <div className='pl-4 py-4 pr-[2px] flex flex-col h-full'>
                <div className='flex-1 flex justify-center items-center flex-col mb-28'>
                    <div className='flex flex-col items-center gap-2'>
                        <Loader2 className='h-7 w-7 text-orange-500 animate-spin' />
                        <p className='text-zinc-500 text-sm font-medium'>
                            We&apos;re preparing your PDF.
                        </p>
                    </div>
                </div>
                <div className="w-full mt-4 flex items-end">
                    <ChatInput isDisabled />
                </div>
            </div>
        )

    if (data?.status === 'PROCESSING')
        return (
            <div className='pl-4 py-4 pr-[2px] flex flex-col h-full'>
                <div className='flex-1 flex justify-center items-center flex-col mb-28'>
                    <div className='flex flex-col items-center gap-2'>
                        <Loader2 className='h-7 w-7 text-orange-500 animate-spin' />
                        <p className='text-zinc-500 text-sm font-medium'>
                            This Won&apos;t take long.
                        </p>
                    </div>
                </div>
                <div className="w-full mt-4 flex items-end">
                    <ChatInput isDisabled />
                </div>
            </div>
        )

    if (data?.status === 'FAILED')
        return (
            <div className='pl-4 py-4 pr-[2px] flex flex-col h-full'>
                <div className='flex-1 flex justify-center items-center flex-col mb-28'>
                    <div className='flex flex-col items-center gap-2'>
                        <XCircle className='h-8 w-8 text-red-500' />
                        <p className='text-zinc-500 text-sm font-medium'>
                            Too many pages in PDF
                        </p>
                        <p className='text-zinc-500 text-sm font-medium'>
                            Your{' '}
                            <span className='font-medium'>
                                Free
                            </span>{' '}
                            plan supports up to{' '}
                            50{' '}
                            pages per PDF.
                        </p>
                        <Link
                            href='/dashboard'
                            className='flex mt-4 items-center'>
                            <ChevronLeft className='h-3 w-3 mr-1.5' />
                            Back
                        </Link>
                    </div>
                </div>
                <div className="w-full mt-4 flex items-end">
                    <ChatInput />
                </div>
            </div>
        )

    return (
        <ChatContextProvider fileId={fileId}>
            <div className="pl-4 py-4 pr-[2px] flex flex-col h-full ">
                <div className="h-full max-h-[calc(100vh-3.5rem-6rem)] overflow-y-auto scrollbar-thumb-red scrollbar-thumb-rounded scrollbar-track-red-lighter scrollbar-w-2 pr-3">
                    <ChatMessage fileId={fileId} currentUserName={currentUserName}/>
                </div>
                <div className="w-full mt-4 flex items-end">
                    <ChatInput />
                </div>
            </div>
        </ChatContextProvider>
    )
}

export default ChatWrapper