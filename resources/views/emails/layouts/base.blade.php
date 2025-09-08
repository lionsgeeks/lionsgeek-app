<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', config('app.name'))</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 640px; margin: 0 auto; padding: 20px; }
        .header { background-color: #212529; padding: 28px 20px; text-align: center; border-radius: 10px; margin-bottom: 20px; }
        .header h1 { color: #fee819; margin: 0; font-size: 26px; }
        .header p { color: #ffffff; margin: 8px 0 0 0; font-size: 15px; }
        .content { background-color: #ffffff; padding: 24px; border: 1px solid #e9ecef; border-radius: 10px; }
        .panel { background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #fee819; }
        .note { background-color: #e7f3ff; padding: 16px; border-radius: 8px; margin: 16px 0; }
        .footer { text-align: center; margin-top: 26px; padding-top: 18px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 13px; }
        .btn { display: inline-block; padding: 10px 20px; background-color: #fee819; color: #000000; text-decoration: none; border-radius: 8px; margin: 10px 0; font-weight: 600; }
        .muted { color: #6c757d; font-size: 14px; }
        .divider { margin: 22px 0; border-top: 1px solid #e9ecef; }
        .rtl { direction: rtl; text-align: right; }
    </style>
</head>
<body>
    <div class="header">
        <h1>@yield('headerTitle', config('app.name'))</h1>
        <p>@yield('headerSubtitle', '')</p>
    </div>

    <div class="content">
        @yield('content')
    </div>

    <div class="footer">
        <p>This is an automated message. Please do not reply.</p>
        <p>If you have questions, contact us at {{ config('mail.from.address') }}</p>
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
    </div>
</body>
</html>


