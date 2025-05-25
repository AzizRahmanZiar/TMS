<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\Roles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile_image',
        'experience',
        'career',
        'previous_work',
        'certifications',
        'skills',
        'work_availability',
        'tailoring_name',
        'tailoring_address',
        'tailor_count',
        'published_year',
        'contact_number',
        'shop_email',
        'working_hours',
        'services',
        'payment_methods',
        'shop_images',
        'social_links',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
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
            'role' => Roles::class,
            'payment_methods' => 'array',
            'shop_images' => 'array',
            'social_links' => 'array',
        ];
    }

    public function hasRole(Roles $role): bool
    {
        return $this->role === $role->value;
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(Roles::ADMIN);
    }

    public function isTailor(): bool
    {
        return $this->hasRole(Roles::TAILOR);
    }

    public function isUser(): bool
    {
        return $this->hasRole(Roles::USER);
    }

    public function isCustomer(): bool
    {
        return $this->hasRole(Roles::CUSTOMER);
    }

    public function posts()
    {
        return $this->hasMany(TailorPost::class, 'user_id');
    }
}
