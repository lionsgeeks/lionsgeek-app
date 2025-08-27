<?php

namespace App\Http\Controllers;

use App\Models\InfoSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InfosessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $infosessions = InfoSession::all();
        return Inertia::render('admin/infoSessions/index', [
            'infosessions' => $infosessions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd();
        try {
            $request->validate([
                'name' => 'required',
                'formation' => 'required',
                'start_date' => 'required',
                'places' => 'required',
            ]);
            InfoSession::create([
                'name' => strtolower($request->name),
                'formation' => $request->formation,
                'start_date' => $request->start_date,
                'places' => $request->places,
            ]);
            return back()->with('success', 'Session Has Been Created Successfully!');
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('error', 'Something went wrong');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('admin/infoSessions/[id]', [
            'infosession' => InfoSession::where('id', $id)->with('participants.confirmation')->first()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        $infoSession = InfoSession::where('id', $id)->first();
        $request->validate([
            'name' => 'required',
            'formation' => 'required',
            'start_date' => 'required',
            'places' => 'required',
        ]);
        $infoSession->update([
            'name' => $request->name,
            'formation' => $request->formation,
            'start_date' => $request->start_date,
            'places' => $request->places,
        ]);
        return back()->with('success', 'Session Has Been Updated Successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function availabilityStatus($id)
    {
        try {
            //code...
            $infosession = InfoSession::where('id', $id)->first();
            $infosession->update([
                'isAvailable' => !$infosession->isAvailable
            ]);
            return back()->with($infosession->isAvailable ? 'success' : 'info', 'Session ' . ($infosession->isAvailable ? 'is available' : 'is not available'));
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('error', 'Something went wrong');
        }
    }
    public function completeStatus($id)
    {
        try {
            $infosession = InfoSession::where('id', $id)->first();
            $infosession->update([
                'isAvailable' => $infosession->isAvailable ? false : $infosession->isAvailable,
                'isFinish' => !$infosession->isFinish
            ]);
            return back()->with($infosession->isFinish ? 'success' : 'info', 'Session ' . ($infosession->isFinish ? 'is completed' : 'is not completed'));
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('error', 'Something went wrong');
        }
    }
}
