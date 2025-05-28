<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sadrai extends Model
{
    use HasFactory;

    // Explicitly set the table name
    protected $table = 'sadrais';

    // Make sure all required fields are fillable
    protected $fillable = [
        'user_id',
        'nom',
        'mobile',
        'money',
        'shana',
        'tenna',
        'ghara_dol',
        'zegar',
        'tidad',
        'rawrul_tareekh',
        'tasleem_tareekh',
    ];

    // Define proper type casting
    protected $casts = [
        'rawrul_tareekh' => 'date',
        'tasleem_tareekh' => 'date',
        'tidad' => 'integer',
        'money' => 'decimal:2',
    ];

    // Define relationship with User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}



