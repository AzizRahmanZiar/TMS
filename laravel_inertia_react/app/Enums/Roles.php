<?php

namespace App\Enums;

enum Roles: string
{
    case ADMIN = 'admin';
    case TAILOR = 'tailor';
    case USER = 'user';

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'مدیر',
            self::TAILOR => 'خیاط',
            self::USER => 'کاربر',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function labels(): array
    {
        return array_combine(
            array_column(self::cases(), 'value'),
            array_map(fn($case) => $case->label(), self::cases())
        );
    }
}
