'use client'

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { auth } from "../../auth"

interface feedbackMenuProps {
    userEmail: string,
    name: string,
}

export const FeedBackMenu = ({ userEmail, name  }: feedbackMenuProps) => {

    const [feedback, setFeedback] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const response = await fetch('/api/send-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail, feedback, name }),
        })

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
        }

        setFeedback("")
        setIsOpen(false)
    }


    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-1 items-center hover:text-orange-500">
                    <span>Support</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[400px]">
                <form onSubmit={handleSubmit} className="p-4">
                    <h2 className="text-[16px] text-zinc-700 font-medium mb-2">We value your feedback</h2>
                    <Textarea
                        placeholder="Tell us what you think..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="min-h-[100px] mb-4"
                    />
                    <Button type="submit" className="w-full">
                        Submit Feedback
                    </Button>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
