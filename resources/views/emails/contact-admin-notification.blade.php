<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message - LionsGeek</title>
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
        .contact-details {
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
        .urgent {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 10px;
            border-radius: 5px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="90" alt="LionsGeek Logo" class="logo">
        <h1>📧 New Contact Message</h1>
        <p>Admin Notification</p>
    </div>

    <div class="content">
        <h2>Hello Admin!</h2>
        
        <p>You have received a new message through the LionsGeek contact form.</p>

        <div class="urgent">
            <strong>⚠️ Action Required:</strong> Please review and respond to this message as soon as possible.
        </div>

        <!-- Contact Details -->
        <div class="contact-details">
            <h3>👤 Contact Information</h3>
            <p><strong>Name:</strong> {{ $contact->full_name }}</p>
            <p><strong>Email:</strong> <a href="mailto:{{ $contact->email }}" class="contact-link">{{ $contact->email }}</a></p>
            <p><strong>Phone:</strong> <a href="tel:{{ $contact->phone }}" class="contact-link">{{ $contact->phone }}</a></p>
            <p><strong>Date:</strong> {{ $contact->created_at->format('F j, Y \a\t g:i A') }}</p>
        </div>

        <!-- Message Content -->
        <div class="message-content">
            <h3>💬 Message Content</h3>
            <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; border: 1px solid #e9ecef; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
                {{ $contact->message }}
            </div>
        </div>

        <div class="divider"></div>

        <!-- Call to Action -->
        <div style="text-align: center; margin: 20px 0;">
            <a href="{{ config('app.url') }}/admin/contactus?id={{ $contact->id }}" class="btn">View & Reply in Admin Panel</a>
        </div>

        <p><strong>Quick Actions:</strong></p>
        <ul>
            <li>View & Reply: <a href="{{ config('app.url') }}/admin/contactus?id={{ $contact->id }}" class="contact-link">Open in Admin Panel</a></li>
            <li>Email: <a href="mailto:{{ $contact->email }}" class="contact-link">{{ $contact->email }}</a></li>
            <li>Call: <a href="tel:{{ $contact->phone }}" class="contact-link">{{ $contact->phone }}</a></li>
        </ul>

        <div class="divider"></div>
    </div>

    <div class="footer">
        <p><strong>LionsGeek</strong> - Empowering the Next Generation of Tech Leaders</p>
        <p>This is an automated notification from LionsGeek Admin System.</p>
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
    </div>
</body>
</html>
