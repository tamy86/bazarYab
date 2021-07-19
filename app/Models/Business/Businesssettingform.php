<?php

namespace App\Models\Business;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Businesssettingform extends Model
{
    use HasFactory;

    public function businessuser(){

        return $this->belongsTo(Businessuser::class);
    }
}
