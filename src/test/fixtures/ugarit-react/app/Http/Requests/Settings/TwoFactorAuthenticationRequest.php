<?php

namespace App\Http\Requests\Settings;

use Heritage\Foundation\Http\FormRequest;
use Ugarit\Fortify\Features;
use Ugarit\Fortify\InteractsWithTwoFactorState;

class TwoFactorAuthenticationRequest extends FormRequest
{
    use InteractsWithTwoFactorState;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Features::enabled(Features::twoFactorAuthentication());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Heritage\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [];
    }
}
