@extends('emails.layouts.base')

@section('title', 'Registration Received - ' . config('app.name'))
@section('headerTitle', '🎉 Application Received')
@section('headerSubtitle', 'Thanks for applying to LionsGeek')

@section('content')
<p>Thanks for applying to our {{ $participant->formation_field ?? 'LionsGeek' }} program. We're really glad you're interested in what we're doing here at LionsGeek.</p>

<div class="panel">
  <h3>What's next?</h3>
  <p>We're reviewing all applications right now.</p>
  <p>We'll get back to you within a few days. If everything looks good, we'll email you the details about the info session.</p>
</div>

<div class="note">
  <h3>Heads up</h3>
  <p>Please check your inbox regularly. If you don't see our email, check your spam/junk folder just in case.</p>
</div>

<p>Questions? <a href="{{ rtrim(config('app.url'), '/') }}/contact" style="color:#0d6efd; text-decoration: underline;">Contact us</a>.</p>
<p>Talk soon,<br><strong>The LionsGeek Team</strong></p>

<div class="divider"></div>

<div class="rtl">
  <p>شكرًا لتقديمك لبرنامج {{ $participant->formation_field ?? 'LionsGeek' }}. يسعدنا اهتمامك بما نقوم به في LionsGeek.</p>
  <div class="panel">
    <h3>ما الخطوة التالية؟</h3>
    <p>نقوم حاليًا بمراجعة جميع الطلبات.</p>
    <p>سنعاود التواصل معك خلال الأيام القليلة القادمة. إذا سار كل شيء على ما يرام، سنرسل لك تفاصيل جلسة التعريف عبر البريد الإلكتروني.</p>
  </div>
  <div class="note">
    <h3>ملاحظة مهمة</h3>
    <p>يرجى التحقق من بريدك الإلكتروني بانتظام. إذا لم تجد رسالتنا، تحقق من مجلد البريد غير المرغوب فيه.</p>
  </div>
  <p>أسئلة؟ <a href="{{ rtrim(config('app.url'), '/') }}/contact" style="color:#0d6efd; text-decoration: underline;">تواصل معنا</a>.</p>
  <p>نراك قريبًا،<br><strong>فريق LionsGeek</strong></p>
</div>
@endsection
