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
        <h1>🎉 Booking Confirmation</h1>
        <p>Thank you for booking with us!</p>
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
            <p><strong>Capacity:</strong> {{ $event->capacity }} attendees</p>
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
    </div>

    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>If you have any questions, please contact us at {{ config('mail.from.address') }}</p>
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </div>
</body>
</html>
