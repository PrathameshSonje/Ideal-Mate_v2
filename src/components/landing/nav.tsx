import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ImLogo } from '../IMLogo'
import { BorderBeam } from '../magicui/border-beam'
import ShimmerButton from '../magicui/shimmer-button'
import { auth } from '../../../auth'

export default async function Navbar() {
    const session = await auth();

    return (
        <div className="fixed top-0 left-0 right-0 p-4 z-50 ">
            <nav className="w-full mx-auto bg-white bg-opacity-70 backdrop-blur-md shadow-sm rounded-full border">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex justify-center items-center gap-2 flex-shrink-0">
                            <ImLogo />
                            <span className="text-xl font-bold text-zinc-800">
                                IdealMate.
                            </span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex text-[18px] space-x-10 text-zinc-800 justify-center items-center outline-none font-medium">
                                <a href="/contact" className='hover:text-orange-500'>Contact</a>
                                <a href="/pricing" className='hover:text-orange-500'>Pricing</a>
                                {
                                    session?.user?.email ? (
                                        <div className='flex gap-2 justify-center items-center bg-zinc-100 rounded-full p-2 px-4 '>
                                            <div className="relative">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                                                <div className="absolute top-0 left-0 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                            </div>
                                            <span className='text-zinc-800 font-medium '>
                                                {session.user.email}
                                            </span>
                                        </div>
                                    ) : (
                                        <a href="/pricing" className='hover:text-orange-500'>
                                            Login
                                        </a>
                                    )
                                }
                                <a href="/auth/register" className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400">
                                    <ShimmerButton>
                                        {session?.user?.email ? "Go to App" : "Sign up"}
                                    </ShimmerButton>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </nav >
        </div >
    )
}