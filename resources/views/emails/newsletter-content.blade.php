<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject ?? 'LionsGeek Newsletter' }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
        }
        .newsletter-content {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #007bff;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #eab308;
            text-decoration: none;
            font-weight: bold;
        }
        .social-links a:hover {
            text-decoration: underline;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 15px;
        }
        .divider {
            margin: 30px 0;
            border-top: 2px solid #e9ecef;
        }
        .rtl {
            direction: rtl;
            text-align: right;
        }
        .contact-link {
            color: #007bff;
            text-decoration: underline;
        }
        .unsubscribe {
            margin-top: 20px;
            padding: 15px;
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            font-size: 12px;
            color: #856404;
        }
        .unsubscribe a {
            color: #dc3545;
            text-decoration: none;
            font-weight: bold;
        }
        .unsubscribe a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="90" alt="LionsGeek Logo" class="logo">
        <h1>📧 LionsGeek Newsletter</h1>
        <p>Latest Updates & Insights</p>
    </div>

    <div class="content">
        <h2>Hello!</h2>
        
        <div class="newsletter-content">
            <p>{{ $content }}</p>
        </div>

        <p>Thank you for being part of our community!</p>
        
        <p>Warm regards,<br><strong>The LionsGeek Team</strong></p>

        <div class="divider"></div>

        <div class="rtl">
            <h2>مرحبًا!</h2>
            
            <div class="newsletter-content">
                <p>{{ $content }}</p>
            </div>

            <p>شكرًا لك لكونك جزءًا من مجتمعنا!</p>
            
            <p>مع أطيب التحيات،<br><strong>فريق LionsGeek</strong></p>
        </div>
    </div>

    <div class="footer">
        <div class="social-links">
            <h3 class="links">Join Us:</h3>
            <a href="https://www.instagram.com/lions_geek?igsh=MWNhb2F6eGRjOTZvcg==" target="_blank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 5px;">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
            </a>
            <a href="https://www.facebook.com/LionsGeek?mibextid=ZbWKwL" target="_blank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 5px;">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
            </a>
            <a href="https://x.com/LionsGeek?t=oZV_osSHbR3MV7uSV3AIIA&s=09" target="_blank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 5px;">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter)
            </a>
            <a href="https://www.tiktok.com/@lions_geek?_t=8sZ3ZyKrqvG&_r=1" target="_blank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 5px;">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                TikTok
            </a>
        </div>
        
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>If you have any questions, please <a href="https://lionsgeek.ma/contact" class="contact-link">contact us</a></p>
        
        @if(isset($unsubscribeUrl))
            <div class="unsubscribe">
                <p><strong>Don't want to receive these emails anymore?</strong></p>
                <p>You can <a href="{{ $unsubscribeUrl }}">unsubscribe here</a> at any time.</p>
            </div>
        @endif
        
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
    </div>
</body>
</html>
