<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LionsGeek Account</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; background: #f7f7f8; color: #111827; }
        .container { max-width: 560px; margin: 24px auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
        .header { background: #111827; color: #fee819; padding: 20px; font-weight: bold; font-size: 18px; }
        .content { padding: 24px; }
        .footer { padding: 16px 24px; color: #6b7280; font-size: 12px; }
        .btn { display: inline-block; padding: 10px 16px; background: #fee819; color: #111827; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .muted { color: #6b7280; font-size: 14px; }
        .code { background: #f3f4f6; border: 1px dashed #d1d5db; padding: 12px; border-radius: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    </style>
    </head>
<body>
    <div class="container">
        <div class="header">LionsGeek Account Credentials</div>
        <div class="content">
            <p>Hello,</p>
            <p>Your admin account has been created. Use the access code below to sign in. For security, change your password after first login.</p>
            <p class="muted">Here is your temporary password:</p>
            <div class="code">{{ $randomPassword ?? '********' }}</div>
            <p class="muted" style="margin-top: 16px;">Use this password to sign in, then change it from your profile settings.</p>
            <p style="margin-top: 20px;">
                <a class="btn" href="{{ config('app.url') }}/login">Go to Login</a>
            </p>
        </div>
        <div class="footer">If you did not request this, you can ignore this email.</div>
    </div>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin Account</title>
</head>
<body>
<h1>your Password :{{ $randomPassword }}</h1>
</body>
</html>
