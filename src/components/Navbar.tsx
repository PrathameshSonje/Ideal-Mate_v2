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


export const Navbar = async () => {

    const session = await auth();

    return (
        <div className="h-[55px] border-b w-full flex items-center px-4 justify-between text-[15px] font-medium text-zinc-700">
            <FileName session={session} />
            <div className="flex gap-6 items-center">
                <Link href="/dashboard">
                    <div className="flex gap-1 items-center hover:text-orange-500">
                        <span>Dashboard</span>
                        <ArrowUpRight className="h-[18px] w-[18px]" />
                    </div>
                </Link>
                <Link href="/support">
                    <div className="flex gap-1 items-center hover:text-orange-500">
                        <span>Support</span>
                        <ArrowUpRight className="h-[18px] w-[18px]" />
                    </div>
                </Link>
                <Link href="/pricing">
                    <div className="flex gap-1 items-center hover:text-orange-500">
                        <span>Premium</span>
                        <ArrowUpRight className="h-[18px] w-[18px]" />
                    </div>
                </Link>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="cursor-pointer hover:bg-zinc-200 p-2 rounded-md">
                            <User className="h-[20px] w-[20px]" strokeWidth={2} />
                            {/* <Avatar className="h-8 w-8 border-2 border-orange-400">
                            <AvatarImage src={session?.user?.image!} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar> */}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-70 mr-2">
                        {
                            session?.user ? (
                                <div className="flex flex-col justify-center items-center gap-4">
                                    <p>{session?.user?.name}</p>
                                    <p>{session?.user?.email}</p>
                                    <form action={async () => {
                                        "use server"

                                        await signOut({
                                            redirectTo: "/"
                                        });
                                    }}>
                                        <Button type="submit">
                                            Signout
                                        </Button>
                                    </form>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center gap-4">
                                    <Link href="/auth/login">SignIn</Link>
                                </div>
                            )
                        }
                    </PopoverContent>
                </Popover>
            </div >
        </div >
    )
}