<?php

use App\Http\Controllers\{
    AdminController,
    ClothsController,
    KortaiController,
    PostController,
    SadraiController,
    UniformController
};
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Site/Home');
})->name('home');

Route::get('/registration', function () {
    return Inertia::render('Site/Registration');
})->name('register');

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
    // Admin routes
    Route::middleware([CheckRole::class . ':admin,tailor'])->prefix('admin')->group(function () {
        Route::get('/', [AdminController::class, 'admin'])->name('admin');

    });

    // Tailor routes
    Route::middleware([CheckRole::class . ':tailor'])->prefix('tailor')->group(function () {
        Route::get('cloths', [ClothsController::class, 'cloths'])->name('cloths');
        Route::get('uniform', [UniformController::class, 'uniform'])->name('uniform');
        Route::get('kortai', [KortaiController::class, 'kortai'])->name('kortai');
        Route::get('sadrai', [SadraiController::class, 'sadrai'])->name('sadrai');
        Route::get('posts', [PostController::class, 'adminpost'])->name('tailor.posts');
    });

    // Common system routes (accessible by both admin and tailor)
    Route::middleware([CheckRole::class . ':admin,tailor'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('System/Dashboard');
        })->name('dashboard');
    });
});
