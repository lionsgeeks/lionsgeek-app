import { Head, useForm } from '@inertiajs/react';
import { useCallback } from 'react';
import { Button } from '../../components/Button';

// import AuthLayout from '@/layouts/auth-layout';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = useCallback(
        (e) => {
            e.preventDefault();
            post(route('login'), {
                onFinish: () => reset('password'),
            });
        },
        [post, reset],
    );

    return (
        <div className="flex items-center justify-center gap-4 overflow-hidden bg-black">
            <Head title="Log in" />

            <div className="overflow-hidden bg-black text-black/50 dark:bg-black dark:text-white/50">
                <img id="background" className="absolute top-0 -left-20 w-[720px]" src="/assets/img/LgBg.svg" alt="Laravel background" />

                <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden selection:bg-[#fee819] selection:text-white">
                    <div className="relative w-full max-w-2xl overflow-hidden px-6 lg:max-w-7xl">
                        {/* Header */}
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex invert lg:col-start-2 lg:justify-center">
                                <svg
                                    version="1.0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="50"
                                    height="50"
                                    viewBox="0 0 280 280"
                                    preserveAspectRatio="xMidYMid meet"
                                >
                                    <g
                                        transform="translate(0.000000,302.000000) scale(0.100000,-0.100000)"
                                        fill="darkmode ? '#ffffff' : '#000000'"
                                        stroke="none"
                                    >
                                        <path d="M705 3008 c-41 -120 -475 -1467 -475 -1474 1 -9 1238 -910 1257 -916 6 -2 294 203 640 454 l631 458 -84 257 c-46 142 -154 477 -241 745 l-158 488 -783 0 c-617 0 -784 -3 -787 -12z m1265 -412 c0 -3 65 -205 145 -451 80 -245 145 -448 145 -450 0 -2 -173 -130 -384 -283 l-384 -280 -384 279 c-283 207 -382 284 -380 297 5 22 283 875 289 885 4 7 953 10 953 3z"></path>
                                        <path d="M1176 1661 c21 -15 101 -74 178 -130 l139 -101 31 23 c17 13 92 68 166 122 74 54 139 102 144 106 6 5 -145 9 -344 9 l-354 0 40 -29z"></path>
                                    </g>
                                </svg>
                            </div>
                        </header>

                        {/* Main */}
                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                {/* Left card */}
                                <a
                                    href="https://lionsgeek.ma/"
                                    id="docs-card"
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-[#18181b] p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#fee819] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#fee819]"
                                >
                                    <div id="screenshot-container" className="relative flex w-full flex-1 items-stretch">
                                        <img
                                            src="/assets/img/LgHero.png"
                                            alt="LionsGeek screenshot"
                                            className="aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] dark:hidden"
                                        />
                                        <img
                                            src="/assets/img/LgHero.png"
                                            alt="LionsGeek screenshot dark"
                                            className="hidden aspect-video h-full w-full flex-1 rounded-[10px] object-cover object-top drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                                        />
                                        <div className="absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-zinc-900 to-zinc-900 dark:via-zinc-900 dark:to-zinc-900" />
                                    </div>

                                    <div className="relative flex items-center gap-6 lg:items-end">
                                        <div id="docs-card-content" className="flex items-start gap-6 lg:flex-col">
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#fee819]/10 sm:size-16">
                                                {/* Icon */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="#fee819"
                                                    className="size-10"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-xl font-semibold text-white">LionsGeek Front-End</h2>
                                            </div>
                                        </div>

                                        <svg
                                            className="size-6 shrink-0 stroke-[#fee819]"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                        </svg>
                                    </div>
                                </a>

                                {/* Right card (Login form) */}
                                <div className="flex flex-col items-center justify-center gap-6 overflow-hidden rounded-lg bg-[#18181b] p-6 ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#fee819] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#fee819]">
                                    <form onSubmit={submit} className="w-[90%]">
                                        {/* Email */}
                                        <div>
                                            <label className="text-sm text-gray-200" htmlFor="email">
                                                Email:
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="mt-1 block w-full rounded border p-2 text-white"
                                                required
                                                autoFocus
                                                autoComplete="username"
                                            />
                                            {errors.email && <div className="mt-2 text-sm text-red-500">{errors.email}</div>}
                                        </div>

                                        {/* Password */}
                                        <div className="mt-4">
                                            <label className="text-sm text-gray-200" htmlFor="password">
                                                Password:
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="mt-1 block w-full rounded border p-2 text-white"
                                                required
                                                autoComplete="current-password"
                                            />
                                            {errors.password && <div className="mt-2 text-sm text-red-500">{errors.password}</div>}
                                        </div>

                                        {/* Remember me */}
                                        <div className="mt-4 block">
                                            <label htmlFor="remember_me" className="inline-flex items-center">
                                                <input
                                                    id="remember_me"
                                                    type="checkbox"
                                                    checked={data.remember}
                                                    onChange={(e) => setData('remember', e.target.checked)}
                                                    className="rounded border-gray-300 text-alpha shadow-sm focus:ring-alpha"
                                                />
                                                <span className="ms-2 text-sm text-white">Remember me</span>
                                            </label>
                                        </div>

                                        {/* Actions */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <a
                                                href={route('password.request')}
                                                className="rounded-md text-sm text-gray-300 underline hover:text-gray-400 focus:ring-2 focus:ring-alpha focus:ring-offset-2 focus:outline-none transition-all"
                                            >
                                                Forgot your password?
                                            </a>

                                            <Button
                                                type="submit"
                                                className="ms-3"
                                                disabled={processing}
                                            >
                                                Log in
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="py-16 text-center text-sm text-white/70">LionsGeek Coding Pro &copy;</footer>
                    </div>
                </div>
            </div>
        </div>
    );
}
