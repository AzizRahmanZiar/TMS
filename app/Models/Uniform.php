<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Uniform extends Model
{
    use HasFactory;

    protected $fillable = [
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
}
