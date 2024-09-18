'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { getFile } from '@/lib/data/file';
import { SessionProviderProps } from 'next-auth/react';
import { ImLogo } from '../IMLogo';

const FileName = ({ session }: { session: any }) => {
    const [fileName, setFileName] = useState<string | undefined>('');
    const pathname = usePathname();

    useEffect(() => {
        const getFileName = async () => {
            const fileId = pathname.split('/')[2];

            if (fileId) {
                const file = await getFile(fileId, session?.user?.id!);
                setFileName(file?.name);
            } else {
                setFileName('');
            }
        }

        getFileName();
    }, [pathname])

    return (
        <div>
            {fileName ? (
                <div>{fileName}</div>
            ) : (
                <div className="flex justify-center items-center gap-2 flex-shrink-0">
                    <ImLogo />
                    <span className="text-xl font-bold text-zinc-800">
                        IdealMate.
                    </span>
                </div>
            )}
        </div>

    )
}

export default FileName