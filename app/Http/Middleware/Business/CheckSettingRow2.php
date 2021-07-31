<?php

namespace App\Http\Middleware\Business;

use Closure;
use Illuminate\Http\Request;

class CheckSettingRow2
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        $checkNumber = "/\b[0-9]{1,3}\b/";

        $customerNo2 = $request->input('customerNo2');
        $percentNo2 = $request->input('percentNo2');
        $monthNo2 = $request->input('monthNo2');

        if (!(preg_match($checkNumber, $customerNo2)) or (!(preg_match($checkNumber, $percentNo2))) or (!(preg_match($checkNumber, $monthNo2)))) {
            return response()->json([
                'message' => ' فرمت داده وارد شده در ردیف دوم صحیح نمی باشد یا مقادیر خالی وجود دارد',
                'Success' => 0,
                'message_type' => 'warning',
            ], 400);
        }
        else {

            return $next($request);
        }
    }
}
