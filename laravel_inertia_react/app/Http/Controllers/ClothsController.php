<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ClothsController extends Controller
{
    public function cloths()
    {
        return Inertia::render('System/Cloths');
    }
}
