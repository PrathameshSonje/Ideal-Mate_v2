import { useToast } from "@/components/ui/use-toast"

export function loginToast(email: string) {
    const { toast } = useToast()

    return (
        toast({
            description: `SignedIn as ${email}`,
        })
    )
}
