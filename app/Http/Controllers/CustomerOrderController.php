<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerOrderController extends Controller
{
     public function customerorder()
    {
        return Inertia::render('System/CustomerOrder');
    }
}
