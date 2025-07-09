<?php

namespace App\Http\Controllers;

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
        return Inertia::render('admin/events/events', [
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
            'cover' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if (!$request->name || !is_array($request->name) || empty(array_filter($request->name))) {
            return back()->withErrors(['name' => 'Event name is required in at least one language.']);
        }

        if (!$request->description || !is_array($request->description) || empty(array_filter($request->description))) {
            return back()->withErrors(['description' => 'Event description is required in at least one language.']);
        }

        $coverPath = null;
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('events', 'public');
        }

        Event::create([
            'name' => $request->name,
            'description' => $request->description,
            'date' => $request->date,
            'capacity' => $request->capacity,
            'cover' => $coverPath,
        ]);

        return redirect()->route('admin.events.index')->with('success', 'Event created successfully!');
    }

    /**
     * Display the specified resource for clients.
     */
    public function show(Event $event)
    {
        return Inertia::render('client/EventDetails/eventdetail', [
            'event' => $event
        ]);
    }

    /**
     * Display the specified resource for admin.
     */
    public function adminShow(Event $event)
    {
        return Inertia::render('admin/events/show', [
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
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
        ];

        if ($request->hasFile('cover')) {
            if ($event->cover) {
                Storage::disk('public')->delete($event->cover);
            }
            $updateData['cover'] = $request->file('cover')->store('events', 'public');
        }

        $event->update($updateData);

        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully!');
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

        return redirect()->route('admin.events.index')->with('success', 'Event deleted successfully!');
    }
    public function Booking(Event $event)
    {
       
    }
}
