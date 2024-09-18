import Navbar from "@/components/landing/nav"
import { auth } from "../../../auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();

    return <div>
        <Navbar session={session} />
        {children}
    </div>
}