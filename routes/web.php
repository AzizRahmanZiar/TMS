<?php

use App\Http\Controllers\{
    AdminController,
    ClothsController,
    ContactController,
    CustomerOrderController,
    KortaiController,
    TailorPostController,
    SadraiController,
    SiteController,
    UniformController,
    UserMessageController,
    NotificationController,
    ClothController,
    PostRatingController,
    MessageController,
};
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    $posts = \App\Models\TailorPost::with(['user'])
        ->latest()
        ->get()
        ->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'description' => $post->description,
                'image' => $post->image ? asset('storage/' . $post->image) : null,
                'author' => $post->user->name,
                'created_at' => $post->created_at->format('Y-m-d')
            ];
        });

    $ratings = \App\Models\PostRating::with(['user', 'tailorPost'])
        ->latest()
        ->get()
        ->map(function ($rating) {
            return [
                'id' => $rating->id,
                'postId' => $rating->tailor_post_id,
                'user_name' => $rating->user->name,
                'user_image' => $rating->user->profile_image ? asset('storage/' . $rating->user->profile_image) : null,
                'rating' => $rating->rating,
                'comment' => $rating->comment,
                'created_at' => $rating->created_at->format('Y-m-d')
            ];
        });

    return Inertia::render('Site/Home', [
        'posts' => $posts,
        'ratings' => $ratings
    ]);
})->name('home');

Route::get('/tailor', [SiteController::class, 'tailors'])->name('tailors');
Route::get('/shop', [SiteController::class, 'shops'])->name('shop');

Route::get('/post', [SiteController::class, 'posts'])->name('posts');
Route::post('/post/{tailorPost}/rate', [PostRatingController::class, 'store'])->name('post.rate');
Route::get('/testimonials', [PostRatingController::class, 'getTestimonials'])->name('testimonials');

Route::get('/order', function () {
    return Inertia::render('Site/Order', [
        'tailorId' => request('tailorId'),
        'tailorName' => request('tailorName')
    ]);
})->name('order');

Route::get('/contact', function () {
    return Inertia::render('Site/Contact');
})->name('contact');

Route::get('/about', function () {
    return Inertia::render('Site/About');
})->name('about');


Route::resource('kortai', KortaiController::class);
Route::resource('uniforms', UniformController::class);

// Sadrai routes
Route::resource('sadrai', SadraiController::class);

// Auth routes
require __DIR__.'/auth.php';

// Protected System routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Common system routes (accessible by both admin and tailor)
    Route::middleware([CheckRole::class . ':admin,tailor'])->group(function () {
        Route::get('/dashboard', function () {
            $cloths = \App\Models\Cloth::where('user_id', auth()->id())->latest()->get();
            $uniforms = \App\Models\Uniform::where('user_id', auth()->id())->latest()->get();
            $kortais = \App\Models\Kortai::where('user_id', auth()->id())->latest()->get();
            return Inertia::render('System/Dashboard', [
                'cloths' => $cloths,
                'uniforms' => $uniforms,
                'kortais' => $kortais
            ]);
        })->name('dashboard');

        // Admin routes
        Route::get('/admin', [AdminController::class, 'admin'])->name('admin');
        Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
        Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');
        Route::put('/user/{user}', [AdminController::class, 'update'])->name('user.update');
        Route::delete('/user/{user}', [AdminController::class, 'destroy'])->name('user.delete');

        // Tailor routes
        Route::get('/sadrai', [SadraiController::class, 'sadrai'])->name('sadrai');
        Route::get('/customerorder', [CustomerOrderController::class, 'customerorder'])->name('customerorder');
        Route::get('/customerorder/{order}', [CustomerOrderController::class, 'show'])->name('customer.orders.show');
        Route::put('/customerorder/{order}', [CustomerOrderController::class, 'update'])->name('customer.orders.update');
        Route::delete('/customerorder/{order}', [CustomerOrderController::class, 'destroy'])->name('customer.orders.destroy');

        // TailorPost routes
        Route::get('/tailor-posts', [TailorPostController::class, 'index'])->name('tailor-posts.index');
        Route::post('/tailor-posts', [TailorPostController::class, 'store'])->name('tailor-posts.store');
        Route::put('/tailor-posts/{tailorPost}', [TailorPostController::class, 'update'])->name('tailor-posts.update');
        Route::delete('/tailor-posts/{tailorPost}', [TailorPostController::class, 'destroy'])->name('tailor-posts.destroy');
    });

    // Message routes (accessible by all authenticated users)
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');

    Route::get('/tailorpost', [TailorPostController::class, 'index'])->name('tailorpost.index');
    Route::post('/tailorpost', [TailorPostController::class, 'store'])->name('tailorpost.store');
    Route::put('/tailorpost/{tailorPost}', [TailorPostController::class, 'update'])->name('tailorpost.update');
    Route::delete('/tailorpost/{tailorPost}', [TailorPostController::class, 'destroy'])->name('tailorpost.destroy');

    // Cloths routes
    Route::get('/cloths', [ClothsController::class, 'cloths'])->name('cloths.index');
    Route::post('/cloths', [ClothsController::class, 'store'])->name('cloths.store');
    Route::put('/cloths/{cloth}', [ClothsController::class, 'update'])->name('cloths.update');
    Route::delete('/cloths/{cloth}', [ClothsController::class, 'destroy'])->name('cloths.destroy');

    // Uniform route
    Route::get('/uniforms', [UniformController::class, 'index'])->name('uniforms.index');
    Route::post('/uniforms', [UniformController::class, 'store'])->name('uniforms.store');
    Route::put('/uniforms/{uniform}', [UniformController::class, 'update'])->name('uniforms.update');
    Route::delete('/uniforms/{uniform}', [UniformController::class, 'destroy'])->name('uniforms.destroy');

    // Kortai routes
    Route::get('/kortai', [KortaiController::class, 'index'])->name('kortai.index');
    Route::post('/kortai', [KortaiController::class, 'store'])->name('kortai.store');
    Route::put('/kortai/{kortai}', [KortaiController::class, 'update'])->name('kortai.update');
    Route::delete('/kortai/{kortai}', [KortaiController::class, 'destroy'])->name('kortai.destroy');
});

// Customer Order Routes
Route::middleware(['auth'])->group(function () {
    Route::post('/customer/orders', [CustomerOrderController::class, 'store'])->name('customer.orders.store');
});
