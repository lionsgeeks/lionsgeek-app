@extends('emails.layouts.base')

@section('title', 'Coding Approval - Choose Your Info Session')
@section('headerTitle', "🎉 You're Approved for Coding!")
@section('headerSubtitle', 'Welcome to the LionsGeek Coding Program')

@section('content')
    <h2>Hello {{ $participant->full_name }}!</h2>
    <p>Your application has been approved. Please choose one of the available info sessions below to reserve your place.</p>

    @if ($sessions->isEmpty())
        <div class="panel">
            <p><strong>No available Coding info sessions right now.</strong></p>
            <p class="muted">Please check back later. We will notify you once new sessions are available.</p>

            <div class="divider"></div>
            
            <h2>مرحبًا {{ $participant->full_name }}!</h2>
            <p>تمت الموافقة على طلبك. يرجى اختيار إحدى جلسات التعريف المتاحة أدناه لحجز مكانك.</p>
        </div>
    @else
        @foreach ($sessions as $session)
            <div class="panel">
                <h3>📅 {{ $session->name }}</h3>
                <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($session->start_date)->format('l, F j, Y \a\t g:i A') }}
                </p>
                    @php
                        $approvedCount = \App\Models\Participant::where('info_session_id', $session->id)
                            ->where('status', \App\Models\Participant::STATUS_APPROVED)
                            ->count();
                        $remaining = max($session->places - $approvedCount, 0);
                    @endphp
                </p>
                <div style="text-align: center; margin: 10px 0;">
                    <a href="{{ \Illuminate\Support\Facades\URL::temporarySignedRoute('participants.reserve', now()->addDays(3), ['participant' => $participant->id, 'session' => $session->id]) }}"
                        class="btn">Reserve my place</a>
                </div>
            </div>
        @endforeach
    @endif

@endsection
