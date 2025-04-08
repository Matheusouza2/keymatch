<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use SertSoft\Laradations\Laradator;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $validation = [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ];

        if ($this->REQUEST_METHOD == 'PATCH') {
            $validation['email'] = 'nullable|email|unique:users,email,' . $this->id;
        }

        return $validation;
    }

    protected function prepareForValidation()
    {
        $this->merge(Laradator::sanitizeRequest($this));
    }
}
