<?php

use Heritage\Routing\Attributes\Controllers\Authorize;
use Heritage\Support\Facades\Gate;

Gate::has('test-auth');
Gate::has('test-auth-alt');
Gate::has('test-auth');

#[Authorize('test-auth')]
class AuthorizeAttributeHelper {}

#[Authorize('test-auth-alt')]
class AuthorizeAttributeAltHelper {}
