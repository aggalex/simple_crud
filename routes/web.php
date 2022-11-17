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

Route::get('/', fn () => view('welcome'));
Route::get('/view/{route?}', fn () => view('welcome'));


Route::get('/tasks', [\App\Http\Controllers\TaskController::class, 'read']);
Route::post('/tasks', [\App\Http\Controllers\TaskController::class, 'create']);
Route::patch('/tasks', [\App\Http\Controllers\TaskController::class, 'update']);
Route::delete('/tasks', [\App\Http\Controllers\TaskController::class, 'delete']);

Auth::routes();
Route::get('/profile', [\App\Http\Controllers\Auth\ProfileController::class, 'profile']);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
