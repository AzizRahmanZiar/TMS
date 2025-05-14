<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sadrai extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',                // نوم
        'mobile',             // مبایل نمبر
        'money',              // پیسې

        'shana',              // شانه
        'tenna',              // تنه
        'ghara_dol',          // د غاړي ډول
        'zegar',              // ځګر
        'tidad',              // تعداد

        'rawrul_tareekh',     // د راوړلو تاریخ
        'tasleem_tareekh',    // د تسلیمولو تاریخ
    ];
}
