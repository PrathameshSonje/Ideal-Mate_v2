'use client'

import { CardWrapper } from "./auth-wrapper";
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from "@/lib/types/types";
import { Button } from "../ui/button";

type FormFields = z.infer<typeof RegisterSchema>

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(RegisterSchema)
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        // const response = await registerUser(data);
        // console.log(response);
    }

    return (
        <div>
            <CardWrapper
                headerLabel="Create an Account"
                backButtonLabel="Already have an account? "
                backButtonHref="/"
            >
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            <div>
                                <label htmlFor="firstname" className="text-sm font-medium text-zinc-700">First Name</label>
                                <input
                                    {...register("firstName")}
                                    id="firstname"
                                    className="w-full 10 rounded-sm p-2 border outline-none text-sm font-medium" />
                                {errors.firstName && (
                                    <div className="text-red-500 text-xs">{errors.firstName.message}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="lastname" className="text-sm font-medium text-zinc-700">Last Name</label>
                                <input
                                    {...register("lastName")}
                                    id="lastname"
                                    className="w-full 10 rounded-sm p-2 border outline-none text-sm font-medium" />
                                {errors.lastName && (
                                    <div className="text-red-500 text-xs">{errors.lastName.message}</div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</label>
                            <input
                                {...register("email")}
                                id="email"
                                type="email"
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