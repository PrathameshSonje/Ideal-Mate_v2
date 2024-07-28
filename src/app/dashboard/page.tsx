'use client'

import { FilesCard } from "@/components/home/FIlesCard";
import { InsightsCard } from "@/components/home/InsightsCard";
import { TodoCard } from "@/components/home/TodoCard";

const Page = () => {

    const User = {
        id: Number,
        name: "Prathamesh Sonje",
        imports: 7,
        generations: 163,
        plan: "regular"
    }

    return (
        <div id="dashboard" className="w-full h-full flex items-center justify-center">
            <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                    <InsightsCard name={User.name} imports={User.imports} generations={User.generations} plan={User.plan} />
                    <FilesCard />
                </div>
                <TodoCard />
            </div>
        </div>
    )
}

export default Page;