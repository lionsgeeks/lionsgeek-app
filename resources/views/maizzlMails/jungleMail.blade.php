<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" media="screen">
  <style>
    @media (max-width: 600px) {
      .sm-p-6 {
        padding: 24px !important
      }
      .sm-px-4 {
        padding-left: 16px !important;
        padding-right: 16px !important
      }
    }
  </style>
</head>
<body style="margin: 0; width: 100%; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word">
  <div role="article" aria-roledescription="email" aria-label lang="en">
    <div class="sm-px-4" style="background-color: #f8fafc; font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif">
      <table align="center" style="margin: 0 auto" cellpadding="0" cellspacing="0" role="none">
        <tr>
          <td style="width: 552px; max-width: 100%">
            <div role="separator" style="line-height: 24px">&zwj;</div>
            <table style="width: 100%" cellpadding="0" cellspacing="0" role="none">
              <tr>
                <td class="sm-p-6" style="border-radius: 8px; background-color: #fffffe; padding: 24px 36px; border: 1px solid #e2e8f0">
                  <table align="center" style="margin: 0 auto" cellpadding="0" cellspacing="0" role="none">
                    <tr>
                      <td class="sm-p-6" href="https://lionsgeek.ma" style="padding: 20px 36px">
                        <img src="https://media.licdn.com/dms/image/v2/D4E0BAQEI5pl3PyS-Eg/company-logo_200_200/company-logo_200_200/0/1734088749325/lionsgeek_logo?e=2147483647&v=beta&t=2tZP_cpgMZO4IFtfyB0GNKXIrPO5I5w6a8iUlnrhntQ" width="90" alt="LionsGeek" style="max-width: 100%; vertical-align: middle">
                      </td>
                    </tr>
                  </table>
                  <div role="separator" style="line-height: 24px">&zwj;</div>
                  <h1 style="margin: 0 0 16px; font-size: 24px; line-height: 32px; font-weight: 600; color: #0f172a">
                    Welcome to the Jungle! Your Adventure Awaits 🎉
                  </h1>
                  <div role="separator" style="line-height: 5px">&zwj;</div>
                  <p style="font-size: 16px; line-height: 24px; color: #475569">Congratulations, {{ $full_name }}!</p>
                  <div role="separator" style="line-height: 4px">&zwj;</div>
                  <p style="font-size: 16px; line-height: 24px; color: #475569">We are thrilled to welcome you to the {{
                                    $traning }}
                    Jungle after your successful interview!</p>
                  <div role="separator" style="line-height: 4px">&zwj;</div>
                  <p style="font-size: 16px; line-height: 24px; color: #475569">Here are your important details:</p>
                  <div role="separator" style="line-height: 4px">&zwj;</div>
                  <ul style="font-size: 16px; line-height: 24px; color: #475569">
                    <li style="margin-top: 12px">Your Jungle Path: {{ $traning }}</li>
                    <li style="margin-top: 12px">Start Date: {{ \Carbon\Carbon::parse($day)->format('Y-m-d') }} at
                      9:30 am
                    </li>
                    <li style="margin-top: 12px">Location: 4eme étage, Ain Sebaa Center, Route de Rabat-، Km 8,
                      Casablanca 20050</li>
                  </ul>
                  <div role="separator" style="line-height: 4px">&zwj;</div>
                  <p style="font-size: 16px; line-height: 24px; color: #475569">Stay tuned for further instructions to make the
                    most of your
                    journey.</p>
                  <div role="separator" style="line-height: 4px">&zwj;</div>
                  <p style="font-size: 16px; line-height: 24px; color: #475569">We are excited to have you on board and can’t wait
                    to see you
                    flourish in the jungle!</p>
                  <div style="text-align:center">
                    <a href="https://lionsgeek.ma/participant/confirmation/jungle/{{ $full_name }}/{{$id}}" style="padding: 10px 20px; background-color:#000; color: #fff; text-decoration: none; border-radius: 10px;
                                            ">
                      Click To Confirm Your Attendance
                    </a>
                  </div>
                  <div role="separator" style="line-height: 24px">&zwj;</div>
                  <p style="font-size: 16px; line-height: 24px; font-weight: 700; color: #475569">Best wishes,</p>
                  <div role="separator" style="line-height: 4px">&zwj;</div>
                  <p style="font-size: 16px; line-height: 24px; color: #475569">LionsGeek</p>
                  <div role="separator" style="line-height: 24px">&zwj;</div> <span dir="rtl">  <div role="separator" style="line-height: 5px">&zwj;</div>                                    <p style="font-size: 16px; line-height: 24px; color: #475569">تهانينا، {{ $full_name }}!</p>  <div role="separator" style="line-height: 4px">&zwj;</div>                                    <p style="font-size: 16px; line-height: 24px; color: #475569">نحن متحمسون جدًا للترحيب بك في الـJungle
                                        الخاصة بـ{{ $traning }} بعد نجاحك في المقابلة!</p>  <div role="separator" style="line-height: 4px">&zwj;</div>                                    <p style="font-size: 16px; line-height: 24px; color: #475569">إليك التفاصيل المهمة الخاصة بك:</p>  <div role="separator" style="line-height: 4px">&zwj;</div>                                    <ul style="font-size: 16px; line-height: 24px; color: #475569">
                                        <li style="margin-top: 12px">مسارك : {{ $traning }}</li>
                                        <li style="margin-top: 12px">تاريخ البدء: {{ \Carbon\Carbon::parse($day)->format('Y-m-d
                                            ') }} على الساعة 9:30  </li>
                                        <li style="margin-top: 12px">الموقع: الطابق الرابع، عين السبع سنتر، طريق الرباط، كيلومتر 8،
                                            الدار البيضاء 20050</li>
                                    </ul>  <div role="separator" style="line-height: 4px">&zwj;</div>                                    <p style="font-size: 16px; line-height: 24px; color: #475569">تابعنا للحصول على المزيد من التعليمات لتحقيق
                                        أقصى استفادة من رحلتك.</p>  <div role="separator" style="line-height: 4px">&zwj;</div>                                    <p style="font-size: 16px; line-height: 24px; color: #475569">نحن متحمسون لانضمامك إلينا ولا نستطيع الانتظار
                                        لرؤيتك تتألق في الـJungle!</p>
                                         <div style="text-align:center">
                                            <a href="https://lionsgeek.ma/participant/confirmation/jungle/{{ $full_name }}/{{$id}}" style="padding: 10px 20px; background-color:#000; color: #fff; text-decoration: none; border-radius: 10px;
                                            ">
                                                انقر هنا لتأكيد حضورك
                                            </a>
                                        </div>  <div role="separator" style="line-height: 24px">&zwj;</div>                                    <p style="font-size: 16px; line-height: 24px; font-weight: 700; color: #475569">مع أطيب التمنيات،</p>  <div role="separator" style="line-height: 4px">&zwj;</div>                                    <p style="font-size: 16px; line-height: 24px; color: #475569">LionsGeek</p>
                                </span>
                  <div role="separator" style="line-height: 24px">&zwj;</div>
                  <div role="separator" style="height: 1px; line-height: 1px; background-color: #cbd5e1; margin-top: 24px; margin-bottom: 24px">&zwj;</div>
                  <table align="center" style="margin: 0 auto" cellpadding="0" cellspacing="0" role="none">
                    <tr style="margin-bottom: 24px; font-size: 16px; line-height: 24px; font-weight: 700">
                      <p style="padding: 12px; color: #475569">Follow Us on :</p>
                    </tr>
                    <tr>
                      <td class="sm-p-6" href="https://lionsgeek.ma" style="padding-left: 36px; padding-right: 36px; padding-bottom: 32px">
                        <div style="font-weight: 600">
                          <a href="https://www.instagram.com/lions_geek?igsh=MWNhb2F6eGRjOTZvcg==" style="padding: 4px; color: #E1306C">Instagram</a>
                          <a href="https://www.facebook.com/LionsGeek?mibextid=ZbWKwL" style="padding: 4px; color: #1877F2">Facebook</a>
                          <a href="https://www.tiktok.com/@lions_geek?_t=8sZ3ZyKrqvG&_r=1" style="padding: 4px; color: #25F4EE">Tiktok</a>
                          <a href="https://x.com/LionsGeek?t=oZV_osSHbR3MV7uSV3AIIA&s=09" style="padding: 4px; color: #1DA1F2">X
                            (Twitter)</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
