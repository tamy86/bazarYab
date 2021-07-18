<?php

namespace App\Http\Middleware\PublicCheck;

use Closure;
use Illuminate\Http\Request;

class CheckMobilePhone
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

        $phonevalidaty="/(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/";
//        $phonevalidaty ="/^(09)(12|19|35|36|37|38|39|32|21|22|31|34|13|14|18|17|16|15|11|10|20|90|91|92|93|94|01|02|03|04|05|30|33|)\d{7}$/";
        $phone=$request->input('phone');

        if (!(preg_match($phonevalidaty,$phone))){

            return response()->json([
                'message'=>' ! فرمت شماره همراه وارد شده صحیح نمی باشد',
                'Success'=>0,
                'message type' =>'warning',
            ],400);
        }
        else {

            return $next($request);
        }



    }
}
