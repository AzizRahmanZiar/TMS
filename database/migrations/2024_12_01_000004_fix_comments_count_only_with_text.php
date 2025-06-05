<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update comments count to only include ratings that have actual comment text
        DB::statement("
            UPDATE tailor_posts 
            SET comments = (
                SELECT COUNT(*) 
                FROM post_ratings 
                WHERE post_ratings.tailor_post_id = tailor_posts.id 
                AND post_ratings.comment IS NOT NULL 
                AND post_ratings.comment != ''
            )
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to counting all ratings
        DB::statement("
            UPDATE tailor_posts 
            SET comments = (
                SELECT COUNT(*) 
                FROM post_ratings 
                WHERE post_ratings.tailor_post_id = tailor_posts.id
            )
        ");
    }
};
