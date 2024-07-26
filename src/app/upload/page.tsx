import { Button } from "@/components/ui/button"
import { CustomInput } from "@/components/ui/customInput"
import { Input } from "@/components/ui/input"
import { ArrowRight, Cloud } from "lucide-react"

const UploadPage = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
            <span className="font-bold text-zinc-700 text-[28px]  mb-6">Import a Document</span>
            <CustomInput  className="w-[500px]" placeholder="Enter a Url"/>
            <section>
                <div className="border h-64 w-[500px] border-dashed border-gray-300 rounded-sm overflow-hidden">
                    <div className="flex items-center justify-center h-full w-full">
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
                        </label>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UploadPage