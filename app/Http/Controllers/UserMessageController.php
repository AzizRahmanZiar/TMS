<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserMessageController extends Controller
{
    public function messages()
    {
        return Inertia::render('System/Messages');
    }
}
