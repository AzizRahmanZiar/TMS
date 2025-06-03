<?php

namespace App\Http\Requests;

use App\Enums\Roles;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:' . implode(',', Roles::values()),
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];

        // If role is tailor, add additional required fields
        if ($this->input('role') === 'tailor') {
            $rules['experience'] = 'required|integer|min:0';
            $rules['career'] = 'required|string|in:جامې,یونیفورم,صدری,کورتی';
            $rules['previous_work'] = 'required|string|max:255';
            $rules['certifications'] = 'required|string|max:255';
            $rules['skills'] = 'required|string|in:جامې,یونیفورم,صدری,کورتی';
            $rules['work_availability'] = 'required|in:Full-time,Part-time';

            // If addShop is true, add shop-related required fields
            if ($this->input('addShop')) {
                $rules['tailoring_name'] = 'required|string|max:255';
                $rules['tailoring_address'] = 'required|string';
                $rules['tailor_count'] = 'required|integer|min:0';
                $rules['published_year'] = 'required|integer|min:1900|max:' . (date('Y') + 1);
                $rules['contact_number'] = 'required|string|max:20';
                $rules['working_hours'] = 'required|string|in:د ۸:۰۰ سهار څخه تر ۱۲:۰۰ ماسپښین پورې,د ۸:۰۰ سهار څخه تر ۴:۰۰ ماسپښین پورې';
                $rules['services'] = 'required|string|in:جامې,یونیفورم,صدری,کورتی';
                $rules['shop_images'] = 'required|array';
                $rules['shop_images.*'] = 'image|mimes:jpeg,png,jpg,gif|max:2048';
            }
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            // General fields
            'name.required' => 'نوم اړین دی',
            'name.max' => 'نوم باید له ۲۵۵ حروفو څخه کم وي',
            'email.required' => 'بریښنالیک اړین دی',
            'email.email' => 'معتبر بریښنالیک دننه کړئ',
            'email.unique' => 'دا بریښنالیک دمخه ثبت شوی دی',
            'password.required' => 'پټنوم اړین دی',
            'password.min' => 'پټنوم باید لږ تر لږه ۸ حروف ولري',
            'role.required' => 'رول غوره کړئ',
            'role.in' => 'ناسم رول غوره کړی',

            // Profile image
            'profile_image.image' => 'فایل باید یو انځور وي',
            'profile_image.mimes' => 'انځور باید jpeg, png, jpg, or gif وي',
            'profile_image.max' => 'انځور باید له ۲MB څخه کم وي',

            // Tailor specific fields
            'experience.integer' => 'تجربه باید یو شمیر وي',
            'experience.min' => 'تجربه باید له ۰ څخه زیاته وي',
            'career.required' => 'مسلک اړین دی',
            'career.in' => 'مهرباني وکړئ یو معتبر مسلک وټاکئ',
            'previous_work.required' => 'مخکینی کار اړین دی',
            'previous_work.max' => 'مخکینی کار باید له ۲۵۵ حروفو څخه کم وي',
            'certifications.required' => 'تصدیقنامې اړینې دي',
            'certifications.max' => 'تصدیقنامې باید له ۲۵۵ حروفو څخه کم وي',
            'skills.required' => 'مهارتونه اړین دي',
            'skills.in' => 'مهرباني وکړئ یو معتبر مهارت وټاکئ',
            'work_availability.in' => 'ناسمه دنده غوره کړی',

            // Shop information
            'tailoring_name.max' => 'د خیاطۍ نوم باید له ۲۵۵ حروفو څخه کم وي',
            'tailor_count.integer' => 'د خیاطانو شمیر باید یو شمیر وي',
            'tailor_count.min' => 'د خیاطانو شمیر باید له ۰ څخه زیات وي',
            'published_year.integer' => 'کال باید یو شمیر وي',
            'published_year.min' => 'کال باید له ۱۹۰۰ څخه زیات وي',
            'published_year.max' => 'کال باید له اوسني کال څخه زیات نه وي',
            'contact_number.max' => 'د اړیکې شمیره باید له ۲۰ حروفو څخه کم وي',
            'shop_email.email' => 'معتبر بریښنالیک دننه کړئ',
            'working_hours.required' => 'د کار ساعتونه اړین دي',
            'working_hours.in' => 'مهرباني وکړئ یو معتبر د کار وخت وټاکئ',
            'services.required' => 'خدماتو اړین دي',
            'services.in' => 'مهرباني وکړئ یو معتبر خدمت وټاکئ',

            // Shop images
            'shop_images.array' => 'انځورونه باید یو لړ وي',
            'shop_images.*.image' => 'فایل باید یو انځور وي',
            'shop_images.*.mimes' => 'انځور باید jpeg, png, jpg, or gif وي',
            'shop_images.*.max' => 'انځور باید له ۲MB څخه کم وي',

            // Social links
            'social_links.array' => 'ټولنیزې اړیکې باید یو لړ وي',
            'social_links.facebook.url' => 'فیسبوک لینک باید معتبر وي',
            'social_links.instagram.url' => 'انستاگرام لینک باید معتبر وي',
            'social_links.telegram.url' => 'ټلګرام لینک باید معتبر وي',
        ];
    }
}
