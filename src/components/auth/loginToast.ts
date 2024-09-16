import toast from "react-hot-toast";

export function loginToast(email: string) {

    return (
        toast.success(`SignedIn as ${email}`)
    )
}
