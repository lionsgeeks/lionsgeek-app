<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject ?? 'LionsGeek Newsletter' }}</title>
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
        .header h1 {
            margin: 0;
            padding: 0;
        }
        .header p {
            margin: 10px 0 0 0;
            padding: 0;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
        }
        .content p {
            margin: 15px 0;
            padding: 0 10px;
        }
        .content h2 {
            margin: 20px 0 15px 0;
            padding: 0 10px;
        }
        .newsletter-content {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #007bff;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
        }
        .social-links a:hover {
            text-decoration: underline;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 15px;
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
        .btn:hover {
            background-color: #0056b3;
        }
        .unsubscribe {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            font-size: 12px;
            color: #6c757d;
        }
        .unsubscribe a {
            color: #dc3545;
            text-decoration: none;
        }
        .unsubscribe a:hover {
            text-decoration: underline;
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
    </style>
</head>
<body>
    <div class="header">
        <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="90" alt="LionsGeek Logo" class="logo">
        <h1>📧 LionsGeek Newsletter</h1>
        <p>Latest Updates & Insights</p>
    </div>

    <div class="content">
        {{-- Greeting --}}
        @if (! empty($greeting))
            <h2>{{ $greeting }}</h2>
        @else
            @if ($level === 'error')
                <h2>Whoops!</h2>
            @else
                <h2>Hello!</h2>
            @endif
        @endif

        {{-- Intro Lines --}}
        @foreach ($introLines as $line)
            <p>{{ $line }}</p>
        @endforeach

        {{-- Action Button --}}
        @isset($actionText)
            <div style="text-align: center; margin: 20px 0;">
                <a href="{{ $actionUrl }}" class="btn">{{ $actionText }}</a>
            </div>
        @endisset

        {{-- Outro Lines --}}
        @foreach ($outroLines as $line)
            <p>{{ $line }}</p>
        @endforeach

        {{-- Salutation --}}
        @if (! empty($salutation))
            <p>{{ $salutation }}</p>
        @else
            <p>Regards,<br><strong>{{ config('app.name') }}</strong></p>
        @endif

        <div class="divider"></div>

        <div class="rtl">
            {{-- Arabic version of the content --}}
            @if (! empty($greeting))
                <h2>{{ $greeting }}</h2>
            @else
                <h2>مرحبًا!</h2>
            @endif

{{-- Subcopy --}}
@isset($actionText)
<x-slot:subcopy>
@lang(
    "If you're having trouble clicking the \":actionText\" button, copy and paste the URL below\n".
    'into your web browser:',
    [
        'actionText' => $actionText,
    ]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
{{-- <p style="text-align: center; font-size:smaller; ">
    If you no longer wish to receive these emails, you can
    <a href="{{ $unsubscribeUrl }}">unsubscribe here</a>.
</p> --}}
</x-slot:subcopy>
@endisset
</x-mail::message>
