<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
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
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:1000',
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
            'subject.required' => 'موضوع اړینه ده',
            'subject.max' => 'موضوع باید له 255 تورو څخه لږ وي',
            'message.required' => 'پیغام اړین دی',
            'message.min' => 'پیغام باید لږترلږه 10 توري ولري',
            'message.max' => 'پیغام باید له 1000 تورو څخه لږ وي',
        ];
    }
}
