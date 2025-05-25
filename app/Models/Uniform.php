<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Uniform extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom',                 // نوم
        'mobile',              // مبایل نمبر
        'money',               // پیسې

        'yakhun_qak',          // یخن قاک
        'patlun',              // پتلون
        'ghara',               // غاړه
        'zegar',               // ځګر
        'lstoony',             // لسټوڼي
        'tidad',               // تعداد

        'rawrul_tareekh',      // د راوړلو تاریخ
        'tasleem_tareekh',     // د تسلیمولو تاریخ
    ];

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scope to get uniforms for a specific user
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
