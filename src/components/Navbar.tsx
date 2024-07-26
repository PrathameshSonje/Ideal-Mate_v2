import Link from "next/link"
import { ArrowUpRight, UserRound } from "lucide-react"

export const Navbar = () => {
    return (
        <div className="h-[55px] border-b w-full flex items-center px-4 justify-between text-[14px] font-semibold text-zinc-800">
            <span>Name of the pdf</span>
            <div className="flex gap-6">
                <Link href="/support">
                    <span>Support</span>
                </Link>
                <Link href="/pricing">
                    <div className="flex gap-1 items-center">
                        <span >Premium</span>
                        <ArrowUpRight className="h-[18px] w-[18px]"/>
                    </div>
                </Link>
                <div className="cursor-pointer">
                    <UserRound className="h-[18px] w-[18px]"/>
                </div>
            </div>
        </div>
    )
}