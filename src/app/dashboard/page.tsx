import { FilesCard } from "@/components/home/FIlesCard";
import { InsightsCard } from "@/components/home/InsightsCard";
import { TodoCard } from "@/components/home/TodoCard";
import { getUserbyEmail } from "@/lib/data/user";
import { auth } from "../../../auth";

const Page = async () => {
    const session = await auth();

    const User = await getUserbyEmail(session?.user?.email!);

    return (
        <div id="dashboard" className="w-full h-full flex items-center justify-center p-12">
            <div className="flex gap-3">
                <div className="flex flex-col gap-3">
                    <InsightsCard User={User!}/>
                    <FilesCard />
                </div>
                <TodoCard />
            </div>
        </div>
    )
}

export default Page;