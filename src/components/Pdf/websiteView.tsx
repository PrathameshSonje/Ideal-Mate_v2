import { absoluteUrl } from '@/lib/helpers/utils';
import React from 'react'


export const WebsiteView = async ({ url }: { url: string }) => {
    const proxy_url = absoluteUrl("/api/download-pdf");

    return (
        <div className="w-full h-full flex-1">
            <iframe
                src={url}
                title="HTML Content"
                className="bg-zinc-200 h-full w-full overflow-hidden cursor-not-allowed"
            ></iframe>
        </div>
    )
}
