import { absoluteUrl } from '@/lib/helpers/utils';
import React, { useState } from 'react';

async function App() {

    const url = absoluteUrl("/api/download-pdf");

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: "https://en.wikipedia.org/wiki/India" }),
    });

    const htmlContent = await response.text();

    return (
        <div>
            <iframe
                srcDoc={htmlContent}
                style={{ width: '100%', height: '100vh', border: 'none', pointerEvents:'none' }}
                title="HTML Content"
                className='bg-zinc-300'
            ></iframe>
        </div>
    );
}

export default App;
