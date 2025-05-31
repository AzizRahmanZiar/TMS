<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'phone',
        'address',
        'tailor_id',
        'user_id',
        'is_visible',
        'created_at'
    ];

    protected $casts = [
        'created_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tailor()
    {
        return $this->belongsTo(User::class, 'tailor_id');
    }
}
