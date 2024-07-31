'use client'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import Social from "./social"
import BackButton from "./back-button"

interface cardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel?: string,
    backButtonHref: string,
    showSocial?: boolean
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial
}: cardWrapperProps) => {
    return (<>
        <Card className="w-[500px] rounded-lg">
            <CardHeader className="flex items-center justify-center font-bold text-lg">
                {headerLabel}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Social />
            </CardFooter>
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    </>
    )
}