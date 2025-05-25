<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cloth extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom',
        'mobile',
        'qadd',
        'shana',
        'ghara',
        'zegar',
        'lstoony',
        'partog',
        'pai_tsa',
        'lastoni',
        'lastoni_goti',
        'bin',
        'bin_kat',
        'makh_jib',
        'tarikhzi',
        'kalari',
        'shabazi',
        'arabi',
        'lemen',
        'lastoni_2',
        'rawrul_tareekh',
        'tasleem_tareekh',
        'tidad',
        'money',
    ];

    protected $casts = [
        'lastoni' => 'boolean',
        'lastoni_goti' => 'boolean',
        'bin' => 'boolean',
        'bin_kat' => 'boolean',
        'makh_jib' => 'boolean',
        'tarikhzi' => 'boolean',
        'kalari' => 'boolean',
        'shabazi' => 'boolean',
        'arabi' => 'boolean',
        'lemen' => 'boolean',
        'lastoni_2' => 'boolean',
        'rawrul_tareekh' => 'date',
        'tasleem_tareekh' => 'date',
        'tidad' => 'integer',
        'money' => 'decimal:2',
    ];

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scope to get cloths for a specific user
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
} 