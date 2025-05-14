<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cloth extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'mobile',
        'money',

        // Measurements
        'qadd',
        'shana',
        'ghara',
        'zegar',
        'lstoony',
        'partog',
        'pai_tsa',

        'tidad',
        'rawrul_tareekh',
        'tasleem_tareekh',

        // Basic checkboxes
        'kamees',
        'shalwar',
        'sadri',
        'jeb',

        // د کمیس خصوصیات group
        'lastoni',
        'lastoni_goti',
        'bin',
        'bin_kat',
        'makh_jib',

        // د ډیزاین خصوصیات group
        'tarikhzi',
        'kalari',
        'shabazi',
        'arabi',
        'lemen',
        'lastoni_2',
    ];
}
