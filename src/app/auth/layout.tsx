import { ImLogo } from "@/components/IMLogo"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="w-full flex gap-2 items-center justify-center mb-8">
            <ImLogo />
            <h1 className="text-zinc-800 font-bold text-2xl">IdealMate.</h1>
        </div>
        <div className="relative">
            {children}
        </div>
    </div>

}