<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Booking Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #fff;
            color: #333;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: auto;
            border: 1px solid #ddd;
            border-radius: 6px;
            overflow: hidden;
        }

        .header {
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }

        .header img {
            height: 40px;
        }

        .content {
            padding: 20px;
        }

        .content h2 {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .content p {
            margin: 6px 0;
            font-size: 14px;
        }

        .divider {
            border-top: 1px solid #eee;
            margin: 20px 0;
        }

        .qrcode {
            text-align: center;
            margin: 20px 0;
        }

        .qrcode img {
            width: 160px;
        }

        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #eee;
            padding: 15px 20px;
            font-size: 13px;
        }

        .footer img {
            width: 180px;
            border: 1px solid #ddd;
        }

        .footer .info {
            max-width: 55%;
        }

        .footer .info p {
            margin: 4px 0;
        }
    </style>
</head>

<body>
    <div class="container">

        <!-- Header -->
        <div class="header">
            <img src="{{ public_path('assets/img/lg_logo.png') }}" alt="LionsGeek Logo">
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Invitation to {{ $eventName }}</h2>
            <p><strong>Name:</strong> {{ $booking->name }}</p>
            <p><strong>Email:</strong> {{ $booking->email }}</p>
            <p><strong>Phone:</strong> {{ $booking->phone }}</p>
            <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($eventDate)->format('l, F j, Y g:i A') }}</p>
            <p><strong>Description:</strong> {{ $eventDescription }}</p>

            <div class="divider"></div>

            <p style="text-align: center; font-weight: bold;">For Event Organizers</p>
            <div class="qrcode">
                <img src="data:image/png;base64,{{ $qrCode }}" alt="QR Code">
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="info">
                <p><strong>Contact Us</strong></p>
                <p>Email: contact@lionsgeek.ma</p>
                <p>Phone: +212 522 662 660</p>
                <p>Address: LionsGeek, 4th Floor, Ain Sebaa Center, Route de Rabat, Casablanca 20060, Morocco</p>
            </div>
            <div>
                <img src="{{ public_path('images/map.png') }}" alt="Map">
            </div>
        </div>

    </div>
</body>

</html>
