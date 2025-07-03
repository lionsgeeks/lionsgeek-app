<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function destroy(Image $image)
    {

        Storage::disk('public')->delete('images/gallery/' . $image->path);
        $image->delete();
        return back();
    }
}
