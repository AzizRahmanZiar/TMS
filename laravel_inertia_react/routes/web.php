<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClothsController;
use App\Http\Controllers\KortaiController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SadraiController;
use App\Http\Controllers\UniformController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('System/Dashboard');
})->name('dashboard');

Route::get('/admin', [AdminController::class, 'admin'])->name('admin');
Route::get('/cloths', [ClothsController::class, 'cloths'])->name('cloths');
Route::get('/sadrai', [SadraiController::class, 'sadrai'])->name('sadrai');
Route::get('/kortai', [KortaiController::class, 'kortai'])->name('kortai');
Route::get('/uniform', [UniformController::class, 'uniform'])->name('uniform');
Route::get('/adminpost', [PostController::class, 'adminpost'])->name('adminpost');

Route::get('/', function () {
    return Inertia::render('Site/Home');
});

Route::get('/registration', function () {
    return Inertia::render('Site/Registration');
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
