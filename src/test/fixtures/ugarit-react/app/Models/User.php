<?php

namespace App\Models;

// use Heritage\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Heritage\Database\Eloquent\Attributes\Appends;
use Heritage\Database\Eloquent\Attributes\Fillable;
use Heritage\Database\Eloquent\Attributes\Guarded;
use Heritage\Database\Eloquent\Attributes\Hidden;
use Heritage\Database\Eloquent\Attributes\Visible;
use Heritage\Database\Eloquent\Factories\HasFactory;
use Heritage\Foundation\Auth\User as Authenticatable;
use Heritage\Notifications\Notifiable;
use Ugarit\Fortify\TwoFactorAuthenticatable;

#[Fillable(['name'])]
#[Guarded(['id'])]
#[Hidden(['password'])]
#[Visible(['name'])]
#[Appends(['name'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}
