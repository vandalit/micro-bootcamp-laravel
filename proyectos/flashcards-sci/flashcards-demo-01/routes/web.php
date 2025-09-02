<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FlashcardController;
use App\Http\Controllers\DomainController;

// Public routes
Route::get('/', function () {
    return redirect('/login');
});

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// Protected routes - Domain configuration (without domain restriction)
Route::middleware(['auth'])->group(function () {
    Route::get('/domain/config', [DomainController::class, 'index'])->name('domain.config');
    Route::post('/domain', [DomainController::class, 'store'])->name('domain.store');
    Route::post('/domain/{domain}/activate', [DomainController::class, 'activate'])->name('domain.activate');
    Route::post('/domain/deactivate-all', [DomainController::class, 'deactivateAll'])->name('domain.deactivate');
});

// Protected routes - With domain restriction
Route::middleware(['auth', \App\Http\Middleware\CheckDomainRestriction::class])->group(function () {
    Route::get('/dashboard', [FlashcardController::class, 'dashboard'])->name('dashboard');
    Route::post('/flashcards', [FlashcardController::class, 'store'])->name('flashcards.store');
    Route::delete('/flashcards/{flashcard}', [FlashcardController::class, 'destroy'])->name('flashcards.destroy');
    
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
