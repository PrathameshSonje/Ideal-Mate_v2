'use client'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { pdfjs, Document, Page } from 'react-pdf';
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useToast } from "../ui/use-toast"
import clsx from 'clsx';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

interface PdfViewProps {
    fileUrl: string
}

export const PdfView = ({ fileUrl }: PdfViewProps) => {
    const { toast } = useToast()
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState(0)
    const [isloading, setIsLoading] = useState(true)

    const detectWD = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', detectWD);

        return () => {
            window.removeEventListener('resize', detectWD)
        }
    }, [windowSize])

    return (
        <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between px-2 gap-4 h-[40px] border-b font-semibold text-sm text-zinc-400'>
                <ArrowLeft
                    className='h-5 w-5 cursor-pointer'
                    onClick={() => {
                        currentPage - 1 >= 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1)
                    }} />
                <span >{currentPage}/{numOfPages}</span>
                <ArrowRight
                    className='h-5 w-5 cursor-pointer'
                    onClick={() => {
                        currentPage + 1 <= numOfPages ? setCurrentPage(currentPage + 1) : setCurrentPage(numOfPages)
                    }} />
            </div>
            {/* //change here if the navbar size is changed */}
            <div className='flex-1 max-h-[calc(100vh-95px)] overflow-y-auto bg-zinc-200 h-full'>
                <div className={clsx('py-2 pl-2', {
                    'h-full flex items-center justify-center': isloading
                })}>
                    <Document file={fileUrl} options={options}
                        loading={
                            <div className="flex justify-between">
                                <Loader2 className='my-24 h-6 w-6 animate-spin' />
                            </div>
                        }
                        onLoadError={() => {
                            toast({
                                title: 'Error loading PDF',
                                description: 'Please try again later',
                                variant: 'destructive'
                            })
                        }}
                        onLoadSuccess={({ numPages }) => {
                            setNumOfPages(numPages)
                            setIsLoading(false)
                        }}
                    >
                        <Page
                            width={(windowSize.width - 130) / 2}
                            pageNumber={currentPage}
                        ></Page>
                    </Document>
                </div>
            </div>
        </div>
    )
}