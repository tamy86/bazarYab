<?php

namespace App\Models\Business;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Businessuser extends  Authenticatable implements JWTSubject
{
    use HasFactory,Notifiable;

    protected $fillable = [
        'bussinesscategoryId',
        'phone',
        'verify',
    ];

    protected $hidden = [
        'verify',
        'remember_token',
    ];

//    protected $casts = [
//        'phone' => 'datetime',
//    ];


    public function businesscategories()
    {
        return $this->hasMany(Businesscategory::class);
    }


    public function Businessnewcustomers(){
            return $this->belongsToMany(Businessnewcustomer::class);
    }

    public function businesssettingforms(){
        return $this->hasMany(Businesssettingform::class);

        }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }





}
