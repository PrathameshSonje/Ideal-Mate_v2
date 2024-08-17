'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { getFile } from '@/lib/data/file';
import { SessionProviderProps } from 'next-auth/react';

const FileName = ({ session }: { session: any }) => {
    const [fileName, setFileName] = useState<string | undefined>();
    const pathname = usePathname();

    useEffect(() => {
        const getFileName = async () => {
            const fileId = pathname.split('/')[2];

            const file = await getFile(fileId, session?.user?.id!);
            setFileName(file?.name)
        }

        getFileName();
    }, [pathname])

    return (
        <span>{fileName}</span>
    )
}

export default FileName