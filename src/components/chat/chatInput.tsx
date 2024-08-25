'use client'

import { ArrowRight } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { ChatContext } from "./ChatContext";

interface ChatInputProps {
    isDisabled?: boolean
}

export const ChatInput = ({ isDisabled }: ChatInputProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const {
        message,
        addMessage,
        isLoading,
        handleInputChange
    } = useContext(ChatContext)

    const handleInput = () => {
        const textarea = textareaRef.current!;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setIsOverflow(textarea.scrollHeight > 120)
    };
    
    return (
        <div className="border p-2.5 rounded-sm max-h-40 mr-3 w-full">
            <form className="flex items-center gap-2 w-full">
                <textarea
                    ref={textareaRef}
                    className={clsx(
                        "flex-1 outline-none resize-none text-zinc-700 text-[15px] font-medium", {
                        "overflow-y-auto max-h-[120px]": isOverflow
                    }
                    )}
                    rows={1}
                    onInput={handleInput}
                    onChange={handleInputChange}
                    value={message}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            addMessage()
                            textareaRef.current?.focus()
                        }
                    }}
                    autoFocus
                    disabled={isDisabled || isLoading}
                    placeholder="Ask a question...">
                </textarea>
                <Button
                    className="rounded-full h-[30px] w-[30px] self-end"
                    size="icon"
                    disabled={isDisabled || isLoading}
                    aria-label="send message"
                    type="submit"
                    onClick={() => {
                        addMessage()

                        textareaRef.current?.focus()
                    }}
                >
                    <ArrowRight className="h-[16px] w-[16px]" strokeWidth={3} />
                </Button>
            </form>
        </div>
    )
}