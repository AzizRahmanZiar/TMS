<?php

use App\Http\Controllers\ClothsController;
use App\Http\Controllers\KortaiController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SadraiController;
use App\Http\Controllers\UniformController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;


// Route::get('/', function () {
//     return Inertia::render('System/Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });



Route::get('/dashboard', function () {
    return Inertia::render('System/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




Route::get('/cloths', [ClothsController::class, 'cloths'])->name('cloths');
Route::get('/sadrai', [SadraiController::class, 'sadrai'])->name('sadrai');
Route::get('/kortai', [KortaiController::class, 'kortai'])->name('kortai');
Route::get('/uniform', [UniformController::class, 'uniform'])->name('uniform');
Route::get('/adminpost', [PostController::class, 'adminpost'])->name('adminpost');

// Route::get('/system', function () {
//     return Inertia::render('System/Dashboard');
// });



Route::get('/', function () {
    return Inertia::render('Site/Home');
});


Route::get('/tailor', function () {
    return Inertia::render('Site/Tailors');
});

Route::get('/post', function () {
    return Inertia::render('Site/Posts');
});

Route::get('/order', function () {
    return Inertia::render('Site/Order');
});

Route::get('/shop', function () {
    return Inertia::render('Site/Shop');
});

Route::get('/contact', function () {
    return Inertia::render('Site/Contact');
});

Route::get('/about', function () {
    return Inertia::render('Site/About');
});
require __DIR__.'/auth.php';
