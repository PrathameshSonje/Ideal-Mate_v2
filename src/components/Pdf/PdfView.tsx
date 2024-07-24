'use client'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { pdfjs, Document, Page } from 'react-pdf';
import { Loader2 } from 'lucide-react';
import { useResizeDetector } from 'react-resize-detector';
import React, { RefObject, useCallback } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

interface PdfViewProps {
    fileUrl: string | File
}

export const PdfView = ({ fileUrl }: PdfViewProps) => {

    // const onResize = useCallback((ref: React.Dispatch<RefObject<HTMLDivElement>>) => {

    // }, [])

    // const { width, height, ref } = useResizeDetector({
    //     refreshMode: 'debounce',
    //     refreshRate: 1000,
    //     onResize
    // });

    const { width, height, ref } = useResizeDetector();

    return (
        <div
            ref={ref}
            className='flex-1 max-h-[calc(100vh-50px)] overflow-y-auto'>
            <Document loading={
                <div className="flex justify-between">
                    <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
            }
                file={fileUrl}
                className='max-h-full'>
                <Page
                    width={width}
                    pageNumber={2}
                    height={height}
                ></Page>
            </Document>
        </div>
    )
}