import { useState } from "react";
import { LimitBar } from "./LimitBar";
import { CardWrapper } from "./CardWrapper";
import { userInterface } from "@/lib/types/types";

interface InsightsCardProps {
    name: string,
    imports : number,
    generations: number,
    plan: string
}

export const InsightsCard = ( User: InsightsCardProps) => {
    const [importLimit, setImportLimit] = useState(10);
    const [generationsLimit, setGenerationsLimit] = useState(1000);


    if (User.plan === "premium") setImportLimit(100), setGenerationsLimit(100000000);


    return (
            <CardWrapper>
                <div id="insights" className="flex flex-col gap-3">
                    <p className="font-semibold text-[28px] text-zinc-800">
                        Welcome back,
                        <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent font-bold"> {User.name.split(" ")[0]}</span>
                    </p>
                    <div className="flex items-center justify-between gap-2">
                        <div id="import" className="flex gap-3">
                            <span className="font-semibold text-[28px] text-zinc-800">
                                {User.imports}/{importLimit}
                            </span>
                            <LimitBar label="Imports" used={User.imports} limit={importLimit} />
                        </div>
                        <div className="w-[1px] h-8 mx-6 bg-zinc-300"></div>
                        <div id="generations" className="flex gap-3">
                            <span className="font-semibold text-[28px] text-zinc-800">
                                {User.generations}/{generationsLimit}
                            </span>
                            <LimitBar label="Questions" used={User.generations} limit={generationsLimit} />
                        </div>
                    </div>
                </div>
            </CardWrapper>
    )
}