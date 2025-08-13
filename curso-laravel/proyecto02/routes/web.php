<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SumaController;
use App\Models\Producto;
use App\Http\Controllers\ProductoController;

Route::get('/', function () {
    return view('inicio');
});

Route::get('/suma', [SumaController::class, 'index']);

Route::post('/suma', [SumaController::class, 'calcular']);

Route::get('/productos', [ProductoController::class, 'index']);