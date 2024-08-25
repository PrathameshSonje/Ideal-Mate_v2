import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

interface ChatInputProps {
    isDisabled?: boolean
}

export const MessageInput = ({ isDisabled }: ChatInputProps) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isOverflow, setIsOverflow] = useState(false);

    const handleInput = () => {
        const textarea = textareaRef.current!;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setIsOverflow(textarea.scrollHeight > 120)
    };


    return (
        <div className="border p-2.5 rounded-sm max-h-40">
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
                    placeholder="Ask a question...">
                </textarea>
                <Button
                    className="rounded-full h-[30px] w-[30px] self-end"
                    size="icon"
                    disabled={isDisabled}
                >
                    <ArrowRight className="h-[16px] w-[16px]" strokeWidth={3} />
                </Button>
            </form>
        </div>
    )
}