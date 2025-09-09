<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Update</title>
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
        .feedback-note {
            background-color: #e7f3ff;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .encouragement {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #6f42c1;
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
        <h1>📧 Application Update</h1>
        <p>Thank You For Your Interest In LionsGeek</p>
    </div>

    <div class="content">
        <h2>Hello {{ $participant->full_name }},</h2>
        
        <p>Thank you for taking the time to apply to our {{ $participant->formation_field ?? 'LionsGeek' }} program. We truly appreciate your interest in joining the LionsGeek community.</p>

        <p>After careful review of all applications, we won't be moving forward with your application at this time. We know this isn't the news you were hoping for, and we want you to know that this decision was difficult given the high quality of applications we received.</p>

        <div class="feedback-note">
            <h3>💬 Want Feedback?</h3>
            <p>If you'd like specific feedback on your application or would like to be considered for future sessions, please feel free to reply to this email. We're happy to help you strengthen your application for next time.</p>
        </div>

        <div class="encouragement">
            <h3>🚀 Keep Growing</h3>
            <p>We encourage you to continue developing your skills and pursuing your interests. The tech industry has many paths, and we believe in your potential to succeed.</p>
        </div>

        <p>We appreciate your interest in LionsGeek and wish you all the best in your learning journey. Please don't hesitate to apply again in the future!</p>
        
        <p>Warm regards,<br><strong>The LionsGeek Team</strong></p>

        <div class="divider"></div>

        <div class="rtl">
            <h2>مرحبًا {{ $participant->full_name }}،</h2>
            
            <p>شكرًا لك على الوقت الذي قضيته في التقدم لبرنامج {{ $participant->formation_field ?? 'LionsGeek' }} الخاص بنا. نحن نقدر حقاً اهتمامك بالانضمام إلى مجتمع LionsGeek.</p>

            <p>بعد المراجعة الدقيقة لجميع الطلبات، لن نتمكن من المضي قدماً مع طلبك في هذا الوقت. نعلم أن هذا ليس الخبر الذي كنت تأمله، ونريدك أن تعرف أن هذا القرار كان صعباً نظراً لجودة الطلبات العالية التي تلقيناها.</p>

            <div class="feedback-note">
                <h3>💬 تريد ملاحظات؟</h3>
                <p>إذا كنت تريد ملاحظات محددة حول طلبك أو تود أن يتم اعتبارك للجلسات المستقبلية، لا تتردد في الرد على هذا البريد الإلكتروني. يسعدنا مساعدتك في تقوية طلبك للمرة القادمة.</p>
            </div>

            <div class="encouragement">
                <h3>🚀 استمر في النمو</h3>
                <p>نشجعك على الاستمرار في تطوير مهاراتك ومتابعة اهتماماتك. صناعة التكنولوجيا لديها العديد من المسارات، ونحن نؤمن بإمكاناتك للنجاح.</p>
</div>

            <p>نحن نقدر اهتمامك بـ LionsGeek ونتمنى لك كل التوفيق في رحلة التعلم الخاصة بك. لا تتردد في التقدم مرة أخرى في المستقبل!</p>
            
            <p>مع أطيب التحيات،<br><strong>فريق LionsGeek</strong></p>
        </div>
    </div>

    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>If you have any questions, please contact us at {{ config('mail.from.address') }}</p>
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
    </div>
</body>
</html>
