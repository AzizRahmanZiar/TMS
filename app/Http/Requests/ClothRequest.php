<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClothRequest extends FormRequest
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
            'qadd' => 'required|numeric|min:0|max:999',
            'shana' => 'required|numeric|min:0|max:999',
            'ghara' => 'required|numeric|min:0|max:999',
            'zegar' => 'required|numeric|min:0|max:999',
            'lstoony' => 'required|numeric|min:0|max:999',
            'partog' => 'required|numeric|min:0|max:999',
            'pai_tsa' => 'required|numeric|min:0|max:999',
            'tidad' => 'required|integer|min:1',
            'money' => 'required|numeric|min:0',
            'rawrul_tareekh' => 'required|date',
            'tasleem_tareekh' => 'nullable|date|after:rawrul_tareekh',
            'lastoni' => 'boolean',
            'lastoni_goti' => 'boolean',
            'bin' => 'boolean',
            'bin_kat' => 'boolean',
            'makh_jib' => 'boolean',
            'tarikhzi' => 'boolean',
            'kalari' => 'boolean',
            'shabazi' => 'boolean',
            'arabi' => 'boolean',
            'lemen' => 'boolean',
            'lastoni_2' => 'boolean',
        ];
    }

    /**
     * Get custom error messages in Pashto.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'نوم اړین دی',
            'nom.string' => 'نوم باید متن وي',
            'nom.max' => 'نوم باید د 255 توریو څخه کم وي',
            'nom.regex' => 'نوم باید یوازې انګلیسي یا پښتو توري ولري',

            'mobile.required' => 'مبایل نمبر اړین دی',
            'mobile.string' => 'مبایل نمبر باید متن وي',
            'mobile.regex' => 'د مبایل نمبر باید 10 رقمه وي او په 07 پیل شي',

            'qadd.required' => 'قد اړین دی',
            'qadd.numeric' => 'قد باید شمیره وي',
            'qadd.min' => 'قد باید مثبت شمیره وي',
            'qadd.max' => 'قد باید د 999 څخه کم وي',

            'shana.required' => 'شانه اړینه ده',
            'shana.numeric' => 'شانه باید شمیره وي',
            'shana.min' => 'شانه باید مثبت شمیره وي',
            'shana.max' => 'شانه باید د 999 څخه کم وي',

            'ghara.required' => 'غاړه اړینه ده',
            'ghara.numeric' => 'غاړه باید شمیره وي',
            'ghara.min' => 'غاړه باید مثبت شمیره وي',
            'ghara.max' => 'غاړه باید د 999 څخه کم وي',

            'zegar.required' => 'ځګر اړین دی',
            'zegar.numeric' => 'ځګر باید شمیره وي',
            'zegar.min' => 'ځګر باید مثبت شمیره وي',
            'zegar.max' => 'ځګر باید د 999 څخه کم وي',

            'lstoony.required' => 'لستوڼي اندازه اړینه ده',
            'lstoony.numeric' => 'لستوڼي اندازه باید شمیره وي',
            'lstoony.min' => 'لستوڼي اندازه باید مثبت شمیره وي',
            'lstoony.max' => 'لستوڼي اندازه باید د 999 څخه کم وي',

            'partog.required' => 'پرتوګ اړین دی',
            'partog.numeric' => 'پرتوګ باید شمیره وي',
            'partog.min' => 'پرتوګ باید مثبت شمیره وي',
            'partog.max' => 'پرتوګ باید د 999 څخه کم وي',

            'pai_tsa.required' => 'پایڅه اړینه ده',
            'pai_tsa.numeric' => 'پایڅه باید شمیره وي',
            'pai_tsa.min' => 'پایڅه باید مثبت شمیره وي',
            'pai_tsa.max' => 'پایڅه باید د 999 څخه کم وي',

            'tidad.required' => 'تعداد اړین دی',
            'tidad.integer' => 'تعداد باید شمیره وي',
            'tidad.min' => 'تعداد باید لږترلږه 1 وي',

            'money.required' => 'پیسې اړینې دي',
            'money.numeric' => 'پیسې باید شمیره وي',
            'money.min' => 'پیسې باید مثبت شمیره وي',

            'rawrul_tareekh.required' => 'د راوړلو تاریخ اړین دی',
            'rawrul_tareekh.date' => 'د راوړلو تاریخ باید سمه نیټه وي',

            'tasleem_tareekh.date' => 'د تسلیمولو تاریخ باید سمه نیټه وي',
            'tasleem_tareekh.after' => 'د تسلیمولو تاریخ باید د راوړلو تاریخ څخه وروسته وي',

            'lastoni.boolean' => 'لستوڼي باید ریښتیا یا دروغ وي',
            'lastoni_goti.boolean' => 'لستوڼي غوټۍ باید ریښتیا یا دروغ وي',
            'bin.boolean' => 'بین باید ریښتیا یا دروغ وي',
            'bin_kat.boolean' => 'بین کاټ باید ریښتیا یا دروغ وي',
            'makh_jib.boolean' => 'د مخ جیب باید ریښتیا یا دروغ وي',
            'tarikhzi.boolean' => 'ترخزي باید ریښتیا یا دروغ وي',
            'kalari.boolean' => 'کالري باید ریښتیا یا دروغ وي',
            'shabazi.boolean' => 'شابازي باید ریښتیا یا دروغ وي',
            'arabi.boolean' => 'عربي باید ریښتیا یا دروغ وي',
            'lemen.boolean' => 'لمن باید ریښتیا یا دروغ وي',
            'lastoni_2.boolean' => 'لستوڼي باید ریښتیا یا دروغ وي',
        ];
    }
}
