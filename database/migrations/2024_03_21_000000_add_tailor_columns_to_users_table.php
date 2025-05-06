<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add role column if it doesn't exist
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->after('password');
            }

            // Add profile image column if it doesn't exist
            if (!Schema::hasColumn('users', 'profile_image')) {
                $table->string('profile_image')->nullable()->after('role');
            }

            // Tailor specific fields
            $table->integer('experience')->nullable();
            $table->string('career')->nullable();
            $table->text('previous_work')->nullable();
            $table->text('certifications')->nullable();
            $table->text('skills')->nullable();
            $table->enum('work_availability', ['Full-time', 'Part-time'])->nullable();

            // Shop information
            $table->string('tailoring_name')->nullable();
            $table->text('tailoring_address')->nullable();
            $table->integer('tailor_count')->nullable();
            $table->integer('published_year')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('shop_email')->nullable();
            $table->string('working_hours')->nullable();
            $table->text('services')->nullable();
            $table->json('payment_methods')->nullable();
            $table->json('shop_images')->nullable();
            $table->json('social_links')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove all added columns
            $columns = [
                'role',
                'profile_image',
                'experience',
                'career',
                'previous_work',
                'certifications',
                'skills',
                'work_availability',
                'tailoring_name',
                'tailoring_address',
                'tailor_count',
                'published_year',
                'contact_number',
                'shop_email',
                'working_hours',
                'services',
                'payment_methods',
                'shop_images',
                'social_links'
            ];

            foreach ($columns as $column) {
                if (Schema::hasColumn('users', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
