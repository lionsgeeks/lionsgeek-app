<?php

namespace App\Http\Controllers;

use App\Models\booking;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource for clients.
     */
    public function index()
    {
        $events = Event::orderBy('date', 'desc')->get();
        return Inertia::render('client/events/events', [
            'events' => $events
        ]);
    }

    /**
     * Display a listing of the resource for admin.
     */
    public function adminIndex()
    {
        $events = Event::orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/events/index', [
            'events' => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/events/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        $request->validate([
            'date' => 'required|date',
            'capacity' => 'required|integer|min:1',
            'cover' => 'required|image|mimes:jpeg,png,jpg,gif',
            'location' => 'required|string',
        ]);

        if (!$request->name || !is_array($request->name) || empty(array_filter($request->name))) {
            return back()->withErrors(['name' => 'Event name is required in at least one language.']);
        }

        if (!$request->description || !is_array($request->description) || empty(array_filter($request->description))) {
            return back()->withErrors(['description' => 'Event description is required in at least one language.']);
        }

        $coverPath = null;
        if ($request->hasFile('cover')) {
            if ($request->hasFile('cover')) {
                $file = $request->file('cover');
                $filename = $file->getClientOriginalName();
                $file->storeAs('images/events', $filename, 'public');

                $coverPath = $filename;
            }
        }

        Event::create([
            'name' => $request->name,
            'description' => $request->description,
            'date' => $request->date,
            'capacity' => $request->capacity,
            'location' => $request->location,
            'cover' => $coverPath,
        ]);

        return redirect()->route('admin.events.index');
    }

    /**
     * Display the specified resource for clients.
     */
    public function show(Event $event)

    {
        $event->load('bookings');
        return Inertia::render('client/EventDetails/eventdetail', [
            'event' => $event

        ]);
    }

    /**
     * Display the specified resource for admin.
     */
    public function adminShow(Event $event)
    {

        $event->load('bookings');

        return Inertia::render('admin/events/[id]', [
            'event' => $event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {

        $request->validate([
            'date' => 'required|date',
            'capacity' => 'required|integer|min:1',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'location' => 'required|string',
        ]);

        if (!$request->name || !is_array($request->name) || empty(array_filter($request->name))) {
            return back()->withErrors(['name' => 'Event name is required in at least one language.']);
        }

        if (!$request->description || !is_array($request->description) || empty(array_filter($request->description))) {
            return back()->withErrors(['description' => 'Event description is required in at least one language.']);
        }

        $updateData = [
            'name' => $request->name,
            'description' => $request->description,
            'date' => $request->date,
            'capacity' => $request->capacity,
            'location' => $request->location,
        ];

        if ($request->hasFile('cover')) {
            $file = $request->file('cover');

            $filename = $file->getClientOriginalName();

            $file->storeAs('images/events', $filename, 'public');

            $updateData['cover'] = $filename;
        }


        $event->update($updateData);

        return redirect()->route('admin.events.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        if ($event->cover) {
            Storage::disk('public')->delete($event->cover);
        }

        $event->delete();

        return redirect()->route('admin.events.index');
    }
}
