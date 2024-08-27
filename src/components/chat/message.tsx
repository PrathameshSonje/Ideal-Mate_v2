import { cn } from "@/lib/helpers/utils"
import { forwardRef } from "react"
import ReactMarkdown from "react-markdown"
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'

interface messageProps {
    message: {
        createdAt: string
        id: string
        text: string | JSX.Element
        isUserMessage: boolean
    },
    isNextMessageSamePerson: boolean
    currentUserName: string
}

export const Message = forwardRef<HTMLDivElement, messageProps>(
    ({ message, isNextMessageSamePerson, currentUserName }, ref) => {


        return (
            <>
                {
                    message.isUserMessage ? (
                        <div className="flex flex-col items-end gap-2" ref={ref}>
                            <div className="flex gap-2 text-sm text-zinc-500 items-center font-semibold justify-center">
                                <span>{currentUserName}</span>
                            </div>
                            <div className="bg-[#efefef] text-[#3C3C3C] px-3 py-2 text-[15px] font-medium rounded-md max-w-[600px]">
                                <p >{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-start gap-2 max-w-[600px]" ref={ref}>
                            <div className="flex gap-1.5 text-sm items-center text-zinc-500 h-4 font-semibold">
                                <div className="bg-green-500 h-3.5 w-3.5 rounded-full"></div>
                                <span>Ideal Mate.</span>
                            </div>
                            <div className="ml-[20px] text-[15px] font-medium text-zinc-700">
                                {typeof message.text === 'string' ? (
                                    <ReactMarkdown className={cn('prose', {
                                        'text-[#3C3C3C]': message.isUserMessage
                                    })}>
                                        {message.text}
                                    </ReactMarkdown>
                                ) : (
                                    message.text
                                )}
                            </div>
                        </div>
                    )
                }
            </>
        )
    })