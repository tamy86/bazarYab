<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use App\Models\Business\Businessnocustomer;
use App\Models\Business\Businessnomonth;
use App\Models\Business\Businesspercent;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GetAllInfoBusinessSettingsController extends Controller
{
    public function __construct() {
        /*middleware am mitoone comment she kar mikone*/
        $this->middleware('auth:businessusers', ['except' => ['checkVerify', 'getVerify']]);
        Auth::shouldUse('businessusers');
    }




    public function listNoCustomer()
    {
        try {

            $businessNoCustomer = Businessnocustomer::all('no_customer', 'id');

            return response()->json($businessNoCustomer);

        }catch (\Exception $exception) {
            if ($exception) {
                return response()->json([
                    'message' => '1301 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید',
                    'message_type' => 'error',
                ], 500);
            }
        }
    }


    public function listMonths()
    {
        try {

            $businessMonths = Businessnomonth::all('month', 'id');

            return response()->json($businessMonths);

        }
        catch (\Exception $exception){
            if($exception){
                return response()->json([
                    'message' => '1302 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید',
                    'message_type' => 'error',
                ], 500);

            }
        }

    }

    public function listPercents()
    {
        try {


            $businessPercents = Businesspercent::all('percent', 'id');

            return response()->json($businessPercents);

        }
        catch (\Exception $exception) {
            if ($exception) {

                return response()->json([
                    'message' => '1303 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید',
                    'message_type' => 'error',
                ], 500);

            }
        }
    }

    public function saveSettingRow1(Request $request){

        try {
            $businessUserId = auth()->user()->id;
            $customerNo1 = $request->input('customerNo1');
            $percentNo1 = $request->input('percentNo1');
            $monthNo1 = $request->input('monthNo1');
            $rowNo=1;


     $countRowSettingFormUser=DB::select('CALL BusinessCountNoRowInSettingForm(?,?)',array($businessUserId,$rowNo));
     $sumRowSettingFormUser=$countRowSettingFormUser[0]->sum_no_row_eachuser;



            if($sumRowSettingFormUser>0){
             $updateRowSettingForm=DB::update('CALL BusinessUpdateSettingForm(?,?,?,?,?)',array($businessUserId,$customerNo1,$percentNo1,$monthNo1,$rowNo));

                    return response()->json([
                    'message' => ' ردیف اول برای شما با موفقیت بروزرسانی شد',
                    'message_type' => 'Success',
                ], 200);
            }else{
                 $countSubmitedRowInSettingForm=DB::select('CALL BusinessCountSubmitedRowInSettingForm(?,?)',array($businessUserId,$rowNo));
                 $sumSubmitedRowInSettingForm=$countSubmitedRowInSettingForm[0]->sum_no_row_submited_eachuser;

        if($sumSubmitedRowInSettingForm>0){

                return response()->json([
                    'message' => 'شما قبلا ردیف اول مربوط به تنظیمات فرم را تکمیل کرده اید و آنرا ثبت نهایی کرده اید',
                    'message_type' => 'warning',
                ], 422);
         }else{

    $insertSettingForm=DB::insert('CALL BusinessInsertSettingForm(?,?,?,?,?)',array($businessUserId,$monthNo1,$percentNo1,$customerNo1,$rowNo));

    return response()->json([
        'message' => ' ردیف اول برای شما با موفقیت ثبت شد',
        'message_type' => 'Success',
    ], 200);
}
               }


        }catch (\Exception $exception){

        }

    }

    public function saveSettingRow2(Request $request){

        try {
            $businessUserId = auth()->user()->id;
            $customerNo2 = $request->input('customerNo2');
            $percentNo2 = $request->input('percentNo2');
            $monthNo2 = $request->input('monthNo2');
            $rowNo=2;

            $countRowSettingFormUser=DB::select('CALL BusinessCountNoRowInSettingForm(?,?)',array($businessUserId,$rowNo));
            $sumRowSettingFormUser=$countRowSettingFormUser[0]->sum_no_row_eachuser;



            if($sumRowSettingFormUser>0){
                $updateRowSettingForm=DB::update('CALL BusinessUpdateSettingForm(?,?,?,?,?)',array($businessUserId,$customerNo2,$percentNo2,$monthNo2,$rowNo));

                return response()->json([
                    'message' => ' ردیف دوم برای شما با موفقیت بروزرسانی شد',
                    'message_type' => 'Success',
                ], 200);
            }else{
                $countSubmitedRowInSettingForm=DB::select('CALL BusinessCountSubmitedRowInSettingForm(?,?)',array($businessUserId,$rowNo));
                $sumSubmitedRowInSettingForm=$countSubmitedRowInSettingForm[0]->sum_no_row_submited_eachuser;

                if($sumSubmitedRowInSettingForm>0){

                    return response()->json([
                        'message' => 'شما قبلا ردیف دوم مربوط به تنظیمات فرم را تکمیل کرده اید و آنرا ثبت نهایی کرده اید',
                        'message_type' => 'warning',
                    ], 422);
                }else{

                     $insertSettingForm=DB::insert('CALL BusinessInsertSettingForm(?,?,?,?,?)',array($businessUserId,$monthNo2,$percentNo2,$customerNo2,$rowNo));

                    return response()->json([
                        'message' => ' ردیف دوم برای شما با موفقیت ثبت شد',
                        'message_type' => 'Success',
                    ], 200);
                }


            }



        }catch (\Exception $exception){

        }

    }

    public function saveSettingRow3(Request $request){

        try {
            $businessUserId = auth()->user()->id;
            $customerNo3 = $request->input('customerNo3');
            $percentNo3 = $request->input('percentNo3');
            $monthNo3 = $request->input('monthNo3');
            $rowNo=3;


            $countRowSettingFormUser=DB::select('CALL BusinessCountNoRowInSettingForm(?,?)',array($businessUserId,$rowNo));
            $sumRowSettingFormUser=$countRowSettingFormUser[0]->sum_no_row_eachuser;


            if($sumRowSettingFormUser>0){
                $updateRowSettingForm=DB::update('CALL BusinessUpdateSettingForm(?,?,?,?,?)',array($businessUserId,$customerNo3,$percentNo3,$monthNo3,$rowNo));

                return response()->json([
                    'message' => ' ردیف سوم برای شما با موفقیت بروزرسانی شد',
                    'message_type' => 'Success',
                ], 200);
            }else{
                $countSubmitedRowInSettingForm=DB::select('CALL BusinessCountSubmitedRowInSettingForm(?,?)',array($businessUserId,$rowNo));
                $sumSubmitedRowInSettingForm=$countSubmitedRowInSettingForm[0]->sum_no_row_submited_eachuser;

                if($sumSubmitedRowInSettingForm>0){

                    return response()->json([
                        'message' => 'شما قبلا ردیف سوم مربوط به تنظیمات فرم را تکمیل کرده اید و آنرا ثبت نهایی کرده اید',
                        'message_type' => 'warning',
                    ], 422);
                }else{

                    $insertSettingForm=DB::insert('CALL BusinessInsertSettingForm(?,?,?,?,?)',array($businessUserId,$monthNo3,$percentNo3,$customerNo3,$rowNo));

                    return response()->json([
                        'message' => ' ردیف سوم برای شما با موفقیت ثبت شد',
                        'message_type' => 'Success',
                    ], 200);
                }


            }



        }catch (\Exception $exception){

        }

    }


    public function submitFinalForm(){

        try {
            $businessUserId = auth()->user()->id;
            $editStatus=1;


// $insertSettingForm=DB::insert('CALL BusinessInsertSettingForm(?,?,?,?)',array($businessUserId,$monthNo1,$percentNo1,$customerNo1));
// $countRowSettingFormUser=DB::select('CALL BusinessCountNoRowInSettingForm(?)',array($businessUserId));
// $sumRowSettingFormUser=$countRowSettingFormUser[0]->sum_no_row_eachuser;

//if ($sumRowSettingFormUser==0)
//{
     $updateEditStatusSettingForm=DB::update('CALL BusinessUpdateEditstatusSettingForm(?)',array($businessUserId));

    return response()->json([
        'message' => ' تمامی ردیف های ثبت شده شما با موفقیت در سیستم ذخیره شد',
        'message_type' => 'Success',
    ],200);

//}else{
//    return response()->json([
//        'message' => '   شما هیچ ردیفی در فرم تنظیمات تخفیف ها ثبت نکرده اید یا قبلا فرم تنظیمات خود را ثبت نهایی کرده اید',
//        'message_type' => 'warning',
//    ], 422);
//}


        }catch (\Exception $exception){
            if($exception) {
                return response()->json([
                    'message' => '1304 خطا در ارتباط با سرور یا داده وروودی لطفا با پشتیبانی تماس بگیرید ',
                    'message_type' => 'error',
                ], 500);
            }
        }

    }


}
