import { absoluteUrl } from '@/lib/helpers/utils';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

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
            <Skeleton />
        </div>
    );
}

export default App;
