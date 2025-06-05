<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Amazon-style cached rating fields
            $table->decimal('cached_rating', 3, 2)->default(0.00)->comment('Bayesian average rating');
            $table->decimal('raw_rating', 3, 2)->default(0.00)->comment('Simple average rating');
            $table->integer('total_ratings')->default(0)->comment('Total number of ratings received');
            $table->decimal('rating_percentage', 5, 2)->default(0.00)->comment('Rating as percentage (0-100)');
            $table->integer('credibility_score')->default(0)->comment('Credibility score 0-100');
            $table->decimal('rating_weight_sum', 10, 3)->default(0.000)->comment('Sum of all rating weights');
            $table->decimal('weighted_rating_sum', 10, 3)->default(0.000)->comment('Sum of weighted ratings');
            $table->timestamp('rating_last_updated')->nullable()->comment('Last rating calculation timestamp');
            
            // Performance indexes
            $table->index('cached_rating');
            $table->index(['cached_rating', 'total_ratings']);
            $table->index('credibility_score');
            $table->index('rating_percentage');
        });

        // Create global rating statistics table
        Schema::create('rating_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->decimal('value', 10, 4);
            $table->text('description')->nullable();
            $table->timestamp('updated_at');
            
            $table->index('key');
        });

        // Insert Amazon-style global statistics
        DB::table('rating_statistics')->insert([
            [
                'key' => 'global_mean_rating',
                'value' => 3.5000,
                'description' => 'Global average rating across all tailors',
                'updated_at' => now()
            ],
            [
                'key' => 'minimum_ratings_threshold',
                'value' => 5.0000,
                'description' => 'Minimum ratings needed for full credibility',
                'updated_at' => now()
            ],
            [
                'key' => 'credibility_threshold',
                'value' => 10.0000,
                'description' => 'Ratings needed for 100% credibility score',
                'updated_at' => now()
            ],
            [
                'key' => 'time_decay_factor',
                'value' => 0.1000,
                'description' => 'Time decay factor for rating weights',
                'updated_at' => now()
            ],
            [
                'key' => 'max_order_value_weight',
                'value' => 2.0000,
                'description' => 'Maximum weight multiplier for high-value orders',
                'updated_at' => now()
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rating_statistics');
        
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'cached_rating',
                'raw_rating',
                'total_ratings',
                'rating_percentage',
                'credibility_score',
                'rating_weight_sum',
                'weighted_rating_sum',
                'rating_last_updated'
            ]);
        });
    }
};
