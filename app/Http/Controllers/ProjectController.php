<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return Inertia::render('admin/projects/index', [
            'projects' => $projects
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate([
            "name" => "required|string",
            "description_en" => "string|required",
            "description_fr" => "string|required",
            "description_ar" => "string|required",
            "logo" => "required|mimes:png,jpg,svg,jfif,gif",
        ]);

        if ($request->hasFile("logo")) {
            $logoName = $this->uploadFile($request->file('logo'), "/projects/");
        }
        if ($request->hasFile("preview")) {
            $previewName = $this->uploadFile($request->file('preview'), "/projects/");
        }

        $description = [
            'en' => $request->description_en,
            'fr' => $request->description_fr,
            'ar' => $request->description_ar,
        ];

        Project::create([
            "name" => $request->name,
            "description" => $description,
            "logo" => $logoName,
            "preview" => $request->hasFile("preview") ? $previewName : null
        ]);

        return back()->with('success', 'Project Has Been Added Successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        request()->validate([
            "name" => "required|string",
            "description_en" => "string|required",
            "description_fr" => "string|required",
            "description_ar" => "string|required",
        ]);

        if ($request->hasFile("logo")) {
            $logoName = $this->uploadFile($request->file('logo'), "/projects/");
        }
        if ($request->hasFile("preview")) {
            $previewName = $this->uploadFile($request->file('preview'), "/projects/");
        }

        $description = [
            'en' => $request->description_en,
            'fr' => $request->description_fr,
            'ar' => $request->description_ar,
        ];

        $project->update([
            "name" => $request->name,
            "description" => $description,
            "logo" => $request->hasFile('logo') ? $logoName : $project->logo,
            "preview" => $request->hasFile("preview") ? $previewName : null
        ]);

        return back()->with('success', 'Project Has Been Updated Successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        Storage::disk('public')->delete("images/projects/" . $project->logo);
        if ($project->preview) {
            Storage::disk('public')->delete("images/projects/" . $project->preview);
        }

        $project->delete();
        return back()->with("success", "Project has been deleted successfully!");
    }
}
