<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeSubscriberMail;
use App\Models\Newsletter;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use App\Notifications\Subscriber as NotificationsSubscriber;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subscribers = Subscriber::all();
        $lastnews = Newsletter::latest()->take(4)->get();
        return Inertia::render('admin/newsletter/index', [
            'subscribers' => $subscribers,
            'lastnews' => $lastnews,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required',
            'content' => 'required',
        ]);

        Newsletter::create([
            'subject' => $request->subject,
            'content' => $request->content,
        ]);

        $visitors = Subscriber::all();
        Notification::send($visitors, new NotificationsSubscriber($request->subject, $request->content));
        return back()->with('success', 'Newsletter sent succefully!');
    }


    // delete unvalide emails
    public function fakeUsers()
    {
        $subscribers = Subscriber::all();
        foreach ($subscribers as $key => $subscriber) {
            if (!filter_var($subscriber->email, FILTER_VALIDATE_EMAIL)) {
                $subscriber->delete();
            }
        }
        return back();
    }


    public function subscribe(Request $request)
    {
        request()->validate([
            "email" => "required",
        ]);
        $checkUser = Subscriber::where('email', $request->email)->first();
        if ($checkUser) {
            return response()->json([
                'status' => 69,
                'message' => 'This email already exist'
            ]);
        } else {
            Subscriber::create([
                "email" => $request->email,
            ]);
            Mail::to($request->email)->send(new WelcomeSubscriberMail());
        }
    }


    public function unsubscribe(Request $request)
    {
        // dd($request->id);
        $request->validate([
            'id' => 'required',
        ]);
        try {
            $subscriberId = Crypt::decrypt($request->id);
        } catch (DecryptException $e) {
            return response()->json([
                'status' => 69,
                'message' => 'Invalid decryption key or tampered data',
            ]);
        }
        $subscriber = Subscriber::where('id', $subscriberId)->first();
        if ($subscriber) {
            $subscriber->delete();
        }
        return response()->json([
            'status' => 200
        ]);
    }
}
