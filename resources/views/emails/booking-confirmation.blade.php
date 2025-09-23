<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
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
        .event-details {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .booking-details {
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
    </style>
</head>
<body>
    <div class="header">
        <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="90" alt="LionsGeek Logo" class="logo">
        <h1>🎉 Booking Confirmation</h1>
        <p>Thank You For Booking With Us!</p>
    </div>

    <div class="content">
        <h2>Hello {{ $booking->name }}!</h2>

        <p>We're excited to confirm your booking for the following event:</p>

        <div class="event-details">
            <h3>📅 Event Details</h3>
            <p><strong>Event:</strong>
                @if(is_array($event->name))
                    {{ $event->name['en'] ?? $event->name['fr'] ?? $event->name['ar'] ?? 'Event' }}
                @else
                    {{ $event->name }}
                @endif
            </p>
            <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($event->date)->format('l, F j, Y \a\t g:i A') }}</p>
            @if(is_array($event->description))
                <p><strong>Description:</strong> {{ $event->description['en'] ?? $event->description['fr'] ?? $event->description['ar'] ?? '' }}</p>
            @else
                <p><strong>Description:</strong> {{ $event->description }}</p>
            @endif
        </div>

        <div class="booking-details">
            <h3>👤 Your Booking Details</h3>
            <p><strong>Name:</strong> {{ $booking->name }}</p>
            <p><strong>Email:</strong> {{ $booking->email }}</p>
            <p><strong>Phone:</strong> {{ $booking->phone }}</p>
            <p><strong>Booking Date:</strong> {{ $booking->created_at->format('F j, Y \a\t g:i A') }}</p>
        </div>

        <p>Please save this email as your booking confirmation. You may need to present it at the event.</p>

        <p><strong>Important Notes:</strong></p>
        <ul>
            <li>Please arrive 15 minutes before the event starts</li>
            <li>Bring a valid ID for verification</li>
            <li>If you need to cancel, please contact us at least 24 hours in advance</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ config('app.url') }}" class="btn">Visit Our Website</a>
        </div>

        <div class="divider"></div>

        <div class="rtl">
            <h2>مرحبًا {{ $booking->name }}!</h2>

            <p>يسعدنا تأكيد حجزك للفعالية التالية:</p>

            <div class="event-details">
                <h3>📅 تفاصيل الفعالية</h3>
                <p><strong>الفعالية:</strong>
                    @if(is_array($event->name))
                        {{ $event->name['ar'] ?? $event->name['en'] ?? $event->name['fr'] ?? 'فعالية' }}
                    @else
                        {{ $event->name }}
                    @endif
                </p>
                <p><strong>التاريخ:</strong> {{ \Carbon\Carbon::parse($event->date)->format('l, F j, Y \a\t g:i A') }}</p>
                @if(is_array($event->description))
                    <p><strong>الوصف:</strong> {{ $event->description['ar'] ?? $event->description['en'] ?? $event->description['fr'] ?? '' }}</p>
                @else
                    <p><strong>الوصف:</strong> {{ $event->description }}</p>
                @endif
            </div>

            <div class="booking-details">
                <h3>👤 تفاصيل الحجز</h3>
                <p><strong>الاسم:</strong> {{ $booking->name }}</p>
                <p><strong>البريد الإلكتروني:</strong> {{ $booking->email }}</p>
                <p><strong>الهاتف:</strong> {{ $booking->phone }}</p>
                <p><strong>تاريخ الحجز:</strong> {{ $booking->created_at->format('F j, Y \a\t g:i A') }}</p>
            </div>

            <p>يرجى حفظ هذا البريد الإلكتروني كتأكيد للحجز. قد تحتاج إلى تقديمه في الفعالية.</p>

            <p><strong>ملاحظات مهمة:</strong></p>
            <ul>
                <li>يرجى الوصول قبل 15 دقيقة من بداية الفعالية</li>
                <li>احضر هوية صالحة للتحقق</li>
                <li>إذا كنت تحتاج إلى الإلغاء، يرجى التواصل معنا قبل 24 ساعة على الأقل</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ config('app.url') }}" class="btn">زيارة موقعنا</a>
            </div>
        </div>
    </div>

    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>If you have any questions, please contact us at {{ config('mail.from.address') }}</p>
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
    </div>
</body>
</html>
