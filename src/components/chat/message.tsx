import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'

interface messageProps {
    message: string
    isUserMessage: boolean
}

export const Message = ({ message, isUserMessage }: messageProps) => {

    const markdown = `Just a link: www.nasa.gov. Just a link: www.nasa.gov. Just a link: www.nasa.gov. Just a link: www.nasa.gov.Just a link: www.nasa.gov.Just a link: www.nasa.gov.Just a link: www.nasa.gov.Just a link: www.nasa.gov.Just a link: www.nasa.gov.Just a link: www.nasa.gov.Just a link: www.nasa.gov.Just a link: www.nasa.gov.Just a link: www.nasa.gov.Just a link: www.nasa.gov.`

    return (
        <>
            {
                isUserMessage ? (
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-2 text-sm text-zinc-400 items-center justify-center">

                            <span>Prathamesh Sonje</span>
                        </div>
                        <div className="bg-[#3C3C3C] text-slate-50 px-3 py-2 rounded-md font-medium text-sm max-w-[600px]">
                            This a question asked by a user This a question asked by a user This a question asked by a user
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-start gap-1 max-w-[600px]">
                        <div className="flex gap-1.5 text-sm items-center text-zinc-400 h-4">
                            <div className="bg-green-500 h-3.5 w-3.5 rounded-full"></div>
                            <span>Ideal Mate.</span>
                        </div>
                        <div className="ml-[20px] text-sm font-medium text-zinc-800">
                            <Markdown remarkPlugins={[remarkGfm]}>
                                {markdown}
                            </Markdown>
                        </div>
                    </div>
                )
            }
        </>
    )
}