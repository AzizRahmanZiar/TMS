<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class Reset100UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Delete all existing users
        $this->command->info('Deleting all existing users...');

        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate users table
        User::truncate();

        // Reset auto-increment
        DB::statement('ALTER TABLE users AUTO_INCREMENT = 1');

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->info('Creating 100 new users...');

        // Create 1 Admin
        User::create([
            'name' => 'System Administrator',
            'email' => 'admin@tms.com',
            'password' => Hash::make('admin123'),
            'role' => Roles::ADMIN,
            'email_verified_at' => now(),
            'contact_number' => '+93701234567',
        ]);

        // Create 20 Tailors with complete profiles
        $tailorNames = [
            'احمد خیاط', 'محمد درزی', 'علی استاد', 'حسن خیاط', 'عثمان درزی',
            'یوسف استاد', 'ابراهیم خیاط', 'اسماعیل درزی', 'داود استاد', 'سلیمان خیاط',
            'موسی درزی', 'هارون استاد', 'یعقوب خیاط', 'اسحاق درزی', 'لوط استاد',
            'شعیب خیاط', 'صالح درزی', 'هود استاد', 'ادریس خیاط', 'الیاس درزی'
        ];

        $tailorShops = [
            'د احمد خیاطي دوکان', 'د محمد درزۍ پلورنځي', 'د علي استاد ورکشاپ', 'د حسن خیاطۍ مرکز', 'د عثمان درزۍ دوکان',
            'د یوسف استاد پلورنځي', 'د ابراهیم خیاطۍ مرکز', 'د اسماعیل درزۍ دوکان', 'د داود استاد ورکشاپ', 'د سلیمان خیاطۍ مرکز',
            'د موسی درزۍ دوکان', 'د هارون استاد پلورنځي', 'د یعقوب خیاطۍ مرکز', 'د اسحاق درزۍ دوکان', 'د لوط استاد ورکشاپ',
            'د شعیب خیاطۍ مرکز', 'د صالح درزۍ دوکان', 'د هود استاد پلورنځي', 'د ادریس خیاطۍ مرکز', 'د الیاس درزۍ دوکان'
        ];

        $addresses = [
            'کابل، شهر نو، د چهارراهي سره', 'هرات، د ښار مرکز', 'مزار شریف، د بلخ ولایت', 'قندهار، د ښار مرکز',
            'جلال آباد، د ننګرهار ولایت', 'کابل، کارته چهار', 'هرات، د انجیل ولسوالۍ', 'مزار شریف، د دهمزنګ سیمه',
            'قندهار، د ارغنداب ولسوالۍ', 'جلال آباد، د بهسود سیمه', 'کابل، د میکروریان سیمه', 'هرات، د گذره ولسوالۍ',
            'مزار شریف، د چمتال ولسوالۍ', 'قندهار، د دامان ولسوالۍ', 'جلال آباد، د سرخرود ولسوالۍ', 'کابل، د پل چرخي سیمه',
            'هرات، د کرخ ولسوالۍ', 'مزار شریف، د کلدار ولسوالۍ', 'قندهار، د شاه ولي کوټ ولسوالۍ', 'جلال آباد، د چپرهار ولسوالۍ'
        ];

        for ($i = 0; $i < 20; $i++) {
            User::create([
                'name' => $tailorNames[$i],
                'email' => 'tailor' . ($i + 1) . '@tms.com',
                'password' => Hash::make('tailor123'),
                'role' => Roles::TAILOR,
                'email_verified_at' => now(),
                'experience' => rand(2, 25),
                'career' => 'د ' . rand(2, 25) . ' کلونو تجربه لرونکی خیاط',
                'previous_work' => 'د مختلفو دوکانونو سره کار کړی',
                'certifications' => 'د خیاطۍ سند',
                'skills' => 'جامې، کورتۍ، یونیفورم، صدرۍ',
                'work_availability' => rand(0, 1) ? 'Full-time' : 'Part-time',
                'tailoring_name' => $tailorShops[$i],
                'tailoring_address' => $addresses[$i],
                'tailor_count' => rand(1, 5),
                'published_year' => rand(2010, 2023),
                'contact_number' => '+9370' . rand(1000000, 9999999),
                'shop_email' => 'shop' . ($i + 1) . '@tms.com',
                'working_hours' => 'د سهار ۸ بجو څخه د ماښام ۶ بجو پورې',
                'services' => json_encode(['جامې', 'کورتۍ', 'یونیفورم', 'صدرۍ']),
                'payment_methods' => json_encode(['نغدي پیسې', 'بانکي کارت', 'موبایل پیسې']),
                'weekly_order_limit' => rand(10, 50),
                'current_week_orders' => rand(0, 15),
                'week_start_date' => now()->startOfWeek(),
                'week_end_date' => now()->endOfWeek(),
                'cached_rating' => rand(350, 500) / 100,
                'raw_rating' => rand(350, 500) / 100,
                'total_ratings' => rand(5, 50),
                'rating_percentage' => rand(70, 100),
                'credibility_score' => rand(60, 100),
            ]);
        }

        // Create 10 Shopkeepers
        $shopkeeperNames = [
            'عبدالله دوکاندار', 'رحمان پلورونکی', 'کریم دوکاندار', 'نعیم پلورونکی', 'فرید دوکاندار',
            'جمیل پلورونکی', 'خلیل دوکاندار', 'بلال پلورونکی', 'طارق دوکاندار', 'عمار پلورونکی'
        ];

        $fabricShops = [
            'د عبدالله د ټوکرونو دوکان', 'د رحمان د ټوکرونو پلورنځي', 'د کریم د ټوکرونو دوکان', 'د نعیم د ټوکرونو پلورنځي', 'د فرید د ټوکرونو دوکان',
            'د جمیل د ټوکرونو پلورنځي', 'د خلیل د ټوکرونو دوکان', 'د بلال د ټوکرونو پلورنځي', 'د طارق د ټوکرونو دوکان', 'د عمار د ټوکرونو پلورنځي'
        ];

        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $shopkeeperNames[$i],
                'email' => 'shopkeeper' . ($i + 1) . '@tms.com',
                'password' => Hash::make('shop123'),
                'role' => Roles::SHOPKEEPER,
                'email_verified_at' => now(),
                'tailoring_name' => $fabricShops[$i],
                'tailoring_address' => $addresses[$i],
                'contact_number' => '+9370' . rand(1000000, 9999999),
                'shop_email' => 'fabric' . ($i + 1) . '@tms.com',
                'working_hours' => 'د سهار ۹ بجو څخه د ماښام ۷ بجو پورې',
                'payment_methods' => json_encode(['نغدي پیسې', 'بانکي کارت']),
            ]);
        }

        // Create 50 Customers
        $customerNames = [
            'احمد علي', 'محمد حسن', 'علي احمد', 'حسن محمد', 'عثمان علي', 'یوسف احمد', 'ابراهیم حسن', 'اسماعیل علي', 'داود احمد', 'سلیمان حسن',
            'موسی علي', 'هارون احمد', 'یعقوب حسن', 'اسحاق علي', 'لوط احمد', 'شعیب حسن', 'صالح علي', 'هود احمد', 'ادریس حسن', 'الیاس علي',
            'عبدالله احمد', 'رحمان حسن', 'کریم علي', 'نعیم احمد', 'فرید حسن', 'جمیل علي', 'خلیل احمد', 'بلال حسن', 'طارق علي', 'عمار احمد',
            'فاروق حسن', 'عمر علي', 'عثمان احمد', 'علي حسن', 'حسین علي', 'حسن احمد', 'محسن حسن', 'احسان علي', 'عرفان احمد', 'عدنان حسن',
            'وقاص علي', 'فیصل احمد', 'کمال حسن', 'جمال علي', 'سهیل احمد', 'نبیل حسن', 'عقیل علي', 'خلیل احمد', 'جلیل حسن', 'نذیر علي'
        ];

        for ($i = 0; $i < 50; $i++) {
            User::create([
                'name' => $customerNames[$i],
                'email' => 'customer' . ($i + 1) . '@tms.com',
                'password' => Hash::make('customer123'),
                'role' => Roles::CUSTOMER,
                'email_verified_at' => now(),
                'contact_number' => '+9370' . rand(1000000, 9999999),
            ]);
        }

        $this->command->info('Successfully created 81 users:');
        $this->command->info('- 1 Admin');
        $this->command->info('- 20 Tailors');
        $this->command->info('- 10 Shopkeepers');
        $this->command->info('- 50 Customers');
        $this->command->info('Total: 81 users');
    }
}
