import Link from "next/link"
import { ArrowUpRight, UserRound } from "lucide-react"

export const Navbar = () => {
    return (
        <div className="h-[55px] border-b w-full flex items-center px-4 justify-between text-[15px] font-medium text-zinc-800">
            <span>The Mechanics of Nuclear Fission</span>
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
                <div className="cursor-pointer flex items-center justify-center">
                    <UserRound className="h-[18px] w-[18px]"/>
                </div>
            </div>
        </div>
    )
}