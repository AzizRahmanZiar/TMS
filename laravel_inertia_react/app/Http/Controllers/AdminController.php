<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminController extends Controller
{
    public function admin()
    {
        return Inertia::render('System/Admin');
    }
}
