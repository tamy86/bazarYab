<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Business\RegisterBusinessController;
use Illuminate\Support\Facades\Auth;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('Home.welcome');
});

Route::get('/user/login', function () {
    return view('User.UserLogin');
})->name('userlogin');;

Route::get('/user/home', function () {
    return view('User.UserHome');
});

Route::get('/user/businessreport', function () {
    return view('User.UserBusinessReport');
});

Route::get('/user/discountsreport', function () {
    return view('User.UserDiscountsReport');
});

Route::get('/user/editprofile', function () {
    return view('User.UserEditProfile');
});

//public function __construct() {
//    /*middleware am mitoone comment she kar mikone*/
//    $this->middleware('auth:businessusers', ['except' => ['checkVerify', 'getVerify']]);
//    Auth::shouldUse('businessusers');
//}
//->controller[Auth::shouldUse('businessusers')]

Route::get('/business/login', function () {
    return view('Business.BusinessLogin');
})->name('businesslogin');


//Route::group(['middleware'=>'auth:businessusers'],function(){
//    Route::get('/business/home',[\App\Http\Controllers\Business\GetAllInfoBusinessProfileController::class,'getToken']);
//
//});
Route::get('/business/home', function () {
    return view('Business.BusinessHome');
});

Route::get('/business/newcustomer', function () {
    return view('Business.BusinessNewCustomer');
});

Route::get('/business/settingdiscount', function () {
    return view('Business.BusinessSettingDiscount');
});

Route::get('/business/viewsettingdiscount', function () {
    return view('Business.BusinessViewSettingDiscount');
});

Route::get('/business/customeroffreport', function () {
    return view('Business.BusinessViewSettingDiscount');
});

Route::get('/business/customerreport', function () {
    return view('Business.BusinessCustomerReport');
});

Route::get('/business/customersearch', function () {
    return view('Business.BusinessCustomerSearch');
});

Route::get('/business/editprofile', function () {
    return view('Business.BusinessEditProfile');
});

Route::get('/business/logout', function () {
    return view('Business.BusinessLogout');
});


