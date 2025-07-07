<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CoworkingController extends Controller
{
   public function index(){

     return Inertia::render('client/coworking/coworking', [
    ]);
   }
}
