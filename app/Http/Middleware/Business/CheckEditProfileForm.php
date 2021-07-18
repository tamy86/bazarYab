<?php

namespace App\Http\Middleware\Business;

use Closure;
use Illuminate\Http\Request;

class CheckEditProfileForm
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
        $charFarsi = "/^[-]|[۰۱۲۳۴۵۶۷۸۹]|[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/";



        $Mobile=$request->input('businessMobile');
        $BusinessName=$request->input('businessName');
        $BusinessAddress=$request->input('businessAddress');


        if (!(preg_match($phonevalidaty,$Mobile))) {

            return response()->json([
                'message' => ' ! فرمت شماره همراه وارد شده صحیح نمی باشد',
                'Success' => 0,
                'message type' => 'warning',
            ], 400);
        }else if(!(preg_match($charFarsi,$BusinessName))){

            return response()->json([
                'message' => ' ! فرمت نام وارد شده صحیح نمی باشد',
                'Success' => 0,
                'message type' => 'warning',
            ], 400);
        }else if(!(preg_match($charFarsi,$BusinessAddress)))
        {
            return response()->json([
                'message' => ' ! فرمت آدرس وارد شده صحیح نمی باشد',
                'Success' => 0,
                'message type' => 'warning',
            ], 400);
        }
          else {

              return $next($request);

    }
        }
}
