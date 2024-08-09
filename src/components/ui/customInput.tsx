import * as React from "react"

import { cn } from "@/lib/helpers/utils"
import { ArrowRight } from "lucide-react"
import { Button } from "./button"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className={cn("flex items-center justify-between px-2 py-1 gap-2 rounded-sm border", className)}>
                <input
                    type={type}
                    className="flex-1 pl-1 pr-1 text-sm text-zinc-600 outline-none bg-transparent transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 w-full"
                    {...props}
                />
                <Button className="rounded-full h-[30px] w-[30px]" size="icon">
                    <ArrowRight className="h-[16px] w-[16px]" strokeWidth={3} />
                </Button>
            </div>
        )
    }
)

CustomInput.displayName = "Input"

export { CustomInput }