<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; background: #f7f7f8; color: #111827; }
        .container { max-width: 560px; margin: 24px auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
        .header { background: #111827; color: #fee819; padding: 20px; font-weight: bold; font-size: 18px; display:flex; align-items:center; gap:12px; }
        .header img { width: 28px; height: 28px; border-radius: 4px; }
        .content { padding: 24px; }
        .footer { padding: 16px 24px; color: #6b7280; font-size: 12px; }
        .code-box { background: #f3f4f6; border: 1px dashed #d1d5db; padding: 12px; border-radius: 8px; font-size: 22px; font-weight: bold; letter-spacing: 2px; text-align: center; margin: 16px 0; }
    </style>
    </head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" alt="LionsGeek"/>
            Reset Your LionsGeek Password
        </div>
        <div class="content">
        <p>Hello,</p>
        <p>We have reset your password as requested. Use this code to login, then update your password from your account settings.</p>
        <div class="code-box">{{ $newPassword }}</div>
        <p>If you did not request this, please contact the administrator immediately.</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply.</p>
            <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
        </div>
    </div>
</body>
</html>


