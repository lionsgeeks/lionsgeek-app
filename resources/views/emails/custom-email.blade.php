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
        .message-details {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
        }
        .message-content {
            background-color: #e7f3ff;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #007bff;
        }
        .attachments-section {
            background-color: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #ffc107;
        }
        .attachment-item {
            background-color: #ffffff;
            padding: 10px;
            margin: 5px 0;
            border-radius: 3px;
            border: 1px solid #e9ecef;
            display: flex;
            align-items: center;
            font-size: 14px;
        }
        .attachment-icon {
            margin-right: 10px;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ffc107;
            color: #000;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
            font-weight: bold;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 15px;
        }
        .divider {
            margin: 30px 0;
            border-top: 2px solid #e9ecef;
        }
        .contact-link {
            color: #007bff;
            text-decoration: none;
        }
        .contact-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="90" alt="LionsGeek Logo" class="logo">
        <h1>📧 Message from LionsGeek</h1>
        <p>Official Communication</p>
    </div>

    <div class="content">
        <h2>Hello!</h2>
        
        <p>You have received a message from the LionsGeek team.</p>

        <!-- Message Details -->
        <div class="message-details">
            <h3>📋 Message Details</h3>
            <p><strong>From:</strong> {{ $senderEmail ?? 'LionsGeek Team' }}</p>
            @if($subjectLine)
            <p><strong>Subject:</strong> {{ $subjectLine }}</p>
            @endif
            <p><strong>Date:</strong> {{ date('F j, Y \a\t g:i A') }}</p>
        </div>

        <!-- Message Content -->
        <div class="message-content">
            <h3>💬 Your Message</h3>
            <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; border: 1px solid #e9ecef; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
                {!! nl2br(e($contentBody)) !!}
            </div>
        </div>

        <!-- Attachments Section - Only show if attachments exist -->        
        @if(isset($attachments) && count($attachments) > 0)
        <div class="attachments-section">
            <h3>📎 Attachments</h3>
            @foreach($attachments as $attachment)
            <div class="attachment-item">
                <span class="attachment-icon">📄</span>
                <div>
                    <strong>{{ $attachment['name'] }}</strong>
                    @if(isset($attachment['size']))
                    <span style="color: #6c757d; font-size: 12px; margin-left: 10px;">
                        ({{ number_format($attachment['size'] / 1024, 1) }} KB)
                    </span>
                    @endif
                </div>
            </div>
            @endforeach
        </div>
        @endif

        <div class="divider"></div>

        <!-- Call to Action -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="https://lionsgeek.ma/contact" class="btn">Contact LionsGeek</a>
        </div>

        <p><strong>Need help?</strong> Feel free to <a href="https://lionsgeek.ma/contact" class="contact-link">contact us</a> anytime.</p>
        
        <p>Best regards,<br><strong>The LionsGeek Team</strong></p>

        <div class="divider"></div>
    </div>

    <div class="footer">
        <p><strong>LionsGeek</strong> - Empowering the Next Generation of Tech Leaders</p>
        <p>This is an official message from LionsGeek. Please do not reply to this email.</p>
        <p>If you have any questions, please contact us at <a href="mailto:hello@lionsgeek.ma" class="contact-link">hello@lionsgeek.ma</a></p>
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
    </div>
</body>
</html>
