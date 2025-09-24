<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Booking Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { text-align: center; margin-bottom: 20px; }
        .content { background-color: #f8f9fa; padding: 20px; border-radius: 8px; }
        .qrcode { text-align: center; margin: 20px 0; }
        .btn { display: inline-block; padding: 10px 20px; background-color: #ffc107; color: #000; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Booking Confirmation</h1>
        <p>Thank you for booking with us!</p>
    </div>

    <div class="content">
        <h2>Hello {{ $booking->name }}!</h2>
        <p>You have successfully booked the event: <strong>{{ $eventName }}</strong></p>
        <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($eventDate)->format('l, F j, Y g:i A') }}</p>
        <p><strong>Description:</strong> {{ $eventDescription }}</p>

      

        <p><a href="{{ config('app.url') }}" class="btn">Visit Our Website</a></p>
    </div>
</body>
</html>
