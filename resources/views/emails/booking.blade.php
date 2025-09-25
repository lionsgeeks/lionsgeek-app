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
            font-size: 12px;
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
            padding: 10px;
            /* reduced from 20px */
            border-bottom: 1px solid #eee;
        }

        .header img {
            height: 30px;
            /* reduced size */
        }

        .content {
            padding: 12px;
            /* reduced from 20px */
        }

        .content h2 {
            font-size: 16px;
            /* reduced */
            margin-bottom: 6px;
        }

        .content p {
            margin: 4px 0;
            /* reduced from 6px */
            font-size: 12px;
        }

        .divider {
            border-top: 1px solid #eee;
            margin: 12px 0;
            /* reduced from 20px */
        }

        .qrcode {
            text-align: center;
            margin: 12px 0;
            /* reduced */
        }

        .qrcode img {
            width: 120px;
            /* reduced from 160px */
        }

        .footer {
            position: relative;
            border: 1px solid #ddd;
            margin: 10px;
            /* reduced from 20px */
            padding: 10px;
            /* reduced */
            border-radius: 6px;
            height: 180px;
            /* reduced from 250px */
            font-size: 11px;
        }

        .footer .contact {
            width: 50%;
        }

        .footer .contact h4 {
            margin-bottom: 6px;
            color: #0056b3;
            font-size: 13px;
        }

        .footer .map {
            width: 40%;
            text-align: center;
            position: absolute;
            right: 10px;
            top: 40px;
        }

        .footer .map img {
            width: 100%;
            border-radius: 6px;
        }

        .map-remarque {
            margin-top: 3px;
            font-size: 0.75em;
            color: #555;
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
            <div class="contact">
                <h4>Contact Us</h4>
                <p><strong>Email:</strong> contact@lionsgeek.ma</p>
                <p><strong>Phone:</strong> +212 522 662 660</p>
                <p><strong>Address:</strong> LionsGeek, 4th Floor, Ain Sebaa Center, Route de Rabat, Casablanca 20060,
                    Morocco</p>
            </div>
            <div class="map">
                <a
                    href="https://www.google.com/maps/place/LionsGeek/@33.6036273,-7.5357722,733m/data=!3m1!1e3!4m6!3m5!1s0xda7cdb2f812837f:0xbbcfc74fbc11b2d9!8m2!3d33.6037882!4d-7.5338517!16s%2Fg%2F11jy9l0d4m?authuser=0&entry=ttu">
                    <img src="{{ public_path('assets/img/lg_map.png') }}" alt="LionsGeek Location">
                </a>
                <p class="map-remarque">Click the map to open in Google Maps</p>
            </div>
        </div>

    </div>
</body>

</html>
