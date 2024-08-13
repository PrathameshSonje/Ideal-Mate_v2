"use client"

import React, { useState } from 'react';

function App() {
    const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null);

    async function downloadPDF(url: string) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            setPdfBuffer(arrayBuffer);
            console.log('PDF downloaded and stored in state.');
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    }

    const url = 'https://ncert.nic.in/textbook/pdf/lekl101.pdf';

    return (
        <div>
            Testing Page
        </div>
    );
}

export default App;
