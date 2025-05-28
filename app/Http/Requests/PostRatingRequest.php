<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRatingRequest extends FormRequest
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
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:10|max:1000',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'rating.required' => 'ریټنګ اړین دی',
            'rating.integer' => 'ریټنګ باید شمیره وي',
            'rating.min' => 'ریټنګ باید لږترلږه 1 وي',
            'rating.max' => 'ریټنګ باید له 5 څخه زیات نشي',
            'comment.required' => 'نظر اړین دی',
            'comment.min' => 'نظر باید لږترلږه 10 توري ولري',
            'comment.max' => 'نظر باید له 1000 تورو څخه لږ وي',
        ];
    }
}
