<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SadraiRequest extends FormRequest
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
            'nom' => 'required|string|max:255|regex:/^[\p{L}\s]+$/u',
            'mobile' => 'required|string|regex:/^07[0-9]{8}$/',
            'money' => 'required|numeric|min:0',
            'shana' => 'required|string|max:255',
            'tenna' => 'required|string|max:255',
            'ghara_dol' => 'required|string|max:255',
            'zegar' => 'required|string|max:255',
            'tidad' => 'required|integer|min:1',
            'rawrul_tareekh' => 'required|date',
            'tasleem_tareekh' => 'nullable|date|after:rawrul_tareekh',
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'نوم اړین دی',
            'nom.regex' => 'نوم باید یوازې انګلیسي یا پښتو توري ولري',
            'mobile.required' => 'مبایل نمبر اړین دی',
            'mobile.regex' => 'د مبایل نمبر باید 10 رقمه وي او په 07 پیل شي',
            'money.required' => 'پیسې اړینې دي',
            'money.numeric' => 'پیسې باید شمیره وي',
            'money.min' => 'پیسې باید مثبت شمیره وي',
            'shana.required' => 'شانه اړینه ده',
            'shana.string' => 'شانه باید متن وي',
            'tenna.required' => 'تنه اړینه ده',
            'tenna.string' => 'تنه باید متن وي',
            'ghara_dol.required' => 'د غاړي ډول اړین دی',
            'ghara_dol.string' => 'د غاړي ډول باید متن وي',
            'zegar.required' => 'ځګر اړین دی',
            'zegar.string' => 'ځګر باید متن وي',
            'tidad.required' => 'تعداد اړین دی',
            'tidad.integer' => 'تعداد باید شمیره وي',
            'tidad.min' => 'تعداد باید لږترلږه 1 وي',
            'rawrul_tareekh.required' => 'د راوړلو تاریخ اړین دی',
            'rawrul_tareekh.date' => 'د راوړلو تاریخ باید سم وي',
            'tasleem_tareekh.date' => 'د تسلیمولو تاریخ باید سم وي',
            'tasleem_tareekh.after' => 'د تسلیمولو تاریخ باید د راوړلو تاریخ څخه وروسته وي',
        ];
    }
}
