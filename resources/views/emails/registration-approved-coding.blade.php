<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coding Program Approval</title>
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
        .session-details {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .no-sessions {
            background-color: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #ffc107;
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
        .rtl {
            direction: rtl;
            text-align: right;
        }
        .muted {
            color: #6c757d;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="90" alt="LionsGeek Logo" class="logo">
        <h1>🎉 Invitation To Info Session</h1>
        <p>LionsGeek Coding Program</p>
    </div>

    <div class="content">
        <h2>Hello {{ $participant->full_name }}!</h2>
        
        <p>Great news! You're invited to attend an info session for the LionsGeek Coding Program. Please choose one of the available info sessions below to reserve your place.</p>

        <p>During the info session, you'll learn more about the program structure, meet our team, and get all the details you need for the next steps.</p>

        <div class="divider"></div>

        <div class="rtl">
            <h2>مرحبًا {{ $participant->full_name }}!</h2>
            
            <p>أخبار رائعة! أنت مدعو لحضور جلسة تعريفية لبرنامج LionsGeek للبرمجة. يرجى اختيار إحدى جلسات التعريف المتاحة أدناه لحجز مكانك.</p>

            <p>خلال الجلسة التعريفية، ستتعرف على هيكل البرنامج، وتقابل فريقنا، وتحصل على جميع التفاصيل التي تحتاجها للخطوات التالية.</p>
        </div>

        <div class="divider"></div>

        <h3>📅 Available Sessions</h3>

        @if ($sessions->isEmpty())
            <div class="no-sessions">
                <h3>⏰ No Available Sessions</h3>
                <p><strong>No available Coding info sessions right now.</strong></p>
                <p class="muted">Please check back later. We will notify you once new sessions are available.</p>
            </div>
        @else
            @foreach ($sessions as $session)
                <div class="session-details">
                    <h3>📅 {{ $session->name }}</h3>
                    <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($session->start_date)->format('l, F j, Y \a\t g:i A') }}</p>
                    
                    <div style="text-align: center; margin: 15px 0;">
                        <a href="{{ \Illuminate\Support\Facades\URL::temporarySignedRoute('participants.reserve', now()->addDays(3), ['participant' => $participant->id, 'session' => $session->id]) }}"
                            class="btn">Reserve My Place</a>
                    </div>
                </div>
            @endforeach
        @endif

        <p><strong>Important Notes:</strong></p>
        <ul>
            <li>Please reserve your place as soon as possible as sessions fill up quickly</li>
            <li>You will receive a confirmation email once you reserve your session</li>
            <li>If you have any questions, please contact us</li>
        </ul>
    </div>

    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>If you have any questions, please contact us at {{ config('mail.from.address') }}</p>
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </div>
</body>
</html>
