<?php

namespace App\Http\Controllers;

use App\Models\Kortai;
use App\Http\Requests\KortaiRequest;
use App\Services\PdfReportService;
use App\Services\ExcelReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KortaiController extends Controller
{
    // Display all kortais
    public function index()
    {
        $kortais = Kortai::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('System/Kortai', [
            'kortais' => $kortais
        ]);
    }

    // Show create form (React side handles form UI)
    public function create()
    {
        return Inertia::render('System/Kortai/Create');
    }

    // Store a new kortai
    public function store(KortaiRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        Kortai::create($validated);

        return redirect()->route('kortai.index')->with('success', 'Kortai created successfully.');
    }

    // Show a specific kortai
    public function show(Kortai $kortai)
    {

        abort_if($kortai->user_id !== auth()->id(), 403, 'Unauthorized action.');
        return Inertia::render('System/Kortai/Show', [
            'kortai' => $kortai
        ]);
    }

    // Show edit form
    public function edit(Kortai $kortai)
    {
        // if ($kortai->user_id !== auth()->id()) {
        //     abort(403, 'Unauthorized action.');
        // }
        abort_if($kortai->user_id !== auth()->id(), 403, 'Unauthorized action.');
        return Inertia::render('System/Kortai/Edit', [
            'kortai' => $kortai
        ]);
    }

    // Update kortai
    public function update(KortaiRequest $request, Kortai $kortai)
    {
        abort_if($kortai->user_id !== auth()->id(), 403, 'Unauthorized action.');

        $validated = $request->validated();
        $kortai->update($validated);

        return redirect()->route('kortai.index')->with('success', 'Kortai updated successfully.');
    }

    // Delete kortai
    public function destroy(Kortai $kortai)
    {
        // if ($kortai->user_id !== auth()->id()) {
        //     abort(403, 'Unauthorized action.');
        // }
        abort_if($kortai->user_id !== auth()->id(), 403, 'Unauthorized action.');
        $kortai->delete();

        return redirect()->route('kortai.index')->with('success', 'Kortai deleted successfully.');
    }

    // Download Excel report
    public function downloadExcel(Request $request, ExcelReportService $excelService)
    {
        $type = $request->get('type', 'total');
        $userId = auth()->id();

        $query = Kortai::where('user_id', $userId);

        switch ($type) {
            case 'active':
                $query->whereNull('tasleem_tareekh');
                break;
            case 'disabled':
                $query->whereNotNull('tasleem_tareekh');
                break;
        }

        $kortais = $query->orderBy('created_at', 'desc')->get();

        $excelContent = $excelService->generateKortaisReport($kortais, $type);

        $filename = 'kortais_' . $type . '_' . date('Y-m-d') . '.xlsx';

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

        $query = Kortai::where('user_id', $userId);

        switch ($type) {
            case 'active':
                $query->whereNull('tasleem_tareekh');
                break;
            case 'disabled':
                $query->whereNotNull('tasleem_tareekh');
                break;
        }

        $kortais = $query->orderBy('created_at', 'desc')->get();

        $pdf = $pdfService->generateKortaisReport($kortais, $type);
        $filename = 'kortais_' . $type . '_' . date('Y-m-d') . '.pdf';

        return $pdf->download($filename);
    }
}

