<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Business\LoginBusinessController;
use App\Http\Controllers\Business\RegisterBusinessController;
use App\Http\Controllers\Business\GetAllInfoBusinessSettingsController;
use App\Http\Controllers\Business\GetAllInfoBusinessProfileController;
use App\Http\Controllers\Business\CustomerBusinessController;
use App\Http\Controllers\User\RegisterUserController;
use App\Http\Controllers\User\GetAllInfoUserProfileController;
use App\Http\Controllers\Business\CustomerBusinessReportsController;


use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/business/businesslist',[LoginBusinessController::class,'listBusinessCategory']);



Route::group([
//    'middleware' => 'api',
//    'prefix' => 'auth'
],
function() {
    Route::get('/business/listnocustomer', [GetAllInfoBusinessSettingsController::class, 'listNoCustomer']);
    Route::get('/business/listmonths', [GetAllInfoBusinessSettingsController::class, 'listMonths']);
    Route::get('/business/listpercents', [GetAllInfoBusinessSettingsController::class, 'listPercents']);

});


Route::post('/business/checkverify', [RegisterBusinessController::class, 'checkVerify'])->middleware('checkverify');
Route::post('/business/getverify',[RegisterBusinessController::class,'getVerify'])->middleware('checkphone');

Route::get('/business/gettoken',[GetAllInfoBusinessProfileController::class,'getToken']);
Route::get('/business/getnamefamily',[GetAllInfoBusinessProfileController::class,'getNameFamily']);
Route::get('/business/getphone',[GetAllInfoBusinessProfileController::class,'getPhone']);

Route::post('/business/searchpresented',[CustomerBusinessController::class,'searchPresented'])->middleware('checkallmobile');

Route::post('/business/newcustomer',[CustomerBusinessController::class,'newCustomer'])->middleware('checknewcustomerform');

Route::post('/business/searchcustomer',[CustomerBusinessController::class,'searchCustomer'])->middleware('checkallmobile');

Route::get('/business/report',[CustomerBusinessReportsController::class,'customerReport']);

Route::get('/business/editprofile',[GetAllInfoBusinessProfileController::class,'getBusinessInfo']);

Route::put('/business/updateprofileform',[GetAllInfoBusinessProfileController::class,'updateBusinessInfo'])->middleware('checkbusinesseditprofile');

Route::get('/business/logout',[GetAllInfoBusinessProfileController::class,'businessLogout']);


Route::post('/user/getverify',[RegisterUserController::class,'getVerify'])->middleware('checkphoneuser');
Route::post('/user/checkverify', [RegisterUserController::class, 'checkVerify'])->middleware('checkverifyuser');

Route::get('/user/gettoken',[GetAllInfoUserProfileController::class,'getToken']);
Route::get('/user/getnamefamily',[GetAllInfoUserProfileController::class,'getNameFamily']);
Route::get('/user/getphone',[GetAllInfoUserProfileController::class,'getPhone']);


//Route::group([
//    'middleware' => 'api',
//    'prefix' => 'auth'
//
//], function ($router) {
//    Route::post('/login', [AuthController::class, 'login']);
//    Route::post('/register', [AuthController::class, 'register']);
//    Route::post('/logout', [AuthController::class, 'logout']);
//    Route::post('/refresh', [AuthController::class, 'refresh']);
//    Route::get('/user-profile', [AuthController::class, 'userProfile']);
//});

