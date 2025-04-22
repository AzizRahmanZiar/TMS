<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class SadraiController extends Controller
{
    public function sadrai()
    {
        return Inertia::render('System/Sadrai');
    }
}
