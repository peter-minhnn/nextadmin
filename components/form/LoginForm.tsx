'use client'
import { LoginRequest } from "@/types/login-type"
import { useState } from "react"
import FieldMessage from "./FieldInfo";

type LoginFormProsp = {
    handleSubmit: (params: LoginRequest) => void;
}

const LoginForm = ({ handleSubmit }: LoginFormProsp) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [loginRequest, setLoginRequest] = useState<LoginRequest>({
        username: '',
        password: ''
    })

    return (
        <>
            <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit(loginRequest);
            }}>
                <div>
                    <label htmlFor={'email'} className="block text-sm font-medium leading-6 text-gray-900">Username:</label>
                    <div className="mt-2">
                        <input
                            name={'email'}
                            value={loginRequest.username}
                            onChange={(e) => setLoginRequest({ ...loginRequest, username: e.target.value })}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    {/* <FieldMessage field={field} /> */}
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor={'password'} className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <input
                            name={'password'}
                            type="password"
                            value={loginRequest.password}
                            onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                            autoComplete="current-password"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    {/* <FieldMessage field={field} /> */}
                </div>

                <div>
                    <button
                        type="submit"
                        // disabled={!loginRequest.email && !loginRequest.password}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? '...' : 'Sign In'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginForm;