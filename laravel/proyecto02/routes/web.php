<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('inicio');
});

Route::get('/suma', function () {
    return view('suma');
});
Route::post('/suma', function (Request $request) {
    $num1 = $request->input('num1');
    $num2 = $request->input('num2');
    $suma = $num1 + $num2;
    
   return view('suma', ['suma' => $suma]);
});