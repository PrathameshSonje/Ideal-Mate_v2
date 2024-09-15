import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { User } from "lucide-react"
import Link from 'next/link'
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
                <div className='flex items-center justify-start gap-2 px-5 py-4'>
                    <div className='flex flex-col'>
                        {name && (
                            <p className='font-medium text-[17px] text-zinc-900'>
                                {name}
                            </p>
                        )}
                        {email && (
                            <p className='w-[200px] truncate text-[14px] -mt-1 text-zinc-600'>
                                {email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <Link href='/dashboard'>
                    <DropdownMenuItem className='font-medium text-zinc-600 text-[16px] px-5 py-2'>
                        Dashboard
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuItem className='cursor-pointer font-medium text-[16px] px-5 py-2'>
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