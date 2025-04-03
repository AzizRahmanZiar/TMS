<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PostController extends Controller
{
    public function adminpost()
    {
        return Inertia::render('System/Post');
    }
}
