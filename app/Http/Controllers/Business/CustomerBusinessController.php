<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Models\Business\Businessnewcustomer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use function PHPUnit\Framework\isEmpty;

class CustomerBusinessController extends Controller
{

    public function __construct() {
        $this->middleware('auth:businessusers', ['except' => ['checkVerify', 'getVerify']]);
        Auth::shouldUse('businessusers');
    }


    public function searchPresented(Request $request){

        /*get business user id by authorize set in header and put in request to insert in DB*/

        try {

            $businessUserId = auth()->user()->id;
        }
        catch (\Exception $exception){
            if($exception) {
                return response()->json([
                    'message' => '1101 خطای عدم دسترسی یا مشکل ارتباط با سرور',
                    'message_type' => 'error',

                ],401);
            }
        }



        try{

        $presentedPhone=$request->input('phone');




    $presentedExist = Businessnewcustomer::where('phone', $presentedPhone)->where('businessUserId', $businessUserId)->exists();





    if ($presentedExist) {

        $presentedId = Businessnewcustomer::Select('id','name','family')
            ->where('phone', $presentedPhone)
            ->where('businessUserId', $businessUserId)
            ->get();

            foreach ($presentedId as $dataPresentedId)
             {
                    $presentedID=$dataPresentedId->id;
                    $presentedName=$dataPresentedId->name;
                    $presetedFamily=$dataPresentedId->family;
                  }

            return response()->json([
                'presented_id' => $presentedID,
                'presented_name' =>$presentedName,
                'presented_family'=>$presetedFamily,
                'message' => 'شماره همراه وارد شده جزو مشتریان این کسب و کار میباشد',
                'message_type' => 'success',
                'Success' => 1,
            ], 200);


    } else
        if (($presentedExist == false) && ($businessUserId != null)) {
            return response()->json([
                'presented_id' => null,
                'message' => 'شماره همراه وارد شده جزو مشتریان این کسب و کار نمیباشد',
                'message_type' => 'warning',
                'Success' => 2,
            ], 200);
        } else {
            return response()->json([
                'message' => 'مشکل در ارسال اطلاعات لطفا مجدد تلاش نمایید',
                'message_type' => 'error',
                'Success' => 2,
            ], 400);
        }

}catch (\Exception $exception)
    {
        if($exception) {
            return response()->json([
                'message' => '1101 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید',
                'message_type' => 'error',


            ],500);
        }

    }


    }


    public function newCustomer(Request $request){

        /*get business user id by authorize set in header and put in request to insert in DB*/

        try {

            $businessUserId = auth()->user()->id;
        }
        catch (\Exception $exception){
            if($exception) {
                return response()->json([
                    'message' => '1102 خطای عدم دسترسی یا مشکل ارتباط با سرور',
                    'message_type' => 'error',

                ],401);
            }
        }



        /*to insert new customer in DB and add business user id to other request*/
        try {

        $customerPhone=$request->input('customerphone');
        $customerName=$request->input('customername');
        $customerFamily=$request->input('customerfamily');
        $customerShopingPrice=0;
        $presentedId=$request->input('presentedid');
        $presentedPhone=$request->input('presentedphone');



            $customerExist = Businessnewcustomer::where('phone', $customerPhone)
                ->where('businessUserId', $businessUserId)
                ->exists();



                $presentedExist = Businessnewcustomer::where('id',$presentedId)->where('businessUserId', $businessUserId)
                ->where('phone', $presentedPhone)
                    ->exists();

            if ((($presentedExist) || ($presentedId == null)) && (!$customerExist)) {
                //insert to DB
                $userBusinessRegister = new Businessnewcustomer();
                $userBusinessRegister->businessUserId = $businessUserId;
                $userBusinessRegister->presentedId = $presentedId;
                $userBusinessRegister->phone = $customerPhone;
                $userBusinessRegister->name = $customerName;
                $userBusinessRegister->family = $customerFamily;
                $userBusinessRegister->shopingPrice = $customerShopingPrice;
                $userBusinessRegister->created_at = new \DateTime();
                $userBusinessRegister->updated_at = new \DateTime();
                $userBusinessRegister->save();

                return response()->json([
                    'Success' => 1,
                    'message' => 'مشتری جدید برای این کسب و کار با موفقیت ثبت شد',
                    'message_type' => 'success',
                ], 200);
            } else

                if ($customerExist) {
                    return response()->json([
                        'Success' => 0,
                        'message' => 'مشتری ثبت شده قبلا در لیست مشتریان این کسب و کار قرار گرفته است',
                        'message_type' => 'warning',
                        'jhg'=>$customerExist,
                        'iu'=>$presentedExist,

                    ], 409);


                }


        }
        catch (\Exception $exception) {

                if($exception) {
                    return response()->json([
                        'message' => '1103 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید',
                        'message_type' => 'error',

                    ]);
                }

    }



    }



