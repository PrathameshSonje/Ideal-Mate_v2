import { cn } from "@/lib/helpers/utils"
import { Search } from "lucide-react"
import React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    handleChange: (keyword: string) => void
}

export const SearchBar = React.memo(({ handleChange, className, type, ...props }: InputProps) => {

    return (
        <div className={cn("flex items-center justify-between px-2 py-1 gap-2 rounded-sm border", className)}>
            <Search height="16" width="16" color="#7d7d7d" />
            <input
                placeholder="Search your document..."
                type={type}
                className="flex-1 pl-1 pr-1 text-sm text-zinc-600 outline-none bg-transparent transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 w-full"
                {...props}
                onChange={(e) => {
                    handleChange(e.target.value)
                }}
            />
        </div>
    )
})