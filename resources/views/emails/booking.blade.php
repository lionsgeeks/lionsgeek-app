<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Booking PDF</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.4; color: #333; }
        .header { text-align: center; margin-bottom: 20px; }
        .content { padding: 20px; border: 1px solid #ccc; }
        .qrcode { text-align: center; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Booking Confirmation PDF</h1>
    </div>

    <div class="content">
        <p><strong>Name:</strong> {{ $booking->name }}</p>
        <p><strong>Email:</strong> {{ $booking->email }}</p>
        <p><strong>Phone:</strong> {{ $booking->phone }}</p>
        <p><strong>Event:</strong> {{ $eventName }}</p>
        <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($eventDate)->format('l, F j, Y g:i A') }}</p>
        <p><strong>Description:</strong> {{ $eventDescription }}</p>

        <div class="qrcode">
            <img src="data:image/png;base64,{{ $qrCode }}" alt="QR Code" width="200">
        </div>
    </div>
</body>
</html>
