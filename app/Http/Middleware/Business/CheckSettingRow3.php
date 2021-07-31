<?php

namespace App\Http\Middleware\Business;

use Closure;
use Illuminate\Http\Request;

class CheckSettingRow3
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

        $customerNo3 = $request->input('customerNo3');
        $percentNo3 = $request->input('percentNo3');
        $monthNo3 = $request->input('monthNo3');

        if (!(preg_match($checkNumber, $customerNo3)) or (!(preg_match($checkNumber, $percentNo3))) or (!(preg_match($checkNumber, $monthNo3)))) {
            return response()->json([
                'message' => ' فرمت داده وارد شده در ردیف سوم صحیح نمی باشد یا مقادیر خالی وجود دارد',
                'Success' => 0,
                'message_type' => 'warning',
            ], 400);
        }
        else {

            return $next($request);
        }
    }
}
