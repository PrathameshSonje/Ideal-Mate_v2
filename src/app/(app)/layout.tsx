import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { SidebarV2 } from "@/components/SidebarV2"
import { auth } from "../../../auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await auth();

    return <div>
        <div className="flex">
            <Sidebar />
            <div className="w-full flex flex-col">
                <Navbar session={session}/>
                <div className="flex-grow">
                    {children}
                </div>
            </div>
        </div>
    </div>
}