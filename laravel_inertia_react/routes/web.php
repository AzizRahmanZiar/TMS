<?php

use App\Http\Controllers\{
    AdminController,
    ClothsController,
    KortaiController,
    PostController,
    SadraiController,
    UniformController
};
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Site/Home');
})->name('home');

Route::get('/tailor', function () {
    return Inertia::render('Site/Tailors');
})->name('tailors');

Route::get('/post', function () {
    return Inertia::render('Site/Posts');
})->name('posts');

Route::get('/order', function () {
    return Inertia::render('Site/Order');
})->name('order');

Route::get('/shop', function () {
    return Inertia::render('Site/Shop');
})->name('shop');

Route::get('/contact', function () {
    return Inertia::render('Site/Contact');
})->name('contact');

Route::get('/about', function () {
    return Inertia::render('Site/About');
})->name('about');

// Auth routes
require __DIR__.'/auth.php';

// Protected System routes
Route::middleware(['auth'])->group(function () {
    // Common system routes (accessible by both admin and tailor)
    Route::middleware([CheckRole::class . ':admin,tailor'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('System/Dashboard');
        })->name('dashboard');

        // Admin routes
        Route::get('/admin', [AdminController::class, 'admin'])->name('admin');
        Route::put('/user/{user}', [AdminController::class, 'update'])->name('user.update');
        Route::delete('/user/{user}', [AdminController::class, 'destroy'])->name('user.delete');

        // Tailor routes
        Route::get('/cloths', [ClothsController::class, 'cloths'])->name('cloths');
        Route::get('/uniform', [UniformController::class, 'uniform'])->name('uniform');
        Route::get('/kortai', [KortaiController::class, 'kortai'])->name('kortai');
        Route::get('/sadrai', [SadraiController::class, 'sadrai'])->name('sadrai');
        Route::get('/adminpost', [PostController::class, 'adminpost'])->name('tailor.posts');
    });
});
