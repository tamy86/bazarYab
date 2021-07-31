<?php

namespace App\Http\Middleware\Business;

use Closure;
use Illuminate\Http\Request;

class CheckSettingRow1
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

        $customerNo1 = $request->input('customerNo1');
        $percentNo1 = $request->input('percentNo1');
        $monthNo1 = $request->input('monthNo1');

            if (!(preg_match($checkNumber, $customerNo1)) or (!(preg_match($checkNumber, $percentNo1))) or (!(preg_match($checkNumber, $monthNo1)))) {
                return response()->json([
                    'message' => ' فرمت داده وارد شده در ردیف اول صحیح نمی باشد یا مقادیر خالی وجود دارد',
                    'Success' => 0,
                    'message_type' => 'warning',
                ], 400);
            }
 else {

            return $next($request);
        }

    }
}
