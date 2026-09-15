<?php

namespace App\Providers;

use App\Models\User;
use Heritage\Support\Facades\Gate;
use Heritage\Support\ServiceProvider;

class AuthTestServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('test-auth', fn (User $user) => true);
        Gate::define('test-auth-alt', fn (User $user) => true);
    }
}
