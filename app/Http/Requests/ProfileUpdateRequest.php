<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'profile_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'نوم ضروری دی',
            'name.string' => 'نوم باید متن وي',
            'name.max' => 'نوم باید د :max توریو څخه کم وي',
            'email.required' => 'بریښنالیک ضروری دی',
            'email.string' => 'بریښنالیک باید متن وي',
            'email.email' => 'د بریښنالیک بڼه سمه نده',
            'email.max' => 'بریښنالیک باید د :max توریو څخه کم وي',
            'email.unique' => 'دا بریښنالیک دمخه شتون لري',
            'profile_image.image' => 'فایل باید یو انځور وي',
            'profile_image.mimes' => 'انځور باید jpeg, png, jpg, یا gif وي',
            'profile_image.max' => 'انځور باید له 2MB څخه کم وي',
        ];
    }
}
