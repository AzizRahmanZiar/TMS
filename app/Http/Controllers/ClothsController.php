<?php

namespace App\Http\Controllers;

use App\Models\Cloth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class ClothsController extends Controller
{
    public function cloths()
    {
        $cloths = Cloth::latest()->get();
        return Inertia::render('System/Cloths', [
            'cloths' => $cloths
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'mobile' => 'required|string|max:15',
            'qadd' => 'required|string|max:50',
            'shana' => 'required|string|max:50',
            'ghara' => 'required|string|max:50',
            'zegar' => 'required|string|max:50',
            'lstoony' => 'required|string|max:50',
            'partog' => 'required|string|max:50',
            'pai_tsa' => 'required|string|max:50',
            'rawrul_tareekh' => 'required|date',
            'tasleem_tareekh' => 'nullable|date',
            'tidad' => 'required|numeric',
            'money' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        }

        $cloth = Cloth::create($request->all());

        return redirect()->route('cloths.index')->with('success', 'ریکارډ په بریالیتوب سره اضافه شو');
    }

    public function update(Request $request, Cloth $cloth)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'mobile' => 'required|string|max:15',
            'qadd' => 'required|string|max:50',
            'shana' => 'required|string|max:50',
            'ghara' => 'required|string|max:50',
            'zegar' => 'required|string|max:50',
            'lstoony' => 'required|string|max:50',
            'partog' => 'required|string|max:50',
            'pai_tsa' => 'required|string|max:50',
            'rawrul_tareekh' => 'required|date',
            'tasleem_tareekh' => 'nullable|date',
            'tidad' => 'required|numeric',
            'money' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        }

        $cloth->update($request->all());

        return redirect()->route('cloths.index')->with('success', 'ریکارډ په بریالیتوب سره تازه شو');
    }

    public function destroy(Cloth $cloth)
    {
        $cloth->delete();
        return redirect()->route('cloths.index')->with('success', 'ریکارډ په بریالیتوب سره حذف شو');
    }
}
