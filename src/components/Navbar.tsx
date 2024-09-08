import Link from "next/link"
import { ArrowUpRight, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth, signOut } from "../../auth"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button"
import FileName from "./home/FileName"
import UserAccountNav from "./home/UserNav"
import { FeedBackMenu } from "./FeedBackMenu"


export const Navbar = async () => {

    const session = await auth();

    return (
        <div className="h-[55px] border-b w-full flex items-center px-4 justify-between text-[15px] font-medium text-zinc-600">
            <FileName session={session} />
            <div className="flex gap-8 items-center">
                {/* <Link href="/dashboard">
                    <div className="flex gap-1 items-center hover:text-orange-500">
                        <span>Dashboard</span>
                        <ArrowUpRight className="h-[18px] w-[18px]" />
                    </div>
                </Link> */}
                <FeedBackMenu userEmail={session?.user?.email!} name={session?.user?.name!} />
                <Link href="/pricing">
                    <div className="flex gap-1 items-center hover:text-orange-500">
                        <span>Premium</span>
                        <ArrowUpRight className="h-[18px] w-[18px]" />
                    </div>
                </Link>
                <UserAccountNav
                    email={session?.user?.email}
                    name={session?.user?.name}
                />
            </div >
        </div >
    )
}