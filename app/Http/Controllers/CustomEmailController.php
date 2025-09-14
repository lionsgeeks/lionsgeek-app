<?php

namespace App\Http\Controllers;

use App\Mail\CustomEmailMail;
use App\Models\Contact;
use App\Models\CustomEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class CustomEmailController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'sender' => 'required',
            'receiver' => 'required',
            'subject' => 'required',
            'content' => 'required',
        ]);

        CustomEmail::create([
            'sender' => $request->sender,
            'receiver' => $request->receiver,
            'subject' => $request->subject,
            'content' => $request->content,
        ]);
        // dd($request->all());

        if (str_contains($request->receiver, ',')) {
            $receivers = explode(',', $request->receiver);
            $mailer = Mail::mailer($request->sender);

            foreach ($receivers as $receiver) {
                -$mailer->to($receiver)->send(new CustomEmailMail($request->subject, $request->content));
            }

            if ($request->cc) {
                $mailer->send(new CustomEmailMail($request->subject, $request->content))->cc($request->cc);
            }
            if ($request->bcc) {
                $mailer->send(new CustomEmailMail($request->subject, $request->content))->bcc($request->bcc);
            }
        } else {
            $mailer = Mail::mailer($request->sender)->to($request->receiver);

            if ($request->cc) {
                $mailer->send(new CustomEmailMail($request->subject, $request->content))->cc($request->cc);
            }
            if ($request->bcc) {
                $mailer->send(new CustomEmailMail($request->subject, $request->content))->bcc($request->bcc);
            }


            $mailer->send(new CustomEmailMail($request->subject, $request->content));
        }

        // Flash message
        flash()->success('Email sent successfully!');

        return back();
    }
}
