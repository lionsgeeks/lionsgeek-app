<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all();
        return Inertia::render('admin/blogs/index', [
            'blogs' => $blogs
        ]);
    }

    public function clientIndex()
    {
        $blogs = Blog::all();
        return Inertia::render('client/blogs/index', [
            'blogs' => $blogs,
        ]);
    }

    public function clientShow(Blog $blog)
    {
        $blogs = Blog::all();
        return Inertia::render('client/blogs/partials/[id]', [
            'blogs' => $blogs,
            'blog' => $blog
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/blogs/partials/blogCreate', [
            'blog' => null,
        ]);
    }

    public function show(Blog $blog)
    {
        return Inertia::render('admin/blogs/partials/blogCreate', [
            'blog' => $blog
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate([
            'title_en' => 'required|string',
            'title_fr' => 'required|string',
            'title_ar' => 'required|string',
            'description_en' => 'required|string',
            'description_fr' => 'required|string',
            'description_ar' => 'required|string',
            'image' => 'required|mimes:png,jpg,jpeg,jfif,webp',
        ]);

        $image = $request->file('image');
        if ($image) {
            $imageName = $this->uploadFile($request->file('image'), "/blog/");

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

            Blog::create([
                'title' => $title,
                'description' => $description,
                'image' => $imageName,
                'user_id' => Auth::user()->id
            ]);

            return to_route('blogs.index');
        }
    }


    public function update(Request $request, Blog $blog)
    {
        request()->validate([
            'title_en' => 'required|string',
            'title_fr' => 'required|string',
            'title_ar' => 'required|string',
            'description_en' => 'required|string',
            'description_fr' => 'required|string',
            'description_ar' => 'required|string',
        ]);

        $image = $request->file('image');
        if ($image) {
            Storage::disk('public')->delete('images/blog/' . $blog->image);
            $imageName = $this->uploadFile($request->file('image'), "/blog/");
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

        $blog->update([
            'title' => $title,
            'description' => $description,
            'image' => $image ? $imageName : $blog->image,
        ]);

        return to_route('blogs.index');
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        Storage::disk('public')->delete('images/blog/' . $blog->image);
        $blog->delete();
    }
}
