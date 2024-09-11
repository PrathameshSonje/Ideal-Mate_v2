import { Navbar } from "@/components/Navbar"
import { SidebarV2 } from "@/components/SidebarV2"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div>
        <div className="flex">
            <SidebarV2 />
            <div className="w-full flex flex-col">
                <Navbar />
                <div className="flex-grow">
                    {children}
                </div>
            </div>
        </div>
    </div>
}