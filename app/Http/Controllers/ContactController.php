<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\CustomEmail;
use App\Mail\ContactAdminNotification;
use App\Mail\CustomEmailMail;
use Illuminate\Http\Request;
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
            'contact_file' => 'nullable|file|max:20480|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png,gif'
        ]);

        $filePath = null;
        $fileName = null;
        $attachments = [];

        if ($request->hasFile('contact_file')) {
            $file = $request->file('contact_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('contact_files', $fileName, 'public');

            $attachments[] = [
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'path' => storage_path('app/public/' . $filePath),
                'mime' => $file->getMimeType()
            ];
        }

        // Save to database
        CustomEmail::create([
            'sender' => $request->sender,
            'receiver' => $request->receiver,
            'subject' => $request->subject,
            'content' => $request->content,
            'file_path' => $filePath,
            'file_name' => $fileName,
        ]);

        // Send email
        try {
            $mailer = Mail::mailer($request->sender);
            $mailer->to($request->receiver)->send(
                new CustomEmailMail($request->subject, $request->content, $request->sender, $attachments)
            );
            
            flash()->success('Email sent successfully!');
        } catch (\Exception $e) {
            flash()->error('Failed to send email. Please try again.');
        }

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
            'contact_file' => 'nullable|file|max:20480|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png,gif',
        ]);

        $filePath = null;
        $fileName = null;

        if ($request->hasFile('contact_file')) {
            $file = $request->file('contact_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('contact_files', $fileName, 'public');
        }

        $contact = Contact::create([
            'full_name' => $request->first . ' ' . $request->last,
            'phone' => $request->phone,
            'email' => $request->email,
            'message' => $request->message,
            'file_path' => $filePath,
            'file_name' => $fileName,
        ]);

        // Send admin notification email
        try {
            foreach ([env("Boss_email"), env("PM_email")] as $mail) {
                Mail::to($mail)->send(new ContactAdminNotification($contact));
            }
        } catch (\Exception $e) {
            // Silent fail - email notification is optional
        }

        return back();
    }

    public function markAllAsRead()
    {
        try {
            Contact::where('mark_as_read', false)
                ->orWhereNull('mark_as_read')
                ->update(['mark_as_read' => true]);
            
            return redirect()->back()->with('success', 'All messages marked as read successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to mark messages as read');
        }
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
