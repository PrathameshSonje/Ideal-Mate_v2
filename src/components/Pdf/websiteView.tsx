import { absoluteUrl } from '@/lib/helpers/utils';
import React from 'react'

//TODO: sanitize the html, prevent interaction with the iframe

export const WebsiteView = async ({ url }: { url: string }) => {

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
