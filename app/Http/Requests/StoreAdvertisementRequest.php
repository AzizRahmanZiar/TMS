<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdvertisementRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check() && auth()->user()->isShopkeeper();
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'سرلیک اړین دی',
            'title.string' => 'سرلیک باید متن وي',
            'title.max' => 'سرلیک باید د 255 توریو څخه کم وي',
            'description.string' => 'تفصیل باید متن وي',
            'image.required' => 'انځور اړین دی',
            'image.image' => 'دا باید انځور وي',
            'image.mimes' => 'انځور باید jpeg, png, jpg یا gif وي',
            'image.max' => 'انځور باید د 2MB څخه کم وي',
        ];
    }
}
