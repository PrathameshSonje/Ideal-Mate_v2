import { LoginForm } from "@/components/auth/login"
import { Suspense } from "react"

const Login = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Suspense fallback={<div>Just a minute</div>}>
                <LoginForm />
            </Suspense>
        </div>
    )
}

export default Login