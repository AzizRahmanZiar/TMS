<?php

namespace App\Services;

class ExcelReportService
{
    public function generateClothsReport($cloths, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $currentDate = date('Y-m-d H:i:s');
        $totalMoney = $cloths->sum('money');
        $totalRecords = $cloths->count();

        // Create Excel XML format
        $excel = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $excel .= '<?mso-application progid="Excel.Sheet"?>' . "\n";
        $excel .= '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"' . "\n";
        $excel .= ' xmlns:o="urn:schemas-microsoft-com:office:office"' . "\n";
        $excel .= ' xmlns:x="urn:schemas-microsoft-com:office:excel"' . "\n";
        $excel .= ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"' . "\n";
        $excel .= ' xmlns:html="http://www.w3.org/TR/REC-html40">' . "\n";

        // Styles
        $excel .= '<Styles>' . "\n";

        // Header style
        $excel .= '<Style ss:ID="HeaderStyle">' . "\n";
        $excel .= '<Font ss:Bold="1" ss:Size="16" ss:Color="#FFFFFF"/>' . "\n";
        $excel .= '<Interior ss:Color="#4F46E5" ss:Pattern="Solid"/>' . "\n";
        $excel .= '<Alignment ss:Horizontal="Center" ss:Vertical="Center"/>' . "\n";
        $excel .= '<Borders>' . "\n";
        $excel .= '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '</Borders>' . "\n";
        $excel .= '</Style>' . "\n";

        // Column header style
        $excel .= '<Style ss:ID="ColumnHeaderStyle">' . "\n";
        $excel .= '<Font ss:Bold="1" ss:Size="12" ss:Color="#FFFFFF"/>' . "\n";
        $excel .= '<Interior ss:Color="#7C3AED" ss:Pattern="Solid"/>' . "\n";
        $excel .= '<Alignment ss:Horizontal="Center" ss:Vertical="Center"/>' . "\n";
        $excel .= '<Borders>' . "\n";
        $excel .= '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '</Borders>' . "\n";
        $excel .= '</Style>' . "\n";

        // Data style
        $excel .= '<Style ss:ID="DataStyle">' . "\n";
        $excel .= '<Font ss:Size="11"/>' . "\n";
        $excel .= '<Alignment ss:Horizontal="Center" ss:Vertical="Center"/>' . "\n";
        $excel .= '<Borders>' . "\n";
        $excel .= '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>' . "\n";
        $excel .= '</Borders>' . "\n";
        $excel .= '</Style>' . "\n";

        $excel .= '</Styles>' . "\n";

        // Worksheet
        $excel .= '<Worksheet ss:Name="د جامو راپور">' . "\n";
        $excel .= '<Table>' . "\n";

        // Header row
        $excel .= '<Row ss:Height="30">' . "\n";
        $excel .= '<Cell ss:MergeAcross="12" ss:StyleID="HeaderStyle">' . "\n";
        $excel .= '<Data ss:Type="String">د خیاطۍ مدیریت سیسټم - ' . htmlspecialchars($typeLabel) . '</Data>' . "\n";
        $excel .= '</Cell>' . "\n";
        $excel .= '</Row>' . "\n";

        // Empty row
        $excel .= '<Row/>' . "\n";

        // Info row
        $excel .= '<Row>' . "\n";
        $excel .= '<Cell ss:MergeAcross="12">' . "\n";
        $excel .= '<Data ss:Type="String">د تولید نیټه: ' . htmlspecialchars($currentDate) . ' | ټول ریکارډونه: ' . $totalRecords . ' | ټولې پیسې: ' . number_format($totalMoney, 0) . ' افغانۍ</Data>' . "\n";
        $excel .= '</Cell>' . "\n";
        $excel .= '</Row>' . "\n";

        // Empty row
        $excel .= '<Row/>' . "\n";

        // Column headers
        $excel .= '<Row ss:Height="25">' . "\n";
        $headers = ['نوم', 'موبایل', 'قد', 'شانه', 'غاړه', 'زیګر', 'لستونی', 'پرتوګ', 'پای څه', 'د راوړلو نیټه', 'د تسلیمولو نیټه', 'تعداد', 'پیسې'];
        foreach ($headers as $header) {
            $excel .= '<Cell ss:StyleID="ColumnHeaderStyle">' . "\n";
            $excel .= '<Data ss:Type="String">' . htmlspecialchars($header) . '</Data>' . "\n";
            $excel .= '</Cell>' . "\n";
        }
        $excel .= '</Row>' . "\n";

        // Data rows
        foreach ($cloths as $cloth) {
            $excel .= '<Row>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($cloth->nom ?: 'نامعلوم') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($cloth->mobile ?: 'نامعلوم') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($cloth->qadd ?: '-') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($cloth->shana ?: '-') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($cloth->ghara ?: '-') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($cloth->zegar ?: '-') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($cloth->lstoony ?: '-') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($cloth->partog ?: '-') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($cloth->pai_tsa ?: '-') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($this->formatDate($cloth->rawrul_tareekh) ?: 'نامعلوم') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="String">' . htmlspecialchars($this->formatDate($cloth->tasleem_tareekh) ?: 'نه دی تسلیم شوی') . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="Number">' . ($cloth->tidad ?: 1) . '</Data></Cell>' . "\n";
            $excel .= '<Cell ss:StyleID="DataStyle"><Data ss:Type="Number">' . ($cloth->money ?: 0) . '</Data></Cell>' . "\n";
            $excel .= '</Row>' . "\n";
        }

        $excel .= '</Table>' . "\n";
        $excel .= '</Worksheet>' . "\n";
        $excel .= '</Workbook>';

        return $excel;
    }
    
