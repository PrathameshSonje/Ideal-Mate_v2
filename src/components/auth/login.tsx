'use client'

import { CardWrapper } from "./auth-wrapper";
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "@/lib/types/types";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { FormErrorBox } from "./errorBox";
import { login } from "@/actions/login";
import { useState } from "react";

type FormFields = z.infer<typeof LoginSchema>

export const LoginForm = () => {
    const [error, setError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(LoginSchema)
    });

    const params = useSearchParams();
    var errorMessage = params.get("error")
    if(errorMessage === "OAuthAccountNotLinked") setError("This email is used with another provider")

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const response = await login(data);
        setError(response?.error!)
    }

    return (
        <div>
            <CardWrapper
                headerLabel="Welcome Back"
                backButtonLabel="Dont have an account? "
                backButtonHref="/auth/register"
                showSocial={true}
            >
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</label>
                            <input
                                {...register("email")}
                                id="email"
                                className="w-full 10 rounded-sm p-2 border outline-none text-sm font-medium" />
                            {errors.email && (
                                <div className="text-red-500 text-xs">{errors.email.message}</div>
                            )}
                        </div>
                    </div>
                    <div>
                            <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
                            <input
                                {...register("password")}
                                id="password"
                                type="password"
                                className="w-full 10 rounded-sm p-2 border outline-none text-sm font-medium" />
                            {errors.password && (
                                <div className="text-red-500 text-xs">{errors.password.message}</div>
                            )}
                        </div>
                    {
                        error && (
                            <div>
                                <FormErrorBox errorMessage={error} />
                            </div>
                        )
                    }
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {isSubmitting ? "loading" : "Continue"}
                    </Button>
                </form>
            </CardWrapper>
        </div>
    )
}