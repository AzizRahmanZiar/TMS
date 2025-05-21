<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TailorPostController extends Controller
{
    public function tailorpost()
    {
        return Inertia::render('System/TailorPost');
    }
}
