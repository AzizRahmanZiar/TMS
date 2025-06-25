<?php

namespace App\Http\Controllers;

use App\Models\Sadrai;
use App\Http\Requests\SadraiRequest;
use App\Services\PdfReportService;
use App\Services\ExcelReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SadraiController extends Controller
{
    // Display all sadrais
    public function index()
    {
        $sadrais = Sadrai::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('System/Sadrai', [
            'sadrais' => $sadrais
        ]);
    }

    // Show create form (React side handles form UI)
    public function create()
    {
        return Inertia::render('System/Sadrai/Create');
    }

    // Store a new sadrai
    public function store(SadraiRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();

        Sadrai::create($validated);

        return redirect()->route('sadrai.index')->with('success', 'Sadrai created successfully.');
    }

    // Show a specific sadrai
    public function show(Sadrai $sadrai)
    {
       if ($sadrai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('System/Sardai/Show', [
            'sadrai' => $sadrai
        ]);
    }

    // Show edit form
    public function edit(Sadrai $sadrai)
    {
         if ($sadrai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('System/Sardai/Edit', [
            'sadrai' => $sadrai
        ]);
    }

    // Update sadrai
    public function update(SadraiRequest $request, Sadrai $sadrai)
    {
         if ($sadrai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validated();
        $sadrai->update($validated);

        return redirect()->route('sadrai.index')->with('success', 'Sadrai updated successfully.');
    }

    // Delete sadrai
    public function destroy(Sadrai $sadrai)
    {
       if ($sadrai->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }
        $sadrai->delete();

        return redirect()->route('sadrai.index')->with('success', 'Sadrai deleted successfully.');
    }

    // Download Excel report
    public function downloadExcel(Request $request, ExcelReportService $excelService)
    {
        $type = $request->get('type', 'total');
        $userId = auth()->id();

        $query = Sadrai::where('user_id', $userId);

        switch ($type) {
            case 'active':
                $query->whereNull('tasleem_tareekh');
                break;
            case 'disabled':
                $query->whereNotNull('tasleem_tareekh');
                break;
        }

        $sadrais = $query->orderBy('created_at', 'desc')->get();

        $excelContent = $excelService->generateSadraisReport($sadrais, $type);

        $filename = 'sadrais_' . $type . '_' . date('Y-m-d') . '.xls';

        return response($excelContent)
            ->header('Content-Type', 'application/vnd.ms-excel; charset=UTF-8')
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

        $query = Sadrai::where('user_id', $userId);

        switch ($type) {
            case 'active':
                $query->whereNull('tasleem_tareekh');
                break;
            case 'disabled':
                $query->whereNotNull('tasleem_tareekh');
                break;
        }

        $sadrais = $query->orderBy('created_at', 'desc')->get();

        $pdf = $pdfService->generateSadraisReport($sadrais, $type);
        $pdf->setOptions(['isHtml5ParserEnabled' => true, 'isRemoteEnabled' => true]);

        $filename = 'sadrais_' . $type . '_' . date('Y-m-d') . '.pdf';

        return $pdf->download($filename);
    }
}
