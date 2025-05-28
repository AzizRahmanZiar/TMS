<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class RegisterRequest extends FormRequest
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
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Rules\Password::defaults()],
            'role' => 'required|string|in:admin,tailor,shopkeeper,customer',
            'experience' => 'nullable|integer|min:0|max:50',
            'career' => 'nullable|string|max:255',
            'previous_work' => 'nullable|string|max:500',
            'certifications' => 'nullable|string|max:500',
            'skills' => 'nullable|string|max:500',
            'work_availability' => 'nullable|string|max:255',
            'tailoring_name' => 'nullable|string|max:255',
            'tailoring_address' => 'nullable|string|max:500',
            'tailor_count' => 'nullable|integer|min:1|max:100',
            'published_year' => 'nullable|integer|min:1900|max:' . date('Y'),
            'contact_number' => 'nullable|string|regex:/^07[0-9]{8}$/',
            'shop_email' => 'nullable|email|max:255',
            'working_hours' => 'nullable|string|max:255',
            'services' => 'nullable|string|max:1000',
            'payment_methods' => 'nullable|string',
            'social_links' => 'nullable|string',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'shop_images' => 'nullable|array|max:5',
            'shop_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'نوم اړین دی',
            'name.regex' => 'نوم باید یوازې توري ولري',
            'email.required' => 'بریښنالیک اړین دی',
            'email.email' => 'بریښنالیک ناسم دی',
            'email.unique' => 'دا بریښنالیک دمخه ثبت شوی',
            'password.required' => 'پټنوم اړین دی',
            'role.required' => 'رول اړین دی',
            'role.in' => 'مهرباني وکړئ یو معتبر رول وټاکئ',
            'experience.integer' => 'تجربه باید شمیره وي',
            'experience.min' => 'تجربه باید مثبت شمیره وي',
            'experience.max' => 'تجربه باید له 50 کلونو څخه لږ وي',
            'career.max' => 'مسلک باید له 255 تورو څخه لږ وي',
            'previous_work.max' => 'مخکیني کار باید له 500 تورو څخه لږ وي',
            'certifications.max' => 'تصدیقنامې باید له 500 تورو څخه لږې وي',
            'skills.max' => 'مهارتونه باید له 500 تورو څخه لږ وي',
            'work_availability.max' => 'د کار شتون باید له 255 تورو څخه لږ وي',
            'tailoring_name.max' => 'د خیاطۍ نوم باید له 255 تورو څخه لږ وي',
            'tailoring_address.max' => 'د خیاطۍ پته باید له 500 تورو څخه لږه وي',
            'tailor_count.integer' => 'د خیاطانو شمیر باید شمیره وي',
            'tailor_count.min' => 'د خیاطانو شمیر باید لږترلږه 1 وي',
            'tailor_count.max' => 'د خیاطانو شمیر باید له 100 څخه لږ وي',
            'published_year.integer' => 'د خپرولو کال باید شمیره وي',
            'published_year.min' => 'د خپرولو کال باید له 1900 څخه وروسته وي',
            'published_year.max' => 'د خپرولو کال باید د اوسني کال څخه مخکې وي',
            'contact_number.regex' => 'د اړیکو شمیره باید 10 رقمه وي او په 07 پیل شي',
            'shop_email.email' => 'د پلورنځي بریښنالیک ناسم دی',
            'working_hours.max' => 'د کار ساعتونه باید له 255 تورو څخه لږ وي',
            'services.max' => 'خدمات باید له 1000 تورو څخه لږ وي',
            'profile_image.image' => 'د پروفایل انځور باید عکس وي',
            'profile_image.mimes' => 'د پروفایل انځور باید jpeg, png, jpg یا gif وي',
            'profile_image.max' => 'د پروفایل انځور باید له 2MB څخه کشر وي',
            'shop_images.array' => 'د پلورنځي انځورونه باید د انځورونو لیست وي',
            'shop_images.max' => 'د پلورنځي انځورونه باید له 5 څخه لږ وي',
            'shop_images.*.image' => 'د پلورنځي انځور باید عکس وي',
            'shop_images.*.mimes' => 'د پلورنځي انځور باید jpeg, png, jpg یا gif وي',
            'shop_images.*.max' => 'د پلورنځي انځور باید له 2MB څخه کشر وي',
        ];
    }
}
