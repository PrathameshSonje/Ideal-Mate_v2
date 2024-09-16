'use client'

import { useIntersection } from '@mantine/hooks';
import React, { useEffect, useRef, useState } from 'react';

function TestingPage() {

    const containerRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<boolean | undefined | string>(false)
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting) {
            setState("new message fetched")
        }
    }, [entry?.isIntersecting])

    return (
        <div className='h-full'>
            <span className='text-lg font-bold'>{state?.toString()}</span>
            <div className='h-full w-full flex justify-center items-center overflow-y-scroll' ref={containerRef}>
                <div className='h-[300px] w-[700px] bg-zinc-100 overflow-y-auto'>
                    <div className='py-64'>
                        <div className='w-full h-[100px] bg-orange-500' ref={ref}>
                            hello there
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default TestingPage;
