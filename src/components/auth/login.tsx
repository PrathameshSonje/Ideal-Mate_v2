'use client'

import { CardWrapper } from "./auth-wrapper";
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "@/lib/types/types";
import { Button } from "../ui/button";

type FormFields = z.infer<typeof LoginSchema>

export const LoginForm = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(LoginSchema)
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // const response = await login(data);
        // console.log(response);
    }

    return (
        <div>
            <CardWrapper
                headerLabel="Welcome Back"
                backButtonLabel="Dont have an account? "
                backButtonHref="/"
            >
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="text-sm font-semibold text-zinc-700">Email or Username</label>
                            <input
                                {...register("email")}
                                id="email"
                                className="w-full 10 rounded-sm p-2 border outline-none text-sm font-medium" />
                            {errors.email && (
                                <div className="text-red-500 text-xs">{errors.email.message}</div>
                            )}
                        </div>
                    </div>
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