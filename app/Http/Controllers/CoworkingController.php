<?php

namespace App\Http\Controllers;

use App\Models\Coworking;
use Illuminate\Http\Request;
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

    public function destroy(Coworking $coworking)
    {
        // TODO delete files from storage
        $coworking->delete();

        return to_route("coworking.index");
    }
}
