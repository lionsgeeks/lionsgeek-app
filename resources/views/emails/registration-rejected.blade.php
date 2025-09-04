<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Update - LionsGeek</title>
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
            background-color: #212529;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #fee819;
            margin: 0;
            font-size: 28px;
        }
        .header p {
            color: #ffffff;
            margin: 10px 0 0 0;
            font-size: 16px;
        }
        .content {
            background-color: #ffffff;
            padding: 30px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
        }
        .message-box {
            background-color: #fff3cd;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #ffc107;
        }
        .encouragement {
            background-color: #e7f3ff;
            padding: 20px;
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
        .highlight {
            color: #212529;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Hey {{ $participant->full_name }}</h1>
        <p>About your application</p>
    </div>

    <div class="content">
        <p>Thanks for applying to our {{ $participant->formation_field ?? 'LionsGeek' }} program. We really appreciate you taking the time to fill out the application.</p>

        <div class="message-box">
            <h3>Here's the thing</h3>
            <p>We had to make some tough choices this time around, and unfortunately we can't offer you a spot in this session.</p>
        </div>

        <div class="encouragement">
            <h3>But don't let that stop you</h3>
            <p>This isn't about you not being good enough. Sometimes it's just about timing, space, or fit. Here's what we'd suggest:</p>
            
            <p>Keep learning, keep building stuff, and definitely apply again when we open up new sessions. We run these programs regularly, and what doesn't work out this time might be perfect next time.</p>
            
            <p>Also, follow us on social media or check our website - we post about new opportunities all the time.</p>
        </div>

        <p>Seriously, don't give up on this. The tech world needs more people who are willing to put themselves out there and learn.</p>

        <p>Keep at it,<br>
        <strong>The LionsGeek Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
        <p>Building the next generation of tech talent in Morocco</p>
    </div>
</body>
</html>
