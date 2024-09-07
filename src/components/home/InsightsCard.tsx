import { LimitBar } from "./LimitBar";
import { CardWrapper } from "./CardWrapper";
import { User } from "@/lib/types/types";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const InsightsCard = ({ User, isLoading }: { User: User, isLoading: boolean }) => {

    const importLimit = 100;
    const generationsLimit = 500;


    return (
        <CardWrapper>
            <div id="insights" className="flex flex-col gap-3 h-[96px] w-[740px] max-w-full">
                <p className="font-semibold text-[28px] text-zinc-800">
                    Welcome back,
                    <span className="bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-transparent font-bold">
                        {isLoading ? (
                            <span><Skeleton /></span>
                        ) : (
                            User!.name!.split(" ")[0]
                        )}
                    </span>
                </p>
                {User && (
                    <div className="flex items-center justify-between gap-2 w-full shrink">
                        <div id="import" className="flex gap-3 w-full shrink">
                            <span className="font-semibold text-[28px] text-zinc-800">
                                {User.imports}/{importLimit}
                            </span>
                            <LimitBar label="Imports" used={User.imports} limit={importLimit} />
                        </div>
                        <div className="w-[1px] h-8 mx-6 bg-zinc-300"></div>
                        <div id="generations" className="flex gap-3 w-full shrink">
                            <span className="font-semibold text-[28px] text-zinc-800">
                                {User.generations}/{generationsLimit}
                            </span>
                            <LimitBar label="Questions" used={User.generations} limit={generationsLimit} />
                        </div>
                    </div>
                )}
            </div>
        </CardWrapper>
    )
}