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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('email', 200);
            $table->string('password', 255);

            $table->char('vip', 1);

            $table->string('height', 255);
            $table->string('weight', 255);

            //должны быть заполнены в каждом запросе на создание
            $table->string('birthday', 255);
            $table->string('birthyear', 255);
            $table->string('city', 255);
            $table->string('familystatus', 255);
            $table->string('firstname', 255);
            $table->string('gender', 255);
            $table->string('langlove', 1000);
            $table->string('langlove2', 255);
            $table->string('phone', 255)->unique();
            $table->string('zodiak', 255);
            // только эта часть


            $table->string('about', 1000);
            $table->string('birthdaychild1', 255);
            $table->string('birthdaychild2', 255);
            $table->string('birthdaychild3', 255);
            $table->string('birthdaychild4', 255);
            $table->string('children', 255);
            $table->string('comment', 1000);
            $table->string('comp', 1000);
            $table->string('dateofend', 255);
            $table->string('role', 255)->default('user');


            $table->string('fav', 255);
            $table->string('fav_date', 255);
            $table->string('fav_modify', 255);
            $table->string('fb', 255);
            $table->string('helptext', 255);
            $table->string('images', 255);
            $table->string('inst', 1000);
            $table->string('lastlove', 255);
            $table->string('lastzodiak', 255);
            $table->string('ok', 255);
            $table->string('registermonth', 255);
            $table->string('report', 255);
            $table->string('smoke', 255);
            $table->string('source', 255);
            $table->string('source_type', 255);
            $table->string('targetsearch', 255);
            $table->string('targetsearchtext', 255);
            $table->string('user_InNum', 255);
            $table->string('user_OutNum', 255);
            $table->string('vk', 255);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
