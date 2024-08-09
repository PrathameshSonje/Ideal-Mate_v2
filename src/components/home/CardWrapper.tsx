import { cn } from "@/lib/helpers/utils"
import React from "react"

export const CardWrapper = ({ children, className, heading }: { children: React.ReactNode, className?: string, heading?: String }) => {
    return (
        <div className={cn("border p-6 shadow-sm rounded-md", className)}>
            <span className="font-bold text-xl">{heading}</span>
            {children}
        </div>
    )
}