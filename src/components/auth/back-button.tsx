'use client'

import Link from "next/link";

interface BackButtonProps {
    href: string;
    label?: string;
}

const BackButton = ({
    href,
    label
}: BackButtonProps) => {
    return (
        <div className="w-full font-normal text-sm flex items-center justify-center">
            <p>{label}
                <span className="font-semibold text-zinc-700">
                    <Link
                        href={href}
                    >
                        Sign In
                    </Link>
                </span>
            </p>
        </div>
    )
}

export default BackButton