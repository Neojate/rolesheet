<?php

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

/*Route::get('/', function () {
    return view('welcome');
});*/

//COMIENZA EL JUEGO
Route::view('/', 'layout.layout');

Route::view('/pruebas', 'dd');

Route::view('/sheet', 'pages.rolesheet.index');
Route::post('/savesheet', 'SheetController@saveSheet');
