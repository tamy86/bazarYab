<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use http\Env\Response;
use http\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class CustomerBusinessReportsController extends Controller
{
  public function customerReport(){


      try{
          $businessUserId=auth()->user()->id;




//              $value = Cache::remember('report',10, function () use ($businessUserId) {
//                  $businessUserId = auth()->user()->id;
//                  $makeDbView = DB::select('CALL BusinessViewGetInfoIds');
//
//                  $getBusinessCustomerReport = DB::select('CALL BusinessReportCountPresentedCustomers(?)', array($businessUserId));
//                  return $getBusinessCustomerReport;
//              });
//
//              if(Cache::has('report')) {
//                  return response()->json(Cache::get('report'));
//              }else{
//                return response()->json('خراب');
//              }

          if (Cache::has('report')){

//              $test=Cache::get('report');
              return response()->json(Cache::get('report'));
          }else{

              $makeDbView=DB::select('CALL BusinessViewGetInfoIds');

              $getBusinessCustomerReport = DB::select('CALL BusinessReportCountPresentedCustomers(?)', array($businessUserId));

              Cache::add('report',$getBusinessCustomerReport,now()->addMinutes(5));
              return response()->json(Cache::get('report'));
          }



//          if ($getBusinessCustomerReport != null) {
//
////              Cache::put('report',$getBusinessCustomerReport,10);
//
//
//                  return response()->json($getBusinessCustomerReport);
//
//          }else{
//                return response()->json(['message'=>'خراب']);
//          }

      }catch (\Exception $exception){

      }

  }
}
