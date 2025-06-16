<?php

namespace App\Providers;

use App\Models\Cloth;
use App\Policies\ClothPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        $this->configurePolicies();
    }

    protected function configurePolicies(): void
    {
        Gate::policy(Cloth::class, ClothPolicy::class);
    }
}