<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Business\Businessnocustomer;
use App\Models\Business\Businessuser;
use http\Env\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Validator;
use Illuminate\Support\Facades\Auth;


class RegisterBusinessController extends Controller
{
    public function __construct() {
        /*middleware am mitoone comment she kar mikone*/
        $this->middleware('auth:businessusers', ['except' => ['checkVerify', 'getVerify']]);
        Auth::shouldUse('businessusers');
    }


    public function getVerify(Request $request){

        try {

            $phoneNo = $request->input('phone');
            $businessType = $request->input('bussinesscategoryId');
            $verifyCode = rand(10000, 99999);
            $ipBusiness = $request->ip();

            /**check phone exists and roleid is new or exits if new insert else update**/
            $phoneexist = Businessuser::where('phone', $phoneNo)->exists();

            if ($phoneexist === false) {
                //insert to DB
                $userBusinessRegister = new Businessuser();
                $userBusinessRegister->bussinesscategoryId = $businessType;
                $userBusinessRegister->verify = bcrypt($verifyCode);
                $userBusinessRegister->signin = 0;
                $userBusinessRegister->status = 0;
                $userBusinessRegister->ipaddress = $ipBusiness;
                $userBusinessRegister->created_at = new \DateTime();
                $userBusinessRegister->updated_at = new \DateTime();
                $userBusinessRegister->phone = $phoneNo;
                $userBusinessRegister->save();

                return response()->json([
                    'Success' => 1,
                    'message' => 'کد اعتبار سنجی به شماره همراه شما ارسال شد',
                    'verify' => $verifyCode,
                    'message type' => 'success'
                ], 201);

            } else
                if ($phoneexist === true) {
//            $updatedate = Businessuser::select('updated_at')->where('phone', $phoneNo)->first()->updated_at;
                    $businessData = Businessuser::select('bussinesscategoryId', 'updated_at')->where('phone', $phoneNo)->get();

                    foreach ($businessData as $data) {

                        $businesstypeUser = $data->bussinesscategoryId;
                        $updatedate = $data->updated_at;

                    }

                    $now = Carbon::now();

                    $differentMin = $updatedate->diffInMinutes($now);

                    if ($businesstypeUser != $businessType) {
                        return response()->json([
                            'Success' => 0,
                            'message' => 'شما کسب کار خود را به درستی انتخاب نکرده اید یا در صورت تغییر کسب و کار با شماره همراه جدید ثبت نام نمایید',
                            'message type' => 'warning',
                        ], 400);
                    } else

                        if ($differentMin > 3) {

                            Businessuser::where('phone', $phoneNo)->update(['verify' => bcrypt($verifyCode)]);

                            return response()->json([
                                'Success' => 1,
                                'message' => 'کد اعتبار سنجی مجددا به شماره همراه شما ارسال شد',
                                'verify' => $verifyCode,
                                'message type' => 'success',

                            ]);

                        } else {
                            return response()->json([
                                'Success' => 0,
                                'message' => 'به دلیل درخواست متعدد پس از 3 دقیقه مجدد تلاش نمایید',
                                'message type' => 'warning',
                            ], 429);
                        }
                }

        }catch (\Exception $exception){
            if($exception){
                return response()->json([
                    'message'=>'1501 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید',
                    'message type'=>'error',
                    'ss'=>$phoneexist,
                ],500);
            }
        }
    }


    public function checkVerify(Request $request)
    {

//        $validator = Validator::make($request->all(), [
//            'phone' => 'required|phone',
//            'verifyCode' => 'required',
//            'businessCategoryId'=>'required',
//        ]);

//
//        if ($validator->fails()) {
//            return response()->json($validator->errors(), 422);
//        }


//        $verifyCode=$request->input('verifyCode');
//        $phoneNo=$request->input('phone');
//        $businessCtegoryId=$request->input('businessCategoryId');



//$credentials = $request->only(['phone', 'verify','bussinesscategoryId']);

        try {

            if (!$token = auth()->attempt($request->all())) {
                return response()->json([
                    'message' => 'شماره همراه ، کد اعتبار سنجی و یا نوع کسب کار اشتباه وارد شده است',
                    'Success' => 0,
                    'message type' => 'error',

                ], 401);
            }

            return $this->createNewToken($token);
            Businessuser::where('phone', $request->input('phone'))->update(['token' => $token]);

        }catch (\Exception $exception)
        {
            if($exception){
                return response()->json([
                    'message'=>'1502 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید',
                    'message type'=>'error',
                ],500);
            }
        }



//
//
//
//        }else{
//            return response()->json([
//                'Success'=>0,
//                'message'=>'کد اعتبارسنجی وارد شده صحیح نمی باشد',
//                'Status Code'=>http_response_code(),
//            ]);
//        }




    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'message'=>'شما به درستی اعتبار سنجی شدید و لاگین کردید',
            'message type'=>'success',
            'Success'=>1,
        ]);
    }

}
