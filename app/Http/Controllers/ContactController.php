<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\CustomEmail;
use App\Mail\ContactAdminNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{

    public function index()
    {
        return Inertia::render('client/ContactUs/contactUs', []);
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'receiver' => 'required|email',
            'subject'  => 'nullable|string',
            'content'  => 'required|string',
            'sender'   => 'required|string',
        ]);

        // Save to database
        CustomEmail::create([
            'sender' => $request->sender,
            'receiver' => $request->receiver,
            'subject' => $request->subject,
            'content' => $request->content,
        ]);

        // Send actual email
        try {
            $mailer = \Mail::mailer($request->sender);
            $mailer->to($request->receiver)->send(new \App\Mail\CustomEmailMail($request->subject, $request->content, $request->sender));
        } catch (\Exception $e) {
            \Log::error('Email sending failed: ' . $e->getMessage());
        }

        // Flash message
        flash()->success('Email sent successfully!');
        
        // Debug: Log the flash message
        \Log::info('Flash message set: Email sent successfully!');

        return back()->with('success', 'Email sent successfully!');
    }


    public function show(Request $request)
    {
        $messages = Contact::latest()->get();
        $sendedMessage = CustomEmail::latest()->get();

        $selected = null;
        if ($request->has('id')) {
            $selected = Contact::find($request->id);
        }
        return Inertia::render('admin/ContactUs/index', [
            'messages' => $messages,
            'messages' => $messages,
            'selected' => $selected,
            'sendedMessage' => $sendedMessage,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'first' => 'required|string',
            'last' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|string|email',
            'message' => 'required|string',
        ]);

        $contact = Contact::create([
            'full_name' => $request->first . ' ' . $request->last,
            'phone' => $request->phone,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        // Send admin notification email
        try {
            $adminEmail = 'segiofedereko@gmail.com'; // Admin email for testing
            Mail::to($adminEmail)->send(new ContactAdminNotification($contact));
            \Log::info('Admin notification email sent successfully to: ' . $adminEmail);
        } catch (\Exception $e) {
            \Log::error('Failed to send admin notification email: ' . $e->getMessage());
        }

        return back();
    }
    public function toggleRead(Contact $message)
{
    $message->mark_as_read = !$message->mark_as_read;
    $message->save();

    return back(); 
}

  public function destroy(Contact $contact)
    {
        $contact->delete();
        return back();
    }

}
