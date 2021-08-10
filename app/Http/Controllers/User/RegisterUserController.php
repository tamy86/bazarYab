<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User\Customeruser;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use League\Flysystem\Config;
use Illuminate\Support\Facades\DB;

class RegisterUserController extends Controller
{
    public function __construct() {
        /*middleware am mitoone comment she kar mikone*/
        $this->middleware('auth:customerusers', ['except' => ['checkVerify', 'getVerify']]);
        Auth::shouldUse('customerusers');
        /*tanzim config auth.php guard inja  mishe set esh kard har 2 rah mishe ham config ham shoulduse*/
//        config(['auth.defaults.guard' => 'customerusers']);
    }



    public function getVerify(Request $request){

        try {

            $phoneNo = $request->input('phone');


                $verifyCode = rand(10000, 99999);
                $ipBusiness = $request->ip();

                /**check phone exists and roleid is new or exits if new insert else update**/
                $phoneexist = Customeruser::where('phone', $phoneNo)->exists();

                if ($phoneexist === false) {

                    $checkUserPhoneExists=DB::select('CALL UsersCheckUserPhoneExistsInBusinessCustomers(?)',array($phoneNo));
                    $countUserPhoneExists=$checkUserPhoneExists[0]->countphone;
                    $userName=$checkUserPhoneExists[0]->name;
                    $userFamily=$checkUserPhoneExists[0]->family;

                     if($countUserPhoneExists>0) {
                         //insert to DB
                     $userBusinessRegister = new Customeruser();
                     $userBusinessRegister->verify = bcrypt($verifyCode);
                     $userBusinessRegister->name=$userName;
                     $userBusinessRegister->family=$userFamily;
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
                        'exist' => $countUserPhoneExists,
                        'message type' => 'success'
                    ], 201);
                    }else{
                        return response()->json([
                            'Success' => 0,
                            'message' => 'شما تاکنون جزو مشتریان هیچ کسب و کاری نیستید و امکان لاگین ندارید',
                            'message type' => 'warning',
                        ], 429);
                    }
                } else
                    if ($phoneexist === true) {
//            $updatedate = Businessuser::select('updated_at')->where('phone', $phoneNo)->first()->updated_at;
                        $businessData = Customeruser::select('updated_at')->where('phone', $phoneNo)->get();

                        foreach ($businessData as $data) {


                            $updatedate = $data->updated_at;

                        }

                        $now = Carbon::now();

                        $differentMin = $updatedate->diffInMinutes($now);

                        if ($differentMin > 3) {

                            Customeruser::where('phone', $phoneNo)->update(['verify' => bcrypt($verifyCode)]);

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

        }catch (\Exception $exception)
        {
            if($exception){
                return response()->json([
                    'message' => '5201 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید ',
                    'message type' => 'error',
                ], 500);
            }
        }

    }


    public function checkVerify(Request $request)
    {

        try {
            if (!$token = auth()->attempt($request->all())) {
                return response()->json([
                    'message' => 'شماره همراه یا کد اعتبار سنجی اشتباه وارد شده است',
                    'Success' => 0,
                    'message type' => 'error',

                ], 401);
            }
            return $this->createNewToken($token);
            Customeruser::where('phone', $request->input('phone'))->update(['token' => $token]);



        }catch (\Exception $exception){

            if($exception){
                return response()->json([
                    'message' => '5202 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید ',
                    'message type' => 'error',
                    'ex'=>$exception,
                ], 500);
            }
        }


    }


    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'message'=>'شما به درستی اعتبار سنجی شدید و لاگین کردید بخش کاربر عادی',
            'message type'=>'success',
            'Success'=>1,
        ]);
    }


}
