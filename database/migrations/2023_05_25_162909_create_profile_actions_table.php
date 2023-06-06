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
        Schema::create('profile_actions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

             // Indicates whether the user should be last handled or not
            $table->foreignId('profile_id')->constrained()->cascadeOnDelete();
            $table->tinyInteger('defer')->default(0);

            $table->string('status', 255)->default(env('STATUS_FOR_NEW_USERS'));

            $table->string('color', 255)->nullable();
            $table->string('next_contact_date', 255)->nullable();
            $table->string('visible_pass', 255)->nullable();
            $table->string('dragableColor', 255)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_actions');
    }
};
