<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KortaiController extends Controller
{
    public function kortai()
{
    return Inertia::render('System/Kortai');
}
}
