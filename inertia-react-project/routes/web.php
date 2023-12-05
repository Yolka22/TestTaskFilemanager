<?php

use App\Http\Controllers\FileController;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [FileController::class, 'index']);

Route::post('/file/upload', [FileController::class, 'upload']);
Route::get('/file/download/{fileName}', [FileController::class, 'download']);
Route::delete('/file/delete/{fileName}', [FileController::class, 'delete']);
Route::get('/files', [FileController::class, 'getFiles']);