<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use SertSoft\Laradations\Laradator;

class TeamRequest extends FormRequest
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
        return [
            'name' => 'required|string',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge(Laradator::sanitizeRequest($this));
    }
}
