<?php

use App\Http\Controllers\ClothsController;
use App\Http\Controllers\KortaiController;
use App\Http\Controllers\SadraiController;
use App\Http\Controllers\UniformController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/cloths', [ClothsController::class, 'cloths'])->name('cloths');
Route::get('/sadrai', [SadraiController::class, 'sadrai'])->name('sadrai');
Route::get('/kortai', [KortaiController::class, 'kortai'])->name('kortai');
Route::get('/uniform', [UniformController::class, 'uniform'])->name('uniform');

Route::get('/system', function () {
    return Inertia::render('System/Dashboard');
});



Route::get('/', function () {
    return Inertia::render('Site/Home');
});

Route::get('/tailor', function () {
    return Inertia::render('Site/Tailor');
});
