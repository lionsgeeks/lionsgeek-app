<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subjectLine ?? 'Message from LionsGeek' }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #212529;
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        .logo {
            max-width: 80px;
            margin-bottom: 15px;
        }
        .content {
            padding: 30px;
        }
        .message-box {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #fee819;
        }
        .message-box h3 {
            margin: 0 0 15px 0;
            color: #212529;
            font-size: 18px;
        }
        .message-content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 6px;
            border: 1px solid #e9ecef;
            white-space: pre-wrap;
            font-size: 14px;
            line-height: 1.6;
        }
        .sender-info {
            background-color: #e7f3ff;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #007bff;
        }
        .sender-info h4 {
            margin: 0 0 10px 0;
            color: #212529;
            font-size: 16px;
        }
        .sender-info p {
            margin: 5px 0;
            font-size: 14px;
            color: #666;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 12px;
        }
        .footer p {
            margin: 5px 0;
        }
        .contact-link {
            color: #007bff;
            text-decoration: none;
        }
        .contact-link:hover {
            text-decoration: underline;
        }
        .divider {
            margin: 30px 0;
            border-top: 2px solid #e9ecef;
        }
        .rtl {
            direction: rtl;
            text-align: right;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #212529;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 15px 0;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #fee819;
            color: #212529;
        }
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            .header {
                padding: 20px 15px;
            }
            .content {
                padding: 20px;
            }
            .header h1 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="80" alt="LionsGeek Logo" class="logo">
            <h1>Message from LionsGeek</h1>
            <p>Official Communication</p>
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Hello!</h2>
            
            <p>You have received a message from the LionsGeek team.</p>

            <!-- Sender Information -->
            <div class="sender-info">
                <h4>📧 Message Details</h4>
                <p><strong>From:</strong> {{ $senderEmail ?? 'LionsGeek Team' }}</p>
                @if($subjectLine)
                <p><strong>Subject:</strong> {{ $subjectLine }}</p>
                @endif
                <p><strong>Date:</strong> {{ date('F j, Y \a\t g:i A') }}</p>
            </div>

            <!-- Message Content -->
            <div class="message-box">
                <h3>💬 Your Message</h3>
                <div class="message-content">
                    {!! nl2br(e($contentBody)) !!}
                </div>
            </div>

            <div class="divider"></div>

            <!-- Call to Action -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://lionsgeek.ma/contact" class="btn">Contact LionsGeek</a>
            </div>

            <p><strong>Need help?</strong> Feel free to <a href="https://lionsgeek.ma/contact" class="contact-link">contact us</a> anytime.</p>
            
            <p>Best regards,<br><strong>The LionsGeek Team</strong></p>

            <div class="divider"></div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>LionsGeek</strong> - Empowering the Next Generation of Tech Leaders</p>
            <p>This is an official message from LionsGeek. Please do not reply to this email.</p>
            <p>If you have any questions, please contact us at <a href="mailto:hello@lionsgeek.ma" class="contact-link">hello@lionsgeek.ma</a></p>
            <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
