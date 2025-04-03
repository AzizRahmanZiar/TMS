<?php

namespace App\Enums;

enum Roles: string
{
    case ADMIN = 'admin';
    case TAILOR = 'tailor';
    case CUSTOMER = 'customer';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
