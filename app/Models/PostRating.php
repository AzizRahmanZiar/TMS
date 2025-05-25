<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tailor_post_id',
        'rating',
        'comment'
    ];

    protected $casts = [
        'rating' => 'integer'
    ];

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship with TailorPost
    public function tailorPost()
    {
        return $this->belongsTo(TailorPost::class);
    }

    // Validation rules
    public static function rules()
    {
        return [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'tailor_post_id' => 'required|exists:tailor_posts,id'
        ];
    }
} 