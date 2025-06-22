<?php

use App\Http\Controllers\{
    AdminController,
    // ClothsController,
    ContactController,
    CustomerOrderController,
    DashboardController,
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
    TailorSettingsController,
};
use App\Http\Controllers\Auth\RegisterController;
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
Route::delete('/post/{tailorPost}/rate', [PostRatingController::class, 'destroy'])->name('post.rate.delete');
Route::get('/testimonials', [PostRatingController::class, 'getTestimonials'])->name('testimonials');

Route::get('/order', [SiteController::class, 'order'])->name('order');

Route::get('/contact', function () {
    return Inertia::render('Site/Contact');
})->name('contact');

Route::get('/about', function () {
    return Inertia::render('Site/About');
})->name('about');

Route::get('/adv', [App\Http\Controllers\AdvertisementController::class, 'getForSite'])->name('adv');


Route::resource('kortai', KortaiController::class);
Route::resource('uniforms', UniformController::class);

// Sadrai routes
Route::resource('sadrai', SadraiController::class);

// CSRF token refresh route
Route::get('/refresh-csrf', function () {
    return response()->json(['token' => csrf_token()]);
});

// Auth routes
require __DIR__.'/auth.php';

// Profile Management routes (restricted to admin, tailor, and shopkeeper)
Route::middleware(['auth', 'checkrole:admin,tailor,shopkeeper'])->group(function () {
    Route::get('profile', [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Protected System routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Common system routes (accessible by admin, tailor, and shopkeeper)
    Route::middleware(['checkrole:admin,tailor,shopkeeper'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

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

        // Settings routes (for tailors)
        Route::get('/settings', [TailorSettingsController::class, 'index'])->name('settings.index');
        Route::put('/settings/order-limit', [TailorSettingsController::class, 'updateOrderLimit'])->name('settings.update-order-limit');
        Route::post('/settings/reset-weekly-count', [TailorSettingsController::class, 'resetWeeklyCount'])->name('settings.reset-weekly-count');

        // TailorPost routes
        Route::get('/tailor-posts', [TailorPostController::class, 'index'])->name('tailor-posts.index');
        Route::post('/tailor-posts', [TailorPostController::class, 'store'])->name('tailor-posts.store');
        Route::match(['PUT', 'POST'], '/tailor-posts/{tailorPost}', [TailorPostController::class, 'update'])->name('tailor-posts.update');
        Route::delete('/tailor-posts/{tailorPost}', [TailorPostController::class, 'destroy'])->name('tailor-posts.destroy');
    });

    // Message routes (accessible by all authenticated users)
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');

    // Notification routes (accessible by all authenticated users)
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-read');
    Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-read');
    Route::get('/notifications/unread-count', [NotificationController::class, 'getUnreadCount'])->name('notifications.unread-count');







    Route::get('/tailorpost', [TailorPostController::class, 'index'])->name('tailorpost.index');
    Route::post('/tailorpost', [TailorPostController::class, 'store'])->name('tailorpost.store');
    Route::put('/tailorpost/{tailorPost}', [TailorPostController::class, 'update'])->name('tailorpost.update');
    Route::delete('/tailorpost/{tailorPost}', [TailorPostController::class, 'destroy'])->name('tailorpost.destroy');

    // Cloths routes
    // Route::get('/cloths', [ClothController::class, 'cloths'])->name('cloths.index');
    // Route::post('/cloths', [ClothController::class, 'store'])->name('cloths.store');
    // Route::put('/cloths/{cloth}', [ClothController::class, 'update'])->name('cloths.update');
    // Route::delete('/cloths/{cloth}', [ClothController::class, 'destroy'])->name('cloths.destroy');

    // Cloths routes
    Route::get('/cloths', [ClothController::class, 'index'])->name('cloths.index');
    Route::post('/cloths', [ClothController::class, 'store'])->name('cloths.store');
    Route::put('/cloths/{cloth}', [ClothController::class, 'update'])->name('cloths.update');
    Route::delete('/cloths/{cloth}', [ClothController::class, 'destroy'])->name('cloths.destroy');

    // Sadrai routes
    Route::get('/sadrai', [SadraiController::class, 'index'])->name('sadrai.index');
    Route::post('/sadrai', [SadraiController::class, 'store'])->name('sadrai.store');
    Route::put('/sadrai/{sadrai}', [SadraiController::class, 'update'])->name('sadrai.update');
    Route::delete('/sadrai/{sadrai}', [SadraiController::class, 'destroy'])->name('sadrai.destroy');

    // Uniform routes
    Route::get('/uniforms', [UniformController::class, 'index'])->name('uniforms.index');
    Route::post('/uniforms', [UniformController::class, 'store'])->name('uniforms.store');
    Route::put('/uniforms/{uniform}', [UniformController::class, 'update'])->name('uniforms.update');
    Route::delete('/uniforms/{uniform}', [UniformController::class, 'destroy'])->name('uniforms.destroy');

    // Kortai routes
    Route::get('/kortai', [KortaiController::class, 'index'])->name('kortai.index');
    Route::post('/kortai', [KortaiController::class, 'store'])->name('kortai.store');
    Route::put('/kortai/{kortai}', [KortaiController::class, 'update'])->name('kortai.update');
    Route::delete('/kortai/{kortai}', [KortaiController::class, 'destroy'])->name('kortai.destroy');

    // Advertisement routes (for shopkeepers)
    Route::middleware(['checkrole:shopkeeper'])->group(function () {
        Route::get('/advertisements', [App\Http\Controllers\AdvertisementController::class, 'index'])->name('advertisements.index');
        Route::post('/advertisements', [App\Http\Controllers\AdvertisementController::class, 'store'])->name('advertisements.store');
        Route::match(['PUT', 'POST'], '/advertisements/{advertisement}', [App\Http\Controllers\AdvertisementController::class, 'update'])->name('advertisements.update');
        Route::delete('/advertisements/{advertisement}', [App\Http\Controllers\AdvertisementController::class, 'destroy'])->name('advertisements.destroy');
    });
});

// Customer Order Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/customer/orders', [CustomerOrderController::class, 'index'])->name('customer.orders.index');
    Route::post('/customer/orders', [CustomerOrderController::class, 'store'])->name('customer.orders.store');
});
