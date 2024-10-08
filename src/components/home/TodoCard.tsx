import { Checkbox } from "../ui/checkbox"
import { CardWrapper } from "./CardWrapper"
import { ListPlus } from "lucide-react"

export const TodoCard = () => {

    const todos = [{
        task: "study the history of Rome",
        isDone: false
    }, {
        task: "Take notes from economics paper",
        isDone: false
    }, {
        task: "get insights from the Physics research paper",
        isDone: false
    }, {
        task: "summarize history notes",
        isDone: false
    }, {
        task: "edit file name option in the navbar",
        isDone: false
    }, {
        task: "Pulsate the green dot",
        isDone: false
    }]

    return (
        <CardWrapper className="col-span-10 lg:col-span-3">
            <div className="text-zinc-800 flex items-center justify-between">
                <span className="font-bold text-xl">To Do's</span>
                <ListPlus strokeWidth={1.2}/>
            </div>
            <div className="flex flex-col gap-2 mt-6 max-h-[calc(100vh-270px)] overflow-y-auto hide-scrollbar">
                {
                    todos.map((todo, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Checkbox id="todos" />
                            <label
                                htmlFor="todos"
                                className="text-[15px] text-zinc-700 font-medium">
                                {todo.task}
                            </label>
                        </div>
                    ))
                }
            </div>
        </CardWrapper>
    )
}