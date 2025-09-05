<?php

namespace App\Http\Controllers;

use App\Models\Press;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PressController extends Controller
{
    public function index()
    {
        $presses = Press::all();

        return Inertia::render('admin/press/index', [
            'presses' => $presses
        ]);
    }

    public function show(Press $press)
    {
        return Inertia::render('admin/press/[id]', [
            'press' => $press
        ]);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name.fr' => 'required|string',
            'name.en' => 'required|string',
            'name.ar' => 'required|string',
            'cover' => 'required|image',
            'logo' => 'required|image',
            'link' => 'required|url',
        ]);
        $coverPath = $request->file('cover')->store('covers', 'public');
        $logoPath = $request->file('logo')->store('logos', 'public');

        Press::create([
            'name' => $data['name'],
            'cover' => $coverPath,
            'logo' => $logoPath,
            'link' => $data['link'],
        ]);

        return redirect()->back()->with('success', 'Press created successfully.');
    }


    public function update(Request $request, Press $press)

    {
        $data = $request->validate([
            'name.en' => 'required',
            'name.fr' => 'required',
            'name.ar' => 'required',
            'link' => 'required|url',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);
        $updateData = [
            'name' => $data['name'],
            'link' => $data['link'],
        ];
        if ($request->hasFile('cover')) {
            if ($press->cover) {
                Storage::delete($press->cover);
            }
            $updateData['cover'] = $request->file('cover')->store('press/cover', 'public');
        }

        if ($request->hasFile('logo')) {
            if ($press->logo) {
                Storage::delete($press->logo);
            }
            $updateData['logo'] = $request->file('logo')->store('press/logo', 'public');
        }

        $press->update($updateData);

        return back()->with('success', 'Updated!');
    }


    public function destroy(Press $press)
    {
        $press->delete();
        return to_route('press.index');
    }
}
