import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, XIcon } from "lucide-react"
import Link from "next/link"

export const PricingCard = () => {
    return (
        <div className="w-full h-full mx-auto  px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12 text-zinc-700">Choose Your Plan</h1>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Free</CardTitle>
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
                <Card className="border-primary">
                    <CardHeader>
                        <CardTitle className="text-2xl">Premium</CardTitle>
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
