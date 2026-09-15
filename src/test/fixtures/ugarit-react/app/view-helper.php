<?php

use Heritage\Support\Facades\Route;
use Heritage\Support\Facades\View;

view('app');
View::make('app');
Route::view('view-link', 'app');
view('missing-view');
