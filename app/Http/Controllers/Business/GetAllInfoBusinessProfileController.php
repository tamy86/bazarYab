<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;

class GetAllInfoBusinessProfileController extends Controller
{
    public function __construct() {
        $this->middleware('auth:businessusers', ['except' => ['checkVerify', 'getVerify']]);
        Auth::shouldUse('businessusers');
    }

    public function getToken(){

//        $tokenValue=$request->input('token');
//
//         $userPhoneNo=Businessuser::select('phone','token')->where('token', $tokenValue)->get();
//
//         foreach ($userPhoneNo as $datauser)
//         {
//
//             $businessUserPhoneNo=$datauser->phone;
//             $businessToken=$datauser->token;
//
//         }


        try{
        $userToken=auth()->user()->token;

        return response()->json([
            'token'=>$userToken

        ]);

        }catch (\Exception $exception) {
            if ($exception) {
                return response()->json([
                    'message' => ' 1201 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید',
                    'message type' => 'error',
                ], 500);
            }
        }
    }

    public function getPhone(){

        try {

            $userPhone = auth()->user()->phone;
            return response()->json([
                'phone'=>$userPhone,

            ]);

        }catch (\Exception $exception)
        {
            if($exception) {
                return response()->json([
                    'message' => ' 1202 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید ',
                    'message type' => 'error',
                ], 500);
            }
        }


    }

    public function getNameFamily(){

        try {

            $userName = auth()->user()->name;
            $userFamily = auth()->user()->family;

            return response()->json([
                'name' => $userName,
                'family' => $userFamily,
            ]);
        }catch (\Exception $exception){
            if($exception) {
                return response()->json([
                    'message' => '1203 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید ',
                    'message type' => 'error',
                ], 500);
            }
        }
    }

    public function businessLogout(){
        $clearcache=Artisan::call('cache:clear');


     $BusinessLogout=auth()->logout();

    }



}