    public function searchCustomer(Request $request)
    {

        $customerPhone = $request->input('phone');


        try {

            $businesUserId = auth()->user()->id;
        } catch (\Exception $exception) {
            if ($exception) {
                return response()->json([
                    'message' => '1104 خطای عدم دسترسی یا مشکل ارتباط با سرور',
                    'message_type' => 'error',

                ], 401);
            }
        }

//       $businesUserId=auth()->user()->id;

        try {

            $getCustomerInfo = DB::select('CALL BusinessGetInfoOfCustomerSearch(?,?)', array($customerPhone, $businesUserId));

            if ($getCustomerInfo != null) {
                $customerId = $getCustomerInfo[0]->id;
                $customerName = $getCustomerInfo[0]->name;
                $customerFamliy = $getCustomerInfo[0]->family;
                $customerPresentedBy = $getCustomerInfo[0]->presentedId;

            } else {

                $customerName = 'یافت نشد';
                $customerFamliy = 'یافت نشد';
                $customerId = null;
                $customerPresentedBy = null;
            }


            if ($customerId != null) {
                $getSearchCustomerInfo = DB::select('CALL BusinessGetCountPresentedCustomerSearch(?,?)', array($customerId,$businesUserId));
                $sumCustomerPresented = $getSearchCustomerInfo[0]->sum_customer_presented;
            } else {
                $sumCustomerPresented = 0;
            }


            if ($customerPresentedBy != null) {
                $whoPresentedCustomerInfo = DB::select('CALL BusinessGetInfoWhoPresentedCustomerSearch(?,?)', array($customerPresentedBy,$businesUserId));
                $whoPresentedCustomerName = $whoPresentedCustomerInfo[0]->name;
                $whoPresentedCustomerFamily = $whoPresentedCustomerInfo[0]->family;
                $whoPresentedCustomerPhone = $whoPresentedCustomerInfo[0]->phone;
            } else {
                $whoPresentedCustomerName = 'معرف نداشته است';
                $whoPresentedCustomerFamily = 'معرف نداشته است';
                $whoPresentedCustomerPhone = 'معرف نداشته است';

            }
            $infoWhoPresentedByCustomerSearch = DB::select('CALL BusinessInfoWhoPresentedByCustomerSearch(?,?)', array($customerId, $businesUserId));


            return response()->json([

                'customerSearchName' => $customerName,
                'customerSearchFamily' => $customerFamliy,
                'sumCusotmerPresented' => $sumCustomerPresented,
                'whoPresentedCustomerSearchName' => $whoPresentedCustomerName,
                'whoPresentedCustomerSearchFamily' => $whoPresentedCustomerFamily,
                'whoPresentedCustomerSearchPhone' => $whoPresentedCustomerPhone,
                'whoPresentedByCustomerSearch' => $infoWhoPresentedByCustomerSearch,

            ]);

        }
        catch (\Exception $exception) {

            if($exception) {
                return response()->json([
                    'message' => '1105 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید',
                    'message_type' => 'error',

                ]);
            }

        }
    }
}
