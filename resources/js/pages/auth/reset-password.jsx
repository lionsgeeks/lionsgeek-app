import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft, Shield } from 'lucide-react';
import { useCallback } from 'react';

import InputError from '@/components/input-error';
import { Button } from '../../components/Button';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = useCallback(
        (e) => {
            e.preventDefault();
            post(route('password.store'), {
                onFinish: () => reset('password', 'password_confirmation'),
            });
        },
        [post, reset],
    );

    return (
        <div className="h-screen bg-black overflow-hidden relative selection:bg-[#fee819] selection:text-white">
            <Head title="Reset Password" />

            <img id="background" className="absolute top-0 -left-20 w-[720px]" src="/assets/img/LgBg.svg" alt="LionsGeek background" />

            <div className="h-full flex flex-col">
                <div className="w-full max-w-2xl mx-auto px-6 lg:max-w-7xl flex flex-col h-full">
                    {/* Header */}
                    <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back to home
                        </a>
                    </header>

                    {/* Main */}
                    <main className="flex-1 flex items-center justify-center">
                        {/* Centered form */}
                        <div className="w-full max-w-md mx-auto">
                            <div className="flex flex-col items-center justify-center gap-6 overflow-hidden rounded-lg bg-[#18181b] p-8 ring-1 ring-white/[0.05] transition duration-300 dark:bg-zinc-900 dark:ring-zinc-800">
                                <div className="w-full space-y-6">
                                    {/* Header */}
                                    <div className="text-center space-y-2">
                                        <h2 className="text-2xl font-bold text-white">Set a new password</h2>
                                        <p className="text-sm text-gray-300">
                                            Enter a strong password and confirm it to complete the reset.
                                        </p>
                                    </div>

                                    {/* Status/errors */}
                                    {(errors.email || errors.password || errors.password_confirmation) && (
                                        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                                            <div className="flex items-center gap-2 text-red-400">
                                                <Shield className="h-4 w-4" />
                                                <span className="text-sm">Please fix the errors below.</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form */}
                                    <form onSubmit={submit} className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-200" htmlFor="email">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                readOnly
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#fee819] focus:outline-none focus:ring-2 focus:ring-[#fee819]/20 transition-colors"
                                                placeholder="Your email"
                                                autoComplete="email"
                                            />
                                            <InputError message={errors.email} className="mt-1 text-sm" />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-200" htmlFor="password">
                                                New Password
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#fee819] focus:outline-none focus:ring-2 focus:ring-[#fee819]/20 transition-colors"
                                                placeholder="Enter new password"
                                                autoComplete="new-password"
                                                autoFocus
                                            />
                                            <InputError message={errors.password} className="mt-1 text-sm" />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-gray-200" htmlFor="password_confirmation">
                                                Confirm Password
                                            </label>
                                            <input
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#fee819] focus:outline-none focus:ring-2 focus:ring-[#fee819]/20 transition-colors"
                                                placeholder="Re-enter new password"
                                                autoComplete="new-password"
                                            />
                                            <InputError message={errors.password_confirmation} className="mt-1 text-sm" />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Reset Password
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Footer spacer */}
                    <footer className="py-6" />
                </div>
            </div>
        </div>
    );
}
