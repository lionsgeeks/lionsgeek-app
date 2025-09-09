<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Received</title>
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
        .next-steps {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #28a745;
        }
        .important-note {
            background-color: #e7f3ff;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
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
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
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
        .logo {
            max-width: 150px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="90" alt="LionsGeek Logo" class="logo">
        <h1>Application Received</h1>
        <p>Thanks For Applying To LionsGeek</p>
    </div>

    <div class="content">
        <h2>Hello {{ $participant->full_name }}!</h2>
        
        <p>Thank you for applying to our {{ $participant->formation_field ?? 'LionsGeek' }} program. We're really excited that you're interested in what we're doing here at LionsGeek.</p>

        <div class="next-steps">
            <h3>📋 What's Next?</h3>
            <p>We're currently reviewing all applications and will get back to you.</p>
            <p>If everything looks good, we'll email you the details about the info session and next steps.</p>
        </div>

        <div class="important-note">
            <h3>📧 Important Reminder</h3>
            <p>Please check your inbox regularly. If you don't see our email, please check your spam/junk folder just in case.</p>
        </div>

        <p><strong>Have questions?</strong> Feel free to <a href="{{ rtrim(config('app.url'), '/') }}/contact" class="contact-link">contact us</a> anytime.</p>
        
        <p>We're looking forward to potentially having you join our community!</p>
        
        <p>Best regards,<br><strong>The LionsGeek Team</strong></p>

        <div class="divider"></div>

        <div class="rtl">
            <h2>مرحبًا {{ $participant->full_name }}!</h2>
            
            <p>شكرًا لك على التقدم لبرنامج {{ $participant->formation_field ?? 'LionsGeek' }} الخاص بنا. نحن متحمسون جداً لاهتمامك بما نقوم به في LionsGeek.</p>

            <div class="next-steps">
                <h3>📋 ما الخطوة التالية؟</h3>
                <p>نحن حالياً نراجع جميع الطلبات وسنتواصل معك.</p>
                <p>إذا سار كل شيء على ما يرام، سنرسل لك تفاصيل جلسة التعريف والخطوات التالية عبر البريد الإلكتروني.</p>
            </div>

            <div class="important-note">
                <h3>📧 تذكير مهم</h3>
                <p>يرجى التحقق من بريدك الإلكتروني بانتظام. إذا لم تجد رسالتنا، يرجى التحقق من مجلد البريد غير المرغوب فيه.</p>
            </div>

            <p><strong>لديك أسئلة؟</strong> لا تتردد في <a href="{{ rtrim(config('app.url'), '/') }}/contact" class="contact-link">التواصل معنا</a> في أي وقت.</p>
            
            <p>نتطلع إلى إمكانية انضمامك إلى مجتمعنا!</p>
            
            <p>مع أطيب التحيات،<br><strong>فريق LionsGeek</strong></p>
        </div>
    </div>

    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>If you have any questions, please contact us at {{ config('mail.from.address') }}</p>
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </div>
</body>
</html>
