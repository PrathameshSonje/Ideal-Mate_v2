import { Navbar } from "@/components/Navbar"
import { Sidebar } from "@/components/Sidebar"
import { SidebarV2 } from "@/components/SidebarV2"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div>
        <div className="flex">
            <Sidebar />
            <div className="w-full flex flex-col">
                <Navbar />
                <div className="flex-grow">
                    {children}
                </div>
            </div>
        </div>
    </div>
}