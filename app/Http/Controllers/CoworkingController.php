<?php

namespace App\Http\Controllers;

use App\Models\Coworking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CoworkingController extends Controller
{
    public function index()
    {
        $coworkings = Coworking::all();
        return Inertia::render("admin/coworking/index", [
            "coworkings" => $coworkings
        ]);
    }


    public function show(Coworking $coworking)
    {
        return Inertia::render("admin/coworking/[id]", [
            "coworking" => $coworking
        ]);
    }

    public function store(Request $request)
    {
        if ($request->file('cv')) {
            $cv = $request->file('cv')->store('uploads', 'public');
        }
        if ($request->file('presentation')) {
            $presentation = $request->file('presentation')->store('uploads', 'public');
        }

        // to be finished later
        $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
        ]);

        Coworking::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'birthday' => $request->birthday,
            'formation' => $request->formation,
            'cv' => $cv ?? null,
            'proj_name' => $request->proj_name,
            'proj_description' => $request->proj_desc,
            'domain' => implode(', ', $request->domain) . $request->otherDomain,
            'plan' => $request->proj_plan,
            'presentation' => $presentation ?? null,
            'prev_proj' => $request->prev_proj,
            'reasons' => implode(', ', $request->reasons) . $request->otherReasons,
            'needs' => $request->needs,
            'gender' => $request->gender,
        ]);
    }



    public function update(Request $request, Coworking $coworking)
    {

        $status = $request->status;

        if ($status == 'approve') {
            $coworking->update([
                "status" => "1"
            ]);
            // TODO: Mailer ?
            // Mail::to($coworking->email)->send(new CoworkingActionMailer($coworking->full_name));

        } else {
            $coworking->update([
                "status" => "2"
            ]);
        }
        return back();
    }

    public function destroy(Coworking $coworking)
    {
        $coworking->delete();
        return to_route("coworking.index");
    }

    public function clientIndex()
    {
        return Inertia::render('client/coworking/coworking');
    }

    public function clientForm()
    {
        return Inertia::render('client/coworking/coworkingForm');
    }
}
