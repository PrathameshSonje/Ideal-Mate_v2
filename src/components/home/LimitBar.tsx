import { useEffect, useRef } from "react";

interface LimitBarProps {
    used: number,
    limit: number,
    label: string
}

export const LimitBar = ({
    used,
    limit,
    label
}: LimitBarProps) => {

    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (barRef.current) {
            const widthPercentage = (used / limit) * 100;
            barRef.current.style.width = `${widthPercentage}%`;
        }
    }, [used, limit]);


    return (
        <div id="LimitBar" className="text-sm font-medium text-zinc-500 flex flex-col mt-[2px]">
            <label htmlFor="bar">{label}</label>
            <div id="bar" className="bg-zinc-200 w-60 h-[10px] rounded-sm overflow-hidden">
                <div
                    id="limit"
                    className="h-[10px] bg-orange-500"
                    ref={barRef}>
                </div>
            </div>
        </div>
    )
}