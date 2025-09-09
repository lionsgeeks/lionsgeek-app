<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{

    public function index()
    {
        $galleries = Gallery::with('images')->get();
        return Inertia::render('admin/gallery/index', [
            'galleries' => $galleries
        ]);
    }

    public function clientIndex()
    {
        $galleries = Gallery::with('images')->get();
        return Inertia::render('client/gallery/index', [
            'galleries' => $galleries
        ]);
    }


    public function clientShow(Gallery $gallery)
    {

        $gal = Gallery::where('id', $gallery->id)->with('images')->first();
        return Inertia::render('client/gallery/[id]', [
            'gallery' => $gal
        ]);
    }

    /**
     * Display the specified resource (admin view).
     */
    public function show(Gallery $gallery)
    {
        $gal = Gallery::where('id', $gallery->id)->with('images')->first();
        return Inertia::render('admin/gallery/[id]', [
            'gallery' => $gal
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate([
            "title_en" => "string|required",
            "title_fr" => "string|required",
            "title_ar" => "string|required",

            "description_en" => "string|required",
            "description_fr" => "string|required",
            "description_ar" => "string|required",

            "couverture" => "required|file|image|mimes:jpeg,png,jpg",

            "images.*" => "file|image|mimes:jpeg,png,jpg"
        ]);

        // for more information about this function, look at Controller.php
        $fileName = $this->uploadFile($request->file('couverture'), "/gallery/");

        $title = [
            'en' => $request->title_en,
            'fr' => $request->title_fr,
            'ar' => $request->title_ar,
        ];
        $description = [
            'en' => $request->description_en,
            'fr' => $request->description_fr,
            'ar' => $request->description_ar,
        ];


        $gallery =  Gallery::create([
            "title" => $title,
            "description" => $description,
            "couverture" => $fileName
        ]);

        // ? Multiple images store
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {

                $fileName = $this->uploadFile($file, "/");
                // Save each image to the database
                $gallery->images()->create([
                    'path' => $fileName
                ]);
            }
        }

        return back();
    }


    public function update(Request $request, Gallery $gallery)
    {
        request()->validate([
            "title_en" => "string|required",
            "title_fr" => "string|required",
            "title_ar" => "string|required",

            "description_en" => "string|required",
            "description_fr" => "string|required",
            "description_ar" => "string|required",
        ]);


        if ($request->file('couverture')) {
            Storage::disk("public")->delete("images/gallery/" . $gallery->couverture);
            $fileName = $this->uploadFile($request->file('couverture'), "/gallery/");
        }



        $title = [
            'en' => $request->title_en,
            'fr' => $request->title_fr,
            'ar' => $request->title_ar,
        ];
        $description = [
            'en' => $request->description_en,
            'fr' => $request->description_fr,
            'ar' => $request->description_ar,
        ];

        $gallery->update([
            "title" => $title,
            "description" => $description,
            "couverture" => $request->file('couverture') ? $fileName : $gallery->couverture,
        ]);

        // ? Multiple images store
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {

                $fileName = $this->uploadFile($file, "/");
                // Save each image to the database
                $gallery->images()->create([
                    'path' => $fileName
                ]);
            }
        }

        return back();
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {

        if ($gallery) {
            Storage::disk("public")->delete("images/gallery/" . $gallery->couverture);
            foreach ($gallery->images as $image) {
                $image->erase();
            }
            $gallery->delete();
            return back();
        }

        if (!$gallery) {
            return back();
        }
    }
}
