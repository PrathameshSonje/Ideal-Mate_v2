import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'

interface messageProps {
    message: string
    isUserMessage: boolean
}

export const Message = ({ message, isUserMessage }: messageProps) => {

    const markdown = `
The Inter font family, created by Rasmus Andersson, is a highly versatile font that supports a range of weights. However, the CSS standard for font weights specifies values in increments of 100 (e.g., 400, 500), and while you can specify intermediate values like 450, the browser will typically approximate to the nearest available weight.`

    return (
        <>
            {
                isUserMessage ? (
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-2 text-sm text-zinc-600 items-center font-semibold justify-center">
                            <span>Prathamesh Sonje</span>
                        </div>
                        <div className="bg-[#3C3C3C] text-slate-50 px-3 py-2 text-[15px] rounded-md max-w-[600px]">
                            <p >This a question asked by a user This a question asked by a user This a question asked by a user</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-start gap-2 max-w-[600px]">
                        <div className="flex gap-1.5 text-sm items-center text-zinc-600 h-4 font-semibold">
                            <div className="bg-green-500 h-3.5 w-3.5 rounded-full"></div>
                            <span>Ideal Mate.</span>
                        </div>
                        <div className="ml-[20px] text-[15px] font-medium text-zinc-700">
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