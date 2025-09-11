<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\CustomEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ContactController extends Controller
{

    public function index()
    {
        return Inertia::render('client/ContactUs/contactUs', []);
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

        Contact::create([
            'full_name' => $request->first . ' ' . $request->last,
            'phone' => $request->phone,
            'email' => $request->email,
            'message' => $request->message,
        ]);

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
