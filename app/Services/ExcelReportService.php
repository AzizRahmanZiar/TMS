<?php

namespace App\Services;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class ExcelReportService
{
    public function generateClothsReport($cloths, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $currentDate = date('Y-m-d H:i:s');
        $totalMoney = $cloths->sum('money');
        $totalRecords = $cloths->count();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('د جامو راپور');

        // Set RTL direction
        $sheet->setRightToLeft(true);

        // Header row
        $sheet->setCellValue('A1', 'د خیاطۍ مدیریت سیسټم - د جامو راپور - ' . $typeLabel);
        $this->applyTitleStyle($sheet, 'A1', 'A1:X1');

        // Info row
        $sheet->mergeCells('A3:X3');
        $sheet->setCellValue('A3', 'د تولید نیټه: ' . $currentDate . ' | ټول ریکارډونه: ' . $totalRecords . ' | ټولې پیسې: ' . number_format($totalMoney, 0) . ' افغانۍ');
        $sheet->getStyle('A3')->applyFromArray([
            'font' => ['size' => 12],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER]
        ]);

        // Column headers - ALL FIELDS
        $headers = [
            'نوم', 'موبایل', 'قد', 'شانه', 'غاړه', 'زیګر', 'لستونی', 'پرتوګ', 'پای څه',
            'لستوڼي', 'لستوڼي غوټۍ', 'بین', 'بین کاټ', 'د مخ جیب', 'ترخزي', 'کالري',
            'شبازي', 'عربي', 'لمن', 'لستوڼي ۲', 'د راوړلو نیټه', 'د تسلیمولو نیټه', 'تعداد', 'پیسې'
        ];
        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . '5', $header);
            $col++;
        }

        $this->applyHeaderStyle($sheet, 'A5:X5');
        $sheet->getRowDimension(5)->setRowHeight(25);

        // Data rows - ALL FIELDS
        $row = 6;
        foreach ($cloths as $cloth) {
            $sheet->setCellValue('A' . $row, $cloth->nom ?: 'نامعلوم');
            $sheet->setCellValue('B' . $row, $cloth->mobile ?: 'نامعلوم');
            $sheet->setCellValue('C' . $row, $cloth->qadd ?: '-');
            $sheet->setCellValue('D' . $row, $cloth->shana ?: '-');
            $sheet->setCellValue('E' . $row, $cloth->ghara ?: '-');
            $sheet->setCellValue('F' . $row, $cloth->zegar ?: '-');
            $sheet->setCellValue('G' . $row, $cloth->lstoony ?: '-');
            $sheet->setCellValue('H' . $row, $cloth->partog ?: '-');
            $sheet->setCellValue('I' . $row, $cloth->pai_tsa ?: '-');
            $sheet->setCellValue('J' . $row, $cloth->lastoni ? 'هو' : 'نه');
            $sheet->setCellValue('K' . $row, $cloth->lastoni_goti ? 'هو' : 'نه');
            $sheet->setCellValue('L' . $row, $cloth->bin ? 'هو' : 'نه');
            $sheet->setCellValue('M' . $row, $cloth->bin_kat ? 'هو' : 'نه');
            $sheet->setCellValue('N' . $row, $cloth->makh_jib ? 'هو' : 'نه');
            $sheet->setCellValue('O' . $row, $cloth->tarikhzi ? 'هو' : 'نه');
            $sheet->setCellValue('P' . $row, $cloth->kalari ? 'هو' : 'نه');
            $sheet->setCellValue('Q' . $row, $cloth->shabazi ? 'هو' : 'نه');
            $sheet->setCellValue('R' . $row, $cloth->arabi ? 'هو' : 'نه');
            $sheet->setCellValue('S' . $row, $cloth->lemen ? 'هو' : 'نه');
            $sheet->setCellValue('T' . $row, $cloth->lastoni_2 ? 'هو' : 'نه');
            $sheet->setCellValue('U' . $row, $this->formatDate($cloth->rawrul_tareekh) ?: 'نامعلوم');
            $sheet->setCellValue('V' . $row, $this->formatDate($cloth->tasleem_tareekh) ?: 'نه دی تسلیم شوی');
            $sheet->setCellValue('W' . $row, $cloth->tidad ?: 1);
            $sheet->setCellValue('X' . $row, $cloth->money ?: 0);
            $row++;
        }

        // Style data rows
        $dataRange = 'A6:X' . ($row - 1);
        $sheet->getStyle($dataRange)->applyFromArray([
            'font' => ['size' => 11],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]]
        ]);

        // Auto-size columns
        foreach (range('A', 'X') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Create writer and return content
        $writer = new Xlsx($spreadsheet);
        ob_start();
        $writer->save('php://output');
        $content = ob_get_clean();

        return $content;
    }
    
    public function generateUniformsReport($uniforms, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $currentDate = date('Y-m-d H:i:s');
        $totalMoney = $uniforms->sum('money');
        $totalRecords = $uniforms->count();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('د درشي راپور');

        // Set RTL direction
        $sheet->setRightToLeft(true);

        // Header row
        $sheet->setCellValue('A1', 'د خیاطۍ مدیریت سیسټم - د درشي راپور - ' . $typeLabel);
        $this->applyTitleStyle($sheet, 'A1', 'A1:K1');

        // Info row
        $sheet->mergeCells('A3:K3');
        $sheet->setCellValue('A3', 'د تولید نیټه: ' . $currentDate . ' | ټول ریکارډونه: ' . $totalRecords . ' | ټولې پیسې: ' . number_format($totalMoney, 0) . ' افغانۍ');
        $sheet->getStyle('A3')->applyFromArray([
            'font' => ['size' => 12],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER]
        ]);

        // Column headers
        $headers = ['نوم', 'موبایل', 'یخن قک', 'پتلون', 'غاړه', 'زیګر', 'لستونی', 'د راوړلو نیټه', 'د تسلیمولو نیټه', 'تعداد', 'پیسې'];
        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . '5', $header);
            $col++;
        }

        $this->applyHeaderStyle($sheet, 'A5:K5');
        $sheet->getRowDimension(5)->setRowHeight(25);

        // Data rows
        $row = 6;
        foreach ($uniforms as $uniform) {
            $sheet->setCellValue('A' . $row, $uniform->nom ?: 'نامعلوم');
            $sheet->setCellValue('B' . $row, $uniform->mobile ?: 'نامعلوم');
            $sheet->setCellValue('C' . $row, $uniform->yakhun_qak ?: '-');
            $sheet->setCellValue('D' . $row, $uniform->patlun ?: '-');
            $sheet->setCellValue('E' . $row, $uniform->ghara ?: '-');
            $sheet->setCellValue('F' . $row, $uniform->zegar ?: '-');
            $sheet->setCellValue('G' . $row, $uniform->lstoony ?: '-');
            $sheet->setCellValue('H' . $row, $this->formatDate($uniform->rawrul_tareekh) ?: 'نامعلوم');
            $sheet->setCellValue('I' . $row, $this->formatDate($uniform->tasleem_tareekh) ?: 'نه دی تسلیم شوی');
            $sheet->setCellValue('J' . $row, $uniform->tidad ?: 1);
            $sheet->setCellValue('K' . $row, $uniform->money ?: 0);
            $row++;
        }

        // Style data rows
        $dataRange = 'A6:K' . ($row - 1);
        $sheet->getStyle($dataRange)->applyFromArray([
            'font' => ['size' => 11],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]]
        ]);

        // Auto-size columns
        foreach (range('A', 'K') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Create writer and return content
        $writer = new Xlsx($spreadsheet);
        ob_start();
        $writer->save('php://output');
        $content = ob_get_clean();

        return $content;
    }
    
    public function generateKortaisReport($kortais, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $currentDate = date('Y-m-d H:i:s');
        $totalMoney = $kortais->sum('money');
        $totalRecords = $kortais->count();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('د کورتۍ راپور');

        // Set RTL direction
        $sheet->setRightToLeft(true);

        // Header row
        $sheet->setCellValue('A1', 'د خیاطۍ مدیریت سیسټم - د کورتۍ راپور - ' . $typeLabel);
        $this->applyTitleStyle($sheet, 'A1', 'A1:L1');

        // Info row
        $sheet->mergeCells('A3:L3');
        $sheet->setCellValue('A3', 'د تولید نیټه: ' . $currentDate . ' | ټول ریکارډونه: ' . $totalRecords . ' | ټولې پیسې: ' . number_format($totalMoney, 0) . ' افغانۍ');
        $sheet->getStyle('A3')->applyFromArray([
            'font' => ['size' => 12],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER]
        ]);

        // Column headers
        $headers = ['نوم', 'موبایل', 'شانه', 'تینه', 'لستونی اوږد', 'لستونی بروالی', 'غاړه دول', 'زیګر', 'د راوړلو نیټه', 'د تسلیمولو نیټه', 'تعداد', 'پیسې'];
        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . '5', $header);
            $col++;
        }

        $this->applyHeaderStyle($sheet, 'A5:L5');
        $sheet->getRowDimension(5)->setRowHeight(25);

        // Data rows
        $row = 6;
        foreach ($kortais as $kortai) {
            $sheet->setCellValue('A' . $row, $kortai->nom ?: 'نامعلوم');
            $sheet->setCellValue('B' . $row, $kortai->mobile ?: 'نامعلوم');
            $sheet->setCellValue('C' . $row, $kortai->shana ?: '-');
            $sheet->setCellValue('D' . $row, $kortai->tenna ?: '-');
            $sheet->setCellValue('E' . $row, $kortai->lstoony_ojd ?: '-');
            $sheet->setCellValue('F' . $row, $kortai->lstoony_browali ?: '-');
            $sheet->setCellValue('G' . $row, $kortai->ghara_dol ?: '-');
            $sheet->setCellValue('H' . $row, $kortai->zegar ?: '-');
            $sheet->setCellValue('I' . $row, $this->formatDate($kortai->rawrul_tareekh) ?: 'نامعلوم');
            $sheet->setCellValue('J' . $row, $this->formatDate($kortai->tasleem_tareekh) ?: 'نه دی تسلیم شوی');
            $sheet->setCellValue('K' . $row, $kortai->tidad ?: 1);
            $sheet->setCellValue('L' . $row, $kortai->money ?: 0);
            $row++;
        }

        // Style data rows
        $dataRange = 'A6:L' . ($row - 1);
        $sheet->getStyle($dataRange)->applyFromArray([
            'font' => ['size' => 11],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]]
        ]);

        // Auto-size columns
        foreach (range('A', 'L') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Create writer and return content
        $writer = new Xlsx($spreadsheet);
        ob_start();
        $writer->save('php://output');
        $content = ob_get_clean();

        return $content;
    }
    
    public function generateSadraisReport($sadrais, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $currentDate = date('Y-m-d H:i:s');
        $totalMoney = $sadrais->sum('money');
        $totalRecords = $sadrais->count();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('د صدری راپور');

        // Set RTL direction
        $sheet->setRightToLeft(true);

        // Header row
        $sheet->setCellValue('A1', 'د خیاطۍ مدیریت سیسټم - د صدری راپور - ' . $typeLabel);
        $this->applyTitleStyle($sheet, 'A1', 'A1:J1');

        // Info row
        $sheet->mergeCells('A3:J3');
        $sheet->setCellValue('A3', 'د تولید نیټه: ' . $currentDate . ' | ټول ریکارډونه: ' . $totalRecords . ' | ټولې پیسې: ' . number_format($totalMoney, 0) . ' افغانۍ');
        $sheet->getStyle('A3')->applyFromArray([
            'font' => ['size' => 12],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER]
        ]);

        // Column headers
        $headers = ['نوم', 'موبایل', 'پیسې', 'شانه', 'تینه', 'غاړه دول', 'زیګر', 'تعداد', 'د راوړلو نیټه', 'د تسلیمولو نیټه'];
        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . '5', $header);
            $col++;
        }

        $this->applyHeaderStyle($sheet, 'A5:J5');
        $sheet->getRowDimension(5)->setRowHeight(25);

        // Data rows
        $row = 6;
        foreach ($sadrais as $sadrai) {
            $sheet->setCellValue('A' . $row, $sadrai->nom ?: 'نامعلوم');
            $sheet->setCellValue('B' . $row, $sadrai->mobile ?: 'نامعلوم');
            $sheet->setCellValue('C' . $row, $sadrai->money ?: 0);
            $sheet->setCellValue('D' . $row, $sadrai->shana ?: '-');
            $sheet->setCellValue('E' . $row, $sadrai->tenna ?: '-');
            $sheet->setCellValue('F' . $row, $sadrai->ghara_dol ?: '-');
            $sheet->setCellValue('G' . $row, $sadrai->zegar ?: '-');
            $sheet->setCellValue('H' . $row, $sadrai->tidad ?: 1);
            $sheet->setCellValue('I' . $row, $this->formatDate($sadrai->rawrul_tareekh) ?: 'نامعلوم');
            $sheet->setCellValue('J' . $row, $this->formatDate($sadrai->tasleem_tareekh) ?: 'نه دی تسلیم شوی');
            $row++;
        }

        // Style data rows
        $dataRange = 'A6:J' . ($row - 1);
        $sheet->getStyle($dataRange)->applyFromArray([
            'font' => ['size' => 11],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER, 'vertical' => Alignment::VERTICAL_CENTER],
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]]
        ]);

        // Auto-size columns
        foreach (range('A', 'J') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Create writer and return content
        $writer = new Xlsx($spreadsheet);
        ob_start();
        $writer->save('php://output');
        $content = ob_get_clean();

        return $content;
    }


    
    private function getTypeLabel($type)
    {
        switch ($type) {
            case 'total':
                return 'ټول ریکارډونه';
            case 'active':
                return 'فعال ریکارډونه';
            case 'disabled':
                return 'بشپړ شوي ریکارډونه';
            default:
                return 'راپور';
        }
    }
    
    private function formatDate($date)
    {
        if (!$date) {
            return '';
        }
        
        if ($date instanceof \Carbon\Carbon) {
            return $date->format('Y-m-d');
        }
        
        try {
            return \Carbon\Carbon::parse($date)->format('Y-m-d');
        } catch (\Exception) {
            return $date;
        }
    }

    /**
     * Apply standardized title styling to Excel reports
     */
    private function applyTitleStyle($sheet, $cellRange, $columnRange = 'A1:L1')
    {
        $sheet->mergeCells($columnRange);
        $sheet->getStyle($cellRange)->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 16,
                'color' => ['rgb' => 'FFFFFF']
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '5d5361']
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER
            ],
            'borders' => [
                'allBorders' => ['borderStyle' => Border::BORDER_THIN]
            ]
        ]);
        $sheet->getRowDimension(1)->setRowHeight(30);
    }

    /**
     * Apply standardized header styling to Excel reports
     */
    private function applyHeaderStyle($sheet, $cellRange)
    {
        $sheet->getStyle($cellRange)->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
                'color' => ['rgb' => 'FFFFFF']
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '374151']
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER
            ],
            'borders' => [
                'allBorders' => ['borderStyle' => Border::BORDER_THIN]
            ]
        ]);
    }
}
