<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Unsubscribed Successfully</title>
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
            background-color: #d4edda;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #c3e6cb;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
        }
        .success-icon {
            font-size: 48px;
            color: #28a745;
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
        <div class="success-icon">✅</div>
        <h1>Successfully Unsubscribed</h1>
    </div>

    <div class="content">
        <h2>You've been unsubscribed from our newsletter</h2>
        
        <p>We're sorry to see you go! Your email address <strong>{{ $email }}</strong> has been successfully removed from our newsletter mailing list.</p>
        
        <p>You will no longer receive newsletter emails from LionsGeek.</p>
        
        <p>If you change your mind in the future, you can always <a href="https://lionsgeek.ma" class="btn">visit our website</a> to subscribe again.</p>
        
        <p>Thank you for being part of our community!</p>
        
        <p>Best regards,<br><strong>The LionsGeek Team</strong></p>
    </div>

    <div class="footer">
        <p>If you have any questions, please <a href="https://lionsgeek.ma/contact">contact us</a></p>
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
    </div>
</body>
</html>
