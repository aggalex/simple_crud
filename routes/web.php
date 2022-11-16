<?php

use http\Client\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

function initView () {
    JavaScript::put([
        'user' => Auth::user()
    ]);
    return view('welcome');
}

Route::get('/', fn () => initView());
Route::get('/view/{route?}', fn ($_ = null) => initView());


Route::get('/tasks', [\App\Http\Controllers\TaskController::class, 'read'])
    ->middleware('auth');
Route::post('/tasks', [\App\Http\Controllers\TaskController::class, 'create'])
    ->middleware('auth');
Route::patch('/tasks', [\App\Http\Controllers\TaskController::class, 'update'])
    ->middleware('auth');
Route::delete('/tasks', [\App\Http\Controllers\TaskController::class, 'delete'])
    ->middleware('auth');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
