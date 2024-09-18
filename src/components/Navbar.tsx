'use client'

import Link from "next/link"
import { ArrowUpRight, Menu, User, X } from "lucide-react"
import { Button } from "./ui/button"
import FileName from "./home/FileName"
import UserAccountNav from "./home/UserNav"
import { FeedBackMenu } from "./FeedBackMenu"
import { useState } from "react"


export const Navbar = ({ session }: { session: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="h-[60px] border-b-2 w-full flex items-center px-4 justify-between text-[16px] font-semibold text-zinc-800">
            {/* Left Side: File Name or Brand */}
            <FileName session={session} />

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
                <FeedBackMenu
                    userEmail={session?.user?.email}
                    name={session?.user?.name!}
                />
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
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    className="rounded-full"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-[60px] left-0 w-full bg-white shadow-lg z-50 flex flex-col items-start p-4 text-[20px] gap-4">
                    <FeedBackMenu
                        userEmail={session?.user?.email}
                        name={session?.user?.name!}
                    />
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
                </div>
            )}
        </div>
    )
}