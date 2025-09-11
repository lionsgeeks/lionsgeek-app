<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unsubscribe Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .header {
            background-color: #f8d7da;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #f5c6cb;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
        }
        .error-icon {
            font-size: 48px;
            color: #dc3545;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 15px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="90" alt="LionsGeek Logo" class="logo">
        <div class="error-icon">❌</div>
        <h1>Unsubscribe Error</h1>
    </div>

    <div class="content">
        <h2>Unable to process your unsubscribe request</h2>
        
        <p>{{ $message }}</p>
        
        <p>If you continue to receive emails from us, please <a href="https://lionsgeek.ma/contact" class="btn">contact our support team</a> and we'll help you unsubscribe manually.</p>
        
        <p>We apologize for any inconvenience.</p>
        
        <p>Best regards,<br><strong>The LionsGeek Team</strong></p>
    </div>

    <div class="footer">
        <p>If you have any questions, please <a href="https://lionsgeek.ma/contact">contact us</a></p>
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
    </div>
</body>
</html>
