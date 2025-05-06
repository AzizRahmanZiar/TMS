<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PostController extends Controller
{
    public function tailorpost()
    {
        return Inertia::render('System/Post');
    }
}
