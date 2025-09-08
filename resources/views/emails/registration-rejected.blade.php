@extends('emails.layouts.base')

@section('title', 'Application Update - ' . config('app.name'))
@section('headerTitle', 'Application Update')
@section('headerSubtitle', 'Thank you for your interest in LionsGeek')

@section('content')
<p>Hi {{ $participant->full_name }},</p>
<p>Thank you for your application to the {{ $participant->formation_field ?? 'LionsGeek' }} program. After careful review, we won’t be moving forward at this time.</p>
<div class="note">
  <p>If you’d like feedback or to be considered for future sessions, feel free to reply to this email.</p>
</div>
<p>We appreciate your interest and wish you all the best in your journey.</p>
<p>Sincerely,<br><strong>The LionsGeek Team</strong></p>
@endsection
