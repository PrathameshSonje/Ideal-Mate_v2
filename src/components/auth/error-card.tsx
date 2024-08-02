import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { CardWrapper } from "./auth-wrapper"
import BackButton from "./back-button"

export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel="Oops! something went wrong"
            backButtonLabel="Back to Login "
            backButtonHref="/auth/login"
            showSocial={false}
        >
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" height={28} width={28}/>
            </div>
        </CardWrapper>
    )
}