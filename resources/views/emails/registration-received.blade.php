<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Received - LionsGeek</title>
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
        .welcome-message {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #fee819;
        }
        .next-steps {
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
        <h1>Hey {{ $participant->full_name }}!</h1>
        <p>We got your application</p>
    </div>

    <div class="content">
        <p>Thanks for applying to our {{ $participant->formation_field ?? 'LionsGeek' }} program. We're really glad you're interested in what we're doing here at LionsGeek.</p>

        <div class="welcome-message">
            <h3>What's next?</h3>
            <p>We're going through all the applications right now. Here's the deal:</p>
            
            <p>We'll take a look at your application and get back to you in the next couple of days. If everything looks good, we'll send you the details about when and where the info session will be.</p>
        </div>

        <div class="next-steps">
            <h3>Just a heads up</h3>
            <p>Keep an eye on your email - we'll be in touch soon. Sometimes our emails end up in spam, so maybe check there too if you don't hear from us.</p>
        </div>

        <p>Got questions? Just hit reply and we'll get back to you.</p>

        <p>Talk soon,<br>
        <strong>The LionsGeek Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} LionsGeek. All rights reserved.</p>
        <p>Building the next generation of tech talent in Morocco</p>
    </div>
</body>
</html>
