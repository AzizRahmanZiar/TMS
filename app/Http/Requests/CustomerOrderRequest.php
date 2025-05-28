<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerOrderRequest extends FormRequest
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
            'phone' => 'required|string|regex:/^07[0-9]{8}$/',
            'address' => 'required|string|min:5|max:500',
            'tailor_id' => 'required|exists:users,id',
            'status' => 'nullable|string|in:pending,accepted,rejected,completed',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'phone.required' => 'د تلیفون شمیره اړینه ده',
            'phone.regex' => 'د تلیفون شمیره باید 10 رقمه وي او په 07 پیل شي',
            'address.required' => 'پته اړینه ده',
            'address.min' => 'پته باید لږترلږه 5 توري ولري',
            'address.max' => 'پته باید له 500 تورو څخه لږ وي',

            'tailor_id.required' => 'خیاط اړین دی',
            'tailor_id.exists' => 'دا خیاط شتون نلري',
            'status.in' => 'د فرمایش حالت ناسم دی',
        ];
    }
}
