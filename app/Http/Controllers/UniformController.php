<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class UniformController extends Controller
{
    public function uniform()
    {
        return Inertia::render('System/Uniform');
    }
}
