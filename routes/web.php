<?php

Route::prefix('api')->group(function(){
    Route::post('login','Auth\LoginController@login');
    Route::post('logout','Auth\LoginController@logout');
});
Route::get('/{path}', function () {
    return view('home');
})->where('path', '.*');
return;
Route::get('/', function () {
    return view('welcome');
});

Route::get('logout','Auth\LoginController@logout');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
