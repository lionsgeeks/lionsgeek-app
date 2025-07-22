import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useCallback } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import AuthLayout from '@/layouts/auth-layout';
import { Link } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = useCallback((e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    }, [post, reset]);

    return (
        <div className="flex items-center justify-center gap-4">
            <Head title="Log in" />
            <div className='bg-alpha w-[50vw] h-[100vh] flex items-center justify-center'>
                <AppLogoIcon className="size-48 fill-current animate-pulse" />
            </div>
            <div className="w-[50vw]">
                <div className="flex flex-col items-center gap-4">
                    <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                        <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                            <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                        </div>
                        <span className="sr-only">Log in to your account</span>
                    </Link>

                    <div className="space-y-2 text-center">
                        <h1 className="text-xl font-medium">Log in to your account</h1>
                        <p className="text-center text-sm text-muted-foreground">Enter your email and password below to log in</p>
                    </div>
                </div>
                <form className="flex flex-col gap-6 p-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {canResetPassword && (
                                    <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                tabIndex={3}
                            />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Log in
                        </Button>
                    </div>
                </form>
            </div>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </div>
    );
}
