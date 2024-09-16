import React, { SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import Dropzone from "react-dropzone"
import { Cloud, File, Loader2, Plus } from "lucide-react"
import { Progress } from "../ui/progress"
import { useUploadThing } from "@/lib/others/uploadthing"
import { useRouter } from "next/navigation"
import { CustomInput } from "../ui/customInput"
import { trpc } from "@/app/_trpc/client"
import toast from "react-hot-toast"

const UploadDropzone = ({ setOpen: setIsOpen }: { setOpen: React.Dispatch<SetStateAction<boolean>> }) => {
    const router = useRouter();
    const utils = trpc.useUtils()
    const [isUploading, setIsUploading] = useState<boolean | null>(null)
    const [uploadProgress, setuploadProgress] = useState<number>(0)

    const { startUpload } = useUploadThing("pdfUploader")

    const { mutate: startPolling } = trpc.getFile.useMutation(
        {
            onSuccess: (file) => {
                setIsOpen(false)
                utils.getUserFiles.invalidate();
                router.push(`/chat/${file.id}`)
            },
            retry: true,
            retryDelay: 500,
        }
    )

    const startSimulateProgress = () => {
        setuploadProgress(0)

        const interval = setInterval(() => {
            setuploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval)
                    return prevProgress
                }
                return prevProgress + 5
            })
        }, 500)

        return interval
    }

    return (
        <Dropzone multiple={false} onDrop={async (acceptedFiles) => {
            setIsUploading(true)
            const progressInterval = startSimulateProgress()

            const res = await startUpload(acceptedFiles)

            if (!res) {
                setIsOpen(false)
                return toast.error("someting went wrong")
            }

            const [fileResponse] = res

            const key = fileResponse?.key

            if (!key) {
                setIsOpen(false)
                return toast.error("someting went wrong")
            }

            clearInterval(progressInterval)
            setuploadProgress(100)

            startPolling({ key })
        }}>
            {({ getRootProps, getInputProps, acceptedFiles }) => (
                <section>
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                        <CustomInput className="w-full" placeholder="Website or link to a PDF" setDialogOpen={setIsOpen}/>
                        <div className="border h-64 w-full border-dashed border-gray-300 rounded-sm overflow-hidden">
                            <div {...getRootProps()} className="flex items-center justify-center h-full w-full">
                                <input {...getInputProps()} />
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center h-full w-full cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                        <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                                        <p className="mb-2 text-sm text-zinc-700">
                                            <span className="font-semibold">
                                                Drag or drop
                                            </span>{' '}
                                            or Click to Upload
                                        </p>
                                        <p className="text-xs text-zinc-500">PDF ( up to 4MB )</p>
                                    </div>

                                    {acceptedFiles && acceptedFiles[0] ? (
                                        <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                                            <div className="px-3 py-2 h-full grid place-items-center">
                                                <File className="h-4 w-4 text-orange-500" />
                                            </div>
                                            <div className="px-3 py-3 h-full text-sm truncate">
                                                {acceptedFiles[0].name}
                                            </div>
                                        </div>
                                    ) : null}

                                    {isUploading ? (
                                        <div className="w-full mt-4 max-w-xs mx-auto">
                                            <Progress value={uploadProgress} className="h-1 w-full bg-zinc-200" />
                                            {uploadProgress === 100 ? (
                                                <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                                                    <Loader2 className="h-3 w-3 animate-spin" />
                                                    Redirecting...
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
            )
            }
        </Dropzone >
    )
}

const UploadButton = (
    {
        className,
        children,
        size
    }:
        {
            className: string,
            children?: any,
            size?: "icon" | null | undefined
        }
) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className={className} size={size} title="Import Documents">
                    <Plus className="h-[16px] w-[16xpx]" strokeWidth={2.5} />
                    {children}
                </Button>
            </DialogTrigger>

            <DialogContent className="min-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-zinc-700 text-xl">Import a Document</DialogTitle>
                    <DialogDescription>
                        currently supports PDFs and websites
                    </DialogDescription>
                </DialogHeader>
                <UploadDropzone setOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    )
}

export default UploadButton