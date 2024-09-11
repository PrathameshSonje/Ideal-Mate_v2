import Navbar from "@/components/landing/nav"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div>
        <Navbar />
        {children}
    </div>
}