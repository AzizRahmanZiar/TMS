<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Update author and email fields where they are 'System' or null
        DB::statement("
            UPDATE tailor_posts
            SET author = (
                SELECT users.name
                FROM users
                WHERE users.id = tailor_posts.user_id
            ),
            email = (
                SELECT users.email
                FROM users
                WHERE users.id = tailor_posts.user_id
            )
            WHERE (tailor_posts.author = 'System' OR tailor_posts.author IS NULL)
            AND tailor_posts.user_id IS NOT NULL
        ");

        // 2. Remove title column since it's not being used
        if (Schema::hasColumn('tailor_posts', 'title')) {
            Schema::table('tailor_posts', function (Blueprint $table) {
                $table->dropColumn('title');
            });
        }

        // 3. Update comments count based on actual ratings
        DB::statement("
            UPDATE tailor_posts
            SET comments = (
                SELECT COUNT(*)
                FROM post_ratings
                WHERE post_ratings.tailor_post_id = tailor_posts.id
            )
            WHERE comments = 0 OR comments IS NULL
        ");


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to 'System' if needed (optional)
        DB::statement("
            UPDATE tailor_posts
            SET author = 'System', email = NULL
            WHERE user_id IS NOT NULL
        ");
    }
};
