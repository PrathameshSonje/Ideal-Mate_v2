import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export const FormErrorBox = ({ errorMessage }: { errorMessage: string }) => {
    return (
        <div className="w-full bg-red-100 rounded-md p-3 text-sm text-red-600 flex items-center gap-2 justify-center">
            <ExclamationTriangleIcon />
            {errorMessage}
        </div>
    )
}