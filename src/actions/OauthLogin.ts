import { DEFAULT_LOGIN_REDIRECT } from "@/lib/middleware/routes"
import { signIn } from "../../auth"

export const handleOAuth = async (provider: "google" | "github") => {
    await signIn(provider, {
        redirectTo: DEFAULT_LOGIN_REDIRECT
    })
}