<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TailorPostRequest extends FormRequest
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
        $rules = [
            'description' => 'required|string|min:10|max:2000',
            'category' => 'required|string|in:Cloths,Uniform,Kortai,Sadrai',
        ];

        // Image validation - required for create, optional for update
        if ($this->isMethod('post')) {
            $rules['image'] = 'required|image|mimes:jpeg,png,jpg,gif|max:2048';
        } else {
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048';
        }

        return $rules;
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'description.required' => 'تفصیل اړین دی',
            'description.min' => 'تفصیل باید لږترلږه 10 توري ولري',
            'description.max' => 'تفصیل باید له 2000 تورو څخه لږ وي',

            'category.required' => 'کټګورۍ اړینه ده',
            'category.in' => 'مهرباني وکړئ یوه معتبره کټګورۍ وټاکئ',
            'image.required' => 'عکس اړین دی',
            'image.image' => 'یوازې عکسونه منل کیږي',
            'image.mimes' => 'عکس باید jpeg, png, jpg یا gif فارمټ کې وي',
            'image.max' => 'عکس باید له 2MB څخه کشر وي',
        ];
    }
}
