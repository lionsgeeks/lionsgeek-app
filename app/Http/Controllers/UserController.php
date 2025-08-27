<?php

namespace App\Http\Controllers;

use App\Mail\AddAdminMail;
use Illuminate\Support\Facades\Mail;
use App\Models\Mode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function AddAdmin(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
        ]);
        $randomPassword = Str::random(8);

        $addAdmin = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($randomPassword)
        ]);

        // create the tablemode and darkmode relationship
        Mode::create([
            'user_id' => $addAdmin->id,
        ]);

        Mail::to($request->email)->send(new AddAdminMail($randomPassword));


        return back()->with("success", "Admin has been added successfully!");
    }
}
