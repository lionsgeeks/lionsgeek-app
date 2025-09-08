@extends('emails.layouts.base')

@section('title', 'Registration Approved')
@section('headerTitle', 'Registration Approved')
@section('headerSubtitle', 'Choose your info session')

@section('content')
<p>Your registration has been approved. Please visit your dashboard to choose an available info session.</p>
<div style="text-align: center; margin: 10px 0;">
  <a href="{{ config('app.url') }}" class="btn">Go to Dashboard</a>
</div>
@endsection
