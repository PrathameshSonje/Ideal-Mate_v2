import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ImLogo } from '../IMLogo'
import { BorderBeam } from '../magicui/border-beam'

export default function Navbar() {

    return (
        <div className="fixed top-0 left-0 right-0 p-4 z-50 ">
            <nav className="w-full mx-auto bg-white bg-opacity-70 backdrop-blur-md shadow-sm rounded-full border">
                <BorderBeam colorFrom='#FFA500' colorTo='#FFFF00' size={250} duration={12} delay={9} />
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex justify-center items-center gap-2 flex-shrink-0">
                            <ImLogo />
                            <span className="text-xl font-bold text-zinc-800">
                                IdealMate.
                            </span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex text-[16px] space-x-10 text-zinc-800 outline-none font-medium">
                                <a href="/contact" className='hover:text-orange-500'>Contact</a>
                                <a href="/pricing" className='hover:text-orange-500'>Pricing</a>
                                <a href="/login" className='hover:text-orange-500'>Log in</a>
                                <a href="/register" className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-300 to-orange-400">
                                    Sign up
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}