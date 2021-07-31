<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertBusinessSettingDiscountForm extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('businesssettingforms', function (Blueprint $table) {
            $table->id();
            $table->integer('businessUserId')->unsigned()->index();
            $table->foreign('businessUserId')->references('id')->on('businessusers');
            $table->integer('month')->index();
            $table->integer('percent')->index();
            $table->integer('noCustomer')->index();
            $table->smallInteger('noRow')->index();
            $table->boolean('editStatus')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('businesssettingform');
    }
}
