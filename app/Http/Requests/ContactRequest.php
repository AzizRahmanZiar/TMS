<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
            'name' => 'required|string|max:255|regex:/^[\p{L}\s]+$/u',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|regex:/^07[0-9]{8}$/',
            'message' => 'required|string|min:10|max:1000',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'نوم اړین دی',
            'name.regex' => 'نوم باید یوازې انګلیسي یا پښتو توري ولري',
            'email.required' => 'بریښنالیک اړین دی',
            'email.email' => 'بریښنالیک ناسم دی',
            'phone.required' => 'د تلیفون شمیره اړینه ده',
            'phone.regex' => 'د تلیفون شمیره باید 10 رقمه وي او په 07 پیل شي',
            'message.required' => 'پیغام اړین دی',
            'message.min' => 'پیغام باید لږترلږه 10 توري ولري',
            'message.max' => 'پیغام باید له 1000 تورو څخه لږ وي',

        ];
    }
}
