import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { ArrowUpRight, User } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { signOut } from '../../../auth'

interface UserAccountNavProps {
    email: string | undefined | null
    name: string | undefined | null
}

const UserAccountNav = async ({
    email,
    name,
}: UserAccountNavProps) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className='overflow-visible'>
                <div className="cursor-pointer hover:bg-zinc-200 p-2 rounded-md">
                    <User className="h-[20px] w-[20px]" strokeWidth={2} />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='bg-white' align='end'>
                <div className='flex items-center justify-start gap-2 p-4'>
                    <div className='flex flex-col space-y-0.5 leading-none'>
                        {name && (
                            <p className='font-medium text-[16px] text-zinc-700'>
                                {name}
                            </p>
                        )}
                        {email && (
                            <p className='w-[200px] truncate text-[13px] text-zinc-600'>
                                {email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem className='font-medium text-zinc-600 px-4 py-2'>
                    <Link href='/dashboard'>Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className='cursor-pointer font-medium px-4 py-2'>
                    <form action={async () => {
                        "use server"

                        await signOut({
                            redirectTo: "/"
                        });
                    }}>
                        <button type="submit">
                            <span className='text-red-500'>Signout</span>
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav