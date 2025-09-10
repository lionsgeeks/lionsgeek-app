<?php

namespace App\Http\Controllers;

use App\Mail\AddAdminMail;
use App\Mail\ResetPasswordMail;
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


        return back();
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $user = User::findOrFail($request->input('user_id'));
        $newPassword = Str::random(8);
        $user->password = Hash::make($newPassword);
        $user->save();

        // Send with dedicated reset email template
        Mail::to($user->email)->send(new ResetPasswordMail($newPassword));

        return back();
    }

    public function destroy(User $user)
    {
        // Prevent deleting yourself optionally could be handled here
        $user->delete();
        return back();
    }
}
