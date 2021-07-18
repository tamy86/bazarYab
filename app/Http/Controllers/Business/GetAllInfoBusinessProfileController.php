<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use http\Env\Response;
use Illuminate\Support\Facades\DB;

class GetAllInfoBusinessProfileController extends Controller
{
    public function __construct() {
        $this->middleware('auth:businessusers', ['except' => ['checkVerify', 'getVerify']]);
        Auth::shouldUse('businessusers');
    }

    public function getToken(){


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

            return response()->json([
                'name' => $userName,
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

    public function getBusinessInfo(){

        try {
            $userPhone = auth()->user()->phone;
            $userName = auth()->user()->name;
            $address = auth()->user()->address;

            return response()->json([
                'phone'=>$userPhone,
                'name' => $userName,
                'address' => $address,
            ]);
        }catch (\Exception $exception){
            if($exception) {
                return response()->json([
                    'message' => '1204 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید ',
                    'message type' => 'error',
                ], 500);
            }
        }
    }


    public function updateBusinessInfo(Request $request){

        $userMobile= auth()->user()->phone;
        $userBusinessId=auth()->user()->id;
        $businessMobile=$request->input('businessMobile');
        $businessName=$request->input('businessName');
        $businessAddress=$request->input('businessAddress');


        if ($userMobile==$businessMobile){

            try {
            $updateBusinessProfile=DB::update('CALL BusinessUpdateProfileInfo(?,?,?,?)',array($businessMobile,$businessName,$businessAddress,$userBusinessId));


                return response()->json([
                    'message' => 'اطلاعات پروفایل شما با موفقیت بروزرسانی شد',
                    'message_type' => 'Success',
                    'Success' => 1,
                ], 200);

            }catch (\Exception $exception){

                if($exception) {
                    return response()->json([
                        'message' => '1205 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید ',
                        'message type' => 'error',
                    ], 500);
                }

            }
        }else{
            return response()->json([
                'message' => 'خطای امنیتی لطفا مجدد لاگین و سعی نمایید',
                'message_type' => 'error',
            ],401);

        }
//
//        return response()->json([
//            'message' => 'درست میباشد',
//            'message_type' => 'success',
//            'Success' => 1,
//        ],200);



    }


    public function businessLogout(){
        $clearcache=Artisan::call('cache:clear');


     $BusinessLogout=auth()->logout();

    }



}
