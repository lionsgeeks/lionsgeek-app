import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft, Mail, Shield } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="h-screen bg-black overflow-hidden relative selection:bg-[#fee819] selection:text-white">
            <Head title="Reset Password" />

            <img id="background" className="absolute top-0 -left-20 w-[720px]" src="/assets/img/LgBg.svg" alt="LionsGeek background" />

            <div className="h-full flex flex-col">
                <div className="w-full max-w-2xl mx-auto px-6 lg:max-w-7xl flex flex-col h-full">
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
                    <main className="flex-1 flex items-center justify-center">
                        {/* Centered Reset form */}
                        <div className="w-full max-w-md mx-auto">
                            <div className="flex flex-col items-center justify-center gap-6 overflow-hidden rounded-lg bg-[#18181b] p-8 ring-1 ring-white/[0.05] transition duration-300 dark:bg-zinc-900 dark:ring-zinc-800">
                                <div className="w-full space-y-6">
                                    {/* Header */}
                                    <div className="text-center space-y-2">
                                        <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                                        <p className="text-sm text-gray-300">
                                            Enter your email address and we'll send you a link to reset your password.
                                        </p>
                                    </div>

                                    {/* Status message */}
                                    {status && (
                                        <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Mail className="h-4 w-4 text-green-400" />
                                                <span className="text-sm font-medium text-green-400">{status}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Form */}
                                    <form onSubmit={submit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-200" htmlFor="email">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-400 focus:border-[#fee819] focus:outline-none focus:ring-2 focus:ring-[#fee819]/20 transition-colors"
                                                placeholder="Enter your email address"
                                                required
                                                autoFocus
                                                autoComplete="email"
                                            />
                                            {errors.email && (
                                                <div className="text-sm text-red-400 mt-1">{errors.email}</div>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full rounded-lg bg-[#fee819] px-4 py-3 font-semibold text-black transition-all duration-200 hover:bg-[#fee819]/90 focus:outline-none focus:ring-2 focus:ring-[#fee819]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                        >
                                            {processing ? (
                                                <>
                                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Mail className="h-4 w-4" />
                                                    <span>Send Reset Link</span>
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    {/* Back to login */}
                                    <div className="text-center">
                                        <a
                                            href={route('login')}
                                            className="inline-flex items-center space-x-2 text-sm text-gray-300 hover:text-[#fee819] transition-colors"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            <span>Back to Login</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="py-4 text-center text-sm text-white/70">LionsGeek Coding Pro &copy;</footer>
                </div>
            </div>
        </div>
    );
}
