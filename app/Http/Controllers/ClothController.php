<?php

namespace App\Http\Controllers;

use App\Models\Cloth;
use App\Http\Requests\ClothRequest;
use App\Services\PdfReportService;
use App\Services\ExcelReportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ClothController extends Controller
{
    // Show all cloths for authenticated user
    public function index()
    {
        $cloths = Cloth::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('System/Cloths', [
            'cloths' => $cloths
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('System/Cloths/Create');
    }

    // Store a new cloth
    public function store(ClothRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id(); 
        Cloth::create($validated);

        return redirect()->route('cloths.index')->with('success', 'Cloth created successfully.');
    }

    // Show a specific cloth
    public function show(Cloth $cloth)
    {
         Gate::authorize('view', $cloth);

        return Inertia::render('System/Cloths/Show', [
            'cloth' => $cloth
        ]);
    }

    // Show edit form
    public function edit(Cloth $cloth)
    {
         Gate::authorize('edit', $cloth);

        return Inertia::render('System/Cloths/Edit', [
            'cloth' => $cloth
        ]);
    }

    // Update the cloth
    public function update(ClothRequest $request, Cloth $cloth)
    {
        Gate::authorize('update', $cloth);

        $validated = $request->validated();
        $cloth->update($validated);

        return redirect()->route('cloths.index')->with('success', 'Cloth updated successfully.');
    }

    // Delete cloth
    public function destroy(Cloth $cloth)
    {
        Gate::authorize('delete', $cloth);
        $cloth->delete();

        return redirect()->route('cloths.index')->with('success', 'Cloth deleted successfully.');
    }

    // Download Excel report
    public function downloadExcel(Request $request, ExcelReportService $excelService)
    {
        $type = $request->get('type', 'total');
        $userId = auth()->id();

        $query = Cloth::where('user_id', $userId);

        switch ($type) {
            case 'active':
                $query->whereNull('tasleem_tareekh');
                break;
            case 'disabled':
                $query->whereNotNull('tasleem_tareekh');
                break;
        }

        $cloths = $query->orderBy('created_at', 'desc')->get();

        $excelContent = $excelService->generateClothsReport($cloths, $type);

        $filename = 'cloths_' . $type . '_' . date('Y-m-d') . '.xlsx';

        return response($excelContent)
            ->header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Length', strlen($excelContent))
            ->header('Cache-Control', 'no-cache, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    }

    // Download PDF report
    public function downloadPdf(Request $request, PdfReportService $pdfService)
    {
        $type = $request->get('type', 'total');
        $userId = auth()->id();

        $query = Cloth::where('user_id', $userId);

        switch ($type) {
            case 'active':
                $query->whereNull('tasleem_tareekh');
                break;
            case 'disabled':
                $query->whereNotNull('tasleem_tareekh');
                break;
        }

        $cloths = $query->orderBy('created_at', 'desc')->get();

        $pdf = $pdfService->generateClothsReport($cloths, $type);
        $filename = 'cloths_' . $type . '_' . date('Y-m-d') . '.pdf';

        return $pdf->download($filename);
    }
}
