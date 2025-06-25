<?php

namespace App\Http\Controllers;

use App\Models\Uniform;
use App\Http\Requests\UniformRequest;
use App\Services\PdfReportService;
use App\Services\ExcelReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UniformController extends Controller
{
    // List all uniforms for the system
    public function index()
    {
        // Only get uniforms for the authenticated user
        $uniforms = Uniform::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('System/Uniform', [
            'uniforms' => $uniforms
        ]);
    }

    // Show the create form
    public function create()
    {
        return Inertia::render('Uniforms/Create');
    }

    // Store a new uniform
    public function store(UniformRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        Uniform::create($validated);

        return redirect()->route('uniforms.index')->with('success', 'Uniform created successfully');
    }

    // Show a single uniform
    public function show(Uniform $uniform)
    {
        // Check if the uniform belongs to the authenticated user
        if ($uniform->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Uniforms/Show', [
            'uniform' => $uniform
        ]);
    }

    // Show the edit form
    public function edit(Uniform $uniform)
    {
        // Check if the uniform belongs to the authenticated user
        if ($uniform->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Uniforms/Edit', [
            'uniform' => $uniform
        ]);
    }

    // Update a uniform
    public function update(UniformRequest $request, Uniform $uniform)
    {
        // Check if the uniform belongs to the authenticated user
        if ($uniform->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validated();
        $uniform->update($validated);

        return redirect()->route('uniforms.index')->with('success', 'Uniform updated successfully');
    }

    // Delete a uniform
    public function destroy(Uniform $uniform)
    {
        // Check if the uniform belongs to the authenticated user
        if ($uniform->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $uniform->delete();
        return back()->with('success', 'Uniform deleted successfully');
    }

    // Download Excel report
    public function downloadExcel(Request $request, ExcelReportService $excelService)
    {
        $type = $request->get('type', 'total');
        $userId = auth()->id();

        $query = Uniform::where('user_id', $userId);

        switch ($type) {
            case 'active':
                $query->whereNull('tasleem_tareekh');
                break;
            case 'disabled':
                $query->whereNotNull('tasleem_tareekh');
                break;
        }

        $uniforms = $query->orderBy('created_at', 'desc')->get();

        $csvContent = $excelService->generateUniformsReport($uniforms, $type);

        $filename = 'uniforms_' . $type . '_' . date('Y-m-d') . '.csv';

        return response($csvContent)
            ->header('Content-Type', 'text/csv; charset=UTF-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Length', strlen($csvContent));
    }

    // Download PDF report
    public function downloadPdf(Request $request, PdfReportService $pdfService)
    {
        $type = $request->get('type', 'total');
        $userId = auth()->id();

        $query = Uniform::where('user_id', $userId);

        switch ($type) {
            case 'active':
                $query->whereNull('tasleem_tareekh');
                break;
            case 'disabled':
                $query->whereNotNull('tasleem_tareekh');
                break;
        }

        $uniforms = $query->orderBy('created_at', 'desc')->get();

        $pdf = $pdfService->generateUniformsReport($uniforms, $type);
        $pdf->setOptions(['isHtml5ParserEnabled' => true, 'isRemoteEnabled' => true]);

        $filename = 'uniforms_' . $type . '_' . date('Y-m-d') . '.pdf';

        return $pdf->download($filename);
    }
}
