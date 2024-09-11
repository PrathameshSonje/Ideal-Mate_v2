import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { Cloud } from "../landing/Cloud"

export const PricingCard = () => {
    return (
        <div className="relative w-full h-full mx-auto px-4 py-16">
            <div className="relative w-1/2 mx-auto">
                <div className="absolute -right-60 top-1/2 transform -translate-y-1/2 z-0 opacity-40">
                    <Cloud />
                </div>
                <div id="tagline" className="relative z-10 flex flex-col items-center justify-center p-8">
                    <h1 className="text-5xl font-extrabold text-center text-zinc-800 mb-4">
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300">
                                IdealMate.
                            </span>
                        </span>
                        <span className="block mt-2 italic text-zinc-700">
                            is the ultimate study buddy for all your last-minute needs
                        </span>
                    </h1>
                    <h3 className="text-xl font-medium text-zinc-600 mb-12 tracking-wide">
                        Unlimited access. Cancel anytime.
                    </h3>
                </div>
            </div>
            <div className="relative z-20 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="absolute -left-40 top-1/2 transform -translate-y-1/2 z-0 opacity-30">
                    <Cloud />
                </div>
                <Card className="relative z-10 ">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-zinc-700">Free</CardTitle>
                        <CardDescription>Get started with basic features</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-zinc-700">
                        <p className="text-4xl font-bold">$0</p>
                        <p className="text-sm text-muted-foreground">per month</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-green-500" /> Import up to 5 files</li>
                            <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-green-500" /> Generate 100 questions</li>
                            <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-green-500" /> Basic support</li>
                            <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-green-500" /> Basic AI Models</li>
                        </ul>
                        <Link href='/dashboard' className="w-full mt-4">
                            <Button className="w-full">Get Started</Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card className="border-primary relative z-10 ">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-zinc-700">Premium</CardTitle>
                        <CardDescription>Unlock advanced features</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-zinc-700">
                        <p className="text-4xl font-bold">$10</p>
                        <p className="text-sm text-muted-foreground">per month</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-green-500" /> Import up to 50 files</li>
                            <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-green-500" /> Generate 5000 questions</li>
                            <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-green-500" /> Priority support</li>
                            <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-green-500" /> Advanced AI Models</li>
                        </ul>
                        <Button className="w-full mt-4">Upgrade to Premium</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
