<?php

use App\Http\Controllers\ClothsController;
use App\Http\Controllers\KortaiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SadraiController;
use App\Http\Controllers\UniformController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/cloths', [ClothsController::class, 'cloths'])->name('cloths');
Route::get('/sadrai', [SadraiController::class, 'sadrai'])->name('sadrai');
Route::get('/kortai', [KortaiController::class, 'kortai'])->name('kortai');
Route::get('/uniform', [UniformController::class, 'uniform'])->name('uniform');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