    public function generateUniformsReport($uniforms, $type)
    {
        $typeLabel = $this->getTypeLabel($type);

        // Create CSV content
        $csvData = [];

        // Add header
        $csvData[] = ['د درشي راپور - ' . $typeLabel];
        $csvData[] = []; // Empty row

        // Add column headers
        $csvData[] = [
            'نوم', 'موبایل', 'یخن قک', 'پتلون', 'غاړه', 'زیګر', 'لستونی',
            'د راوړلو نیټه', 'د تسلیمولو نیټه', 'تعداد', 'پیسې'
        ];

        // Add data
        foreach ($uniforms as $uniform) {
            $csvData[] = [
                $uniform->nom,
                $uniform->mobile,
                $uniform->yakhun_qak,
                $uniform->patlun,
                $uniform->ghara,
                $uniform->zegar,
                $uniform->lstoony,
                $this->formatDate($uniform->rawrul_tareekh),
                $this->formatDate($uniform->tasleem_tareekh),
                $uniform->tidad,
                $uniform->money
            ];
        }

        // Add summary
        $csvData[] = []; // Empty row
        $csvData[] = ['ټول ریکارډونه: ' . $uniforms->count()];
        $csvData[] = ['ټولې پیسې: ' . number_format($uniforms->sum('money'), 2)];

        return $this->arrayToCsv($csvData);
    }
    
    public function generateKortaisReport($kortais, $type)
    {
        $typeLabel = $this->getTypeLabel($type);

        // Create CSV content
        $csvData = [];

        // Add header
        $csvData[] = ['د کورتۍ راپور - ' . $typeLabel];
        $csvData[] = []; // Empty row

        // Add column headers
        $csvData[] = [
            'نوم', 'موبایل', 'شانه', 'تینه', 'لستونی اوږد', 'لستونی بروالی',
            'غاړه دول', 'زیګر', 'د راوړلو نیټه', 'د تسلیمولو نیټه', 'تعداد', 'پیسې'
        ];

        // Add data
        foreach ($kortais as $kortai) {
            $csvData[] = [
                $kortai->nom,
                $kortai->mobile,
                $kortai->shana,
                $kortai->tenna,
                $kortai->lstoony_ojd,
                $kortai->lstoony_browali,
                $kortai->ghara_dol,
                $kortai->zegar,
                $this->formatDate($kortai->rawrul_tareekh),
                $this->formatDate($kortai->tasleem_tareekh),
                $kortai->tidad,
                $kortai->money
            ];
        }

        // Add summary
        $csvData[] = []; // Empty row
        $csvData[] = ['ټول ریکارډونه: ' . $kortais->count()];
        $csvData[] = ['ټولې پیسې: ' . number_format($kortais->sum('money'), 2)];

        return $this->arrayToCsv($csvData);
    }
    
    public function generateSadraisReport($sadrais, $type)
    {
        $typeLabel = $this->getTypeLabel($type);

        // Create CSV content
        $csvData = [];

        // Add header
        $csvData[] = ['د صدری راپور - ' . $typeLabel];
        $csvData[] = []; // Empty row

        // Add column headers
        $csvData[] = [
            'نوم', 'موبایل', 'پیسې', 'شانه', 'تینه', 'غاړه دول',
            'زیګر', 'تعداد', 'د راوړلو نیټه', 'د تسلیمولو نیټه'
        ];

        // Add data
        foreach ($sadrais as $sadrai) {
            $csvData[] = [
                $sadrai->nom,
                $sadrai->mobile,
                $sadrai->money,
                $sadrai->shana,
                $sadrai->tenna,
                $sadrai->ghara_dol,
                $sadrai->zegar,
                $sadrai->tidad,
                $this->formatDate($sadrai->rawrul_tareekh),
                $this->formatDate($sadrai->tasleem_tareekh)
            ];
        }

        // Add summary
        $csvData[] = []; // Empty row
        $csvData[] = ['ټول ریکارډونه: ' . $sadrais->count()];
        $csvData[] = ['ټولې پیسې: ' . number_format($sadrais->sum('money'), 2)];

        return $this->arrayToCsv($csvData);
    }

    private function arrayToCsv($data)
    {
        $output = fopen('php://temp', 'r+');

        // Add UTF-8 BOM for proper encoding in Excel
        fwrite($output, "\xEF\xBB\xBF");

        foreach ($data as $row) {
            // Ensure all values are UTF-8 encoded
            $encodedRow = array_map(function($value) {
                return mb_convert_encoding($value, 'UTF-8', 'auto');
            }, $row);

            fputcsv($output, $encodedRow);
        }

        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return $csv;
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
        } catch (\Exception $e) {
            return $date;
        }
    }
}
