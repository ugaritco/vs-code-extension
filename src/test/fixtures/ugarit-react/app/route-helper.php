<?php

use Heritage\Foundation\Http\Attributes\RedirectToRoute;
use Heritage\Support\Facades\Redirect;
use Heritage\Support\Facades\Request;
use Heritage\Support\Facades\Response;
use Heritage\Support\Facades\Route;
use Heritage\Support\Facades\URL;

// 1. Helper Functions
route('home');
route('missing.route');
// signedRoute('dashboard');
to_route('dashboard');

// 2. Redirect Facade & Helper
Redirect::route('home');
Redirect::signedRoute('dashboard');
Redirect::temporarySignedRoute('home', now()->addHour());
redirect()->route('dashboard');

// 3. URL Facade & Helper
URL::route('home');
URL::signedRoute('dashboard');
URL::temporarySignedRoute('home', now()->addHour());
url()->route('dashboard');

// 4. Response Facade & Factory
Response::redirectToRoute('home');
response()->redirectToRoute('dashboard');

// 5. Route & Request Facades
Route::is('dashboard');
Request::routeIs('home');
request()->routeIs('dashboard');

// 6. Attributes
#[RedirectToRoute('home')]
class RedirectToRouteHelper {}

#[RedirectToRoute('missing.route')]
class RedirectToRouteMissingHelper {}
