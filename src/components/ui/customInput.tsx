'use client'

import { cn } from "@/lib/helpers/utils"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "./button"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SetStateAction, useState } from "react"
import { FormErrorBox } from "../auth/errorBox"
import { useUploadThing } from "@/lib/others/uploadthing"
import { trpc } from "@/app/_trpc/client"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    setDialogOpen: React.Dispatch<SetStateAction<boolean>>
}

const CustomInput: React.FC<InputProps> = (({ setDialogOpen, className, type, ...props }) => {
    const router = useRouter()
    const utils = trpc.useUtils()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { startUpload } = useUploadThing("pdfUploader");
    const inputSchema = z.object({
        url: z.string().url("Invalid URL"),
    });

    const { mutate: startPolling } = trpc.getFile.useMutation(
        {
            onSuccess: (file) => {
                setDialogOpen(false)
                utils.getUserFiles.invalidate();
                router.push(`/chat/${file.id}`)
            },
            retry: true,
            retryDelay: 500,
        }
    )

    const { mutate: handleHTML } = trpc.uploadWebsite.useMutation(
        {
            onSuccess: (file) => {
                setDialogOpen(false)
                utils.getUserFiles.invalidate();
                router.push(`/chat/${file.id}`)
            },

            onError(_, variables) {
                console.log("hi from onError");
                setDialogOpen(false)
                toast.error(`failed to upload ${variables.url}`)
            },
        }
    )

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<z.infer<typeof inputSchema>>({
        resolver: zodResolver(inputSchema)
    });

    const onSubmit: SubmitHandler<z.infer<typeof inputSchema>> = async ({ url }) => {
        setError(null);
        setIsLoading(true);

        const response = await fetch('/api/download-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            setError(errorMessage)
        }

        const header = response.headers.get("Content-Type");

        if (header == 'pdf') {
            const pdfBlob = await response.blob();
            const pdfFile = new File([pdfBlob], 'document.pdf', { type: 'application/pdf' });
            const res = await startUpload([pdfFile])

            if (!res) {
                setDialogOpen(false)
                return toast.error('someting went wrong')
            }

            const [fileResponse] = res
            const key = fileResponse?.key

            if (!key) {
                setDialogOpen(false)
                return toast.error('someting went wrong')
            }

            startPolling({ key })
        } else if (header == 'html') {
            handleHTML({ url })
        } else {
            setError("Not a valid format")
        }
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={cn("flex items-center justify-between px-2 py-1 gap-2 rounded-sm border", className)}>
                <input
                    {...register("url")}
                    id="url"
                    type={type}
                    className="flex-1 pl-1 pr-1 text-sm text-zinc-800 font-semibold outline-none bg-transparent transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 w-full"
                    {...props}
                />
                {errors.url && (
                    <div className="text-red-500 text-xs">{errors.url.message}</div>
                )}
                <Button
                    disabled={isSubmitting || isLoading}
                    className="rounded-full h-[30px] w-[30px]"
                    size="icon"
                    type="submit">
                    {isSubmitting || isLoading ? (
                        <Loader2 className="h-[16px] w-[16px] animate-spin" strokeWidth={2} />
                    ) : (
                        <ArrowRight className="h-[16px] w-[16px]" strokeWidth={3} />
                    )
                    }
                </Button>
            </form>
            {error && (
                <div>
                    <FormErrorBox errorMessage={error} />
                </div>
            )}
        </div>

    )
}
)

CustomInput.displayName = "Input"

export { CustomInput }