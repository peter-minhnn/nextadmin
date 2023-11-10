'use client'
import FieldInfo from '@/components/form/field-info';
import { authenticate } from '@/lib/actions';
import { useForm } from '@tanstack/react-form';

const LoginPage = () => {
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            // Do something with form data
            console.log(values)
            // authenticate(values);
        },
    })

    return (
        <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form.Provider>
                    <form
                        className="space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            void form.handleSubmit()
                        }}
                    >
                        <div>
                            <form.Field
                                name="email"
                                onChange={(value) => !value ? 'An email is required' : undefined}
                                onChangeAsyncDebounceMs={500}
                                onChangeAsync={async (value) => {
                                    await new Promise((resolve) => setTimeout(resolve, 1000))
                                    return (
                                        value.includes('error') && 'No "error" allowed in email'
                                    )
                                }}
                                children={(field) => {
                                    // Avoid hasty abstractions. Render props are great!
                                    return (
                                        <>
                                            <label htmlFor={field.name} className="block text-sm font-medium leading-6 text-gray-900">Username:</label>
                                            <div className="mt-2">
                                                <input
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <FieldInfo field={field} />
                                        </>
                                    )
                                }}
                            />
                        </div>

                        <div>
                            <form.Field
                                name="password"
                                onChange={(value) => !value ? 'A password is required' : undefined}
                                onChangeAsyncDebounceMs={500}
                                onChangeAsync={async (value) => {
                                    await new Promise((resolve) => setTimeout(resolve, 1000))
                                    return (
                                        value.includes('error') && 'No "error" allowed in password'
                                    )
                                }}
                                children={(field) => (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor={field.name} className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
                                            <div className="text-sm">
                                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Forgot password?
                                                </a>
                                            </div>
                                        </div>
                                        <div className='mt-2'>
                                            <input
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                autoComplete="current-password"
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>

                        <div>
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                children={([canSubmit, isSubmitting]) => (
                                    <button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isSubmitting ? '...' : 'Sign In'}
                                    </button>
                                )}
                            />
                        </div>
                    </form>
                </form.Provider>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Start a 14 day free trial
                    </a>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;