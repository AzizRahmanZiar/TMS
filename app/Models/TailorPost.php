<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TailorPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'image',
        'category'
    ];

    protected $casts = [
        'date' => 'date',
        'comments' => 'integer',
        'views' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ratings()
    {
        return $this->hasMany(PostRating::class);
    }

    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('rating') ?? 0;
    }

    public function getTotalRatingsAttribute()
    {
        return $this->ratings()->count();
    }

    public function hasUserRated($userId)
    {
        return $this->ratings()->where('user_id', $userId)->exists();
    }
} 