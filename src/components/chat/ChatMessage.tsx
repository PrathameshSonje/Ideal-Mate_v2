import { Message } from "./message"

export const ChatMessage = () => {

    const isUserMessage = true;

    return (
        <div className="h-full flex flex-col gap-6  ">
            <Message message="hello there" isUserMessage={isUserMessage} />
            <Message message="hello there" isUserMessage={!isUserMessage} />
            <Message message="hello there" isUserMessage={isUserMessage} />
            <Message message="hello there" isUserMessage={!isUserMessage} />
            <Message message="hello there" isUserMessage={isUserMessage} />
            <Message message="hello there" isUserMessage={!isUserMessage} />
            <Message message="hello there" isUserMessage={isUserMessage} />
            <Message message="hello there" isUserMessage={!isUserMessage} />
            <Message message="hello there" isUserMessage={isUserMessage} />
            <Message message="hello there" isUserMessage={!isUserMessage} />
            <Message message="hello there" isUserMessage={isUserMessage} />
            <Message message="hello there" isUserMessage={!isUserMessage} />
        </div>
    )
}