<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;

class PdfReportService
{
    public function generateClothsReport($cloths, $type)
    {
        $html = $this->generateClothsHtml($cloths, $type);
        return Pdf::loadHTML($html)->setPaper('a4', 'landscape');
    }

    public function generateUniformsReport($uniforms, $type)
    {
        $html = $this->generateUniformsHtml($uniforms, $type);
        return Pdf::loadHTML($html)->setPaper('a4', 'landscape');
    }

    public function generateKortaisReport($kortais, $type)
    {
        $html = $this->generateKortaisHtml($kortais, $type);
        return Pdf::loadHTML($html)->setPaper('a4', 'landscape');
    }

    public function generateSadraisReport($sadrais, $type)
    {
        $html = $this->generateSadraisHtml($sadrais, $type);
        return Pdf::loadHTML($html)->setPaper('a4', 'landscape');
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

        // If it's already a Carbon instance
        if ($date instanceof \Carbon\Carbon) {
            return $date->format('Y-m-d');
        }

        // If it's a string, try to parse it
        try {
            return \Carbon\Carbon::parse($date)->format('Y-m-d');
        } catch (\Exception $e) {
            return $date; // Return as is if parsing fails
        }
    }

    private function getBaseStyles()
    {
        return '
        <style>
            @page {
                margin: 15mm;
                size: A4 landscape;
            }
            body {
                font-family: "DejaVu Sans", "Arial Unicode MS", sans-serif;
                direction: rtl;
                text-align: right;
                margin: 0;
                padding: 0;
                font-size: 12px;
                line-height: 1.4;
                color: #333;
                background: #fff;
            }
            .report-container {
                max-width: 100%;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            }
            .header {
                background: #4F46E5;
                color: white;
                padding: 25px;
                text-align: center;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .header-content {
                position: relative;
                z-index: 1;
            }
            .company-name {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 8px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                letter-spacing: 1px;
            }
            .report-title {
                font-size: 22px;
                font-weight: 600;
                margin-bottom: 12px;
                opacity: 0.95;
            }
            .report-subtitle {
                font-size: 16px;
                margin-bottom: 8px;
                opacity: 0.9;
                background: rgba(255,255,255,0.2);
                padding: 8px 16px;
                border-radius: 20px;
                display: inline-block;
            }
            .report-date {
                font-size: 14px;
                opacity: 0.8;
                margin-top: 10px;
            }
            .content-section {
                padding: 30px;
                background: #fafbfc;
            }
            .table-container {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                border: 1px solid #e1e8ed;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 0;
                font-size: 11px;
            }
            th {
                background: #4f46e5;
                color: white;
                padding: 12px 8px;
                text-align: center;
                font-weight: bold;
                font-size: 12px;
                direction: rtl;
                border: 1px solid #333;
            }
            td {
                padding: 14px 12px;
                text-align: center;
                background-color: #ffffff;
                direction: rtl;
                font-size: 11px;
                border-bottom: 1px solid #f1f5f9;
                transition: background-color 0.2s ease;
            }
            tr:nth-child(even) td {
                background-color: #f8fafc;
            }
            tr:hover td {
                background-color: #e0f2fe;
            }
            .footer {
                background: #f8fafc;
                padding: 20px;
                border-top: 2px solid #e2e8f0;
                margin-top: 20px;
            }
            .stats-container {
                display: flex;
                justify-content: space-around;
                margin-bottom: 15px;
                gap: 15px;
            }
            .stat-card {
                background: white;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                text-align: center;
                flex: 1;
            }
            .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #1e293b;
                margin-bottom: 8px;
            }
            .stat-label {
                font-size: 14px;
                color: #64748b;
                font-weight: 600;
            }
            .generation-info {
                text-align: center;
                color: #64748b;
                font-size: 12px;
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid #e2e8f0;
            }
            .watermark {
                position: fixed;
                bottom: 20px;
                right: 20px;
                opacity: 0.1;
                font-size: 24px;
                color: #4f46e5;
                z-index: -1;
            }
        </style>';
    }

    private function generateClothsHtml($cloths, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $count = $cloths->count();
        $totalMoney = $cloths->sum('money');
        $date = date('Y-m-d H:i:s');

        $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $html .= $this->getBaseStyles();
        $html .= '</head><body>';

        $html .= '<div class="report-container">';
        $html .= '<div class="header">';
        $html .= '<div class="header-content">';
        $html .= '<div class="company-name">د خیاطۍ مدیریت سیسټم</div>';
        $html .= '<div class="report-title">د جامو راپور</div>';
        $html .= '<div class="report-subtitle">' . $typeLabel . '</div>';
        $html .= '<div class="report-date">د تولید نیټه: ' . $date . '</div>';
        $html .= '</div>';
        $html .= '</div>';

        $html .= '<div class="content-section">';
        $html .= '<div class="table-container">';
        $html .= '<table>';
        $html .= '<thead><tr>';
        $html .= '<th>نوم</th><th>موبایل</th><th>قد</th><th>شانه</th><th>غاړه</th><th>زیګر</th>';
        $html .= '<th>لستونی</th><th>پرتوګ</th><th>پای څه</th><th>د راوړلو نیټه</th>';
        $html .= '<th>د تسلیمولو نیټه</th><th>تعداد</th><th>پیسې</th>';
        $html .= '</tr></thead><tbody>';

        foreach ($cloths as $cloth) {
            $html .= '<tr>';
            $html .= '<td>' . htmlspecialchars($cloth->nom) . '</td>';
            $html .= '<td>' . htmlspecialchars($cloth->mobile) . '</td>';
            $html .= '<td>' . $cloth->qadd . '</td>';
            $html .= '<td>' . $cloth->shana . '</td>';
            $html .= '<td>' . $cloth->ghara . '</td>';
            $html .= '<td>' . $cloth->zegar . '</td>';
            $html .= '<td>' . $cloth->lstoony . '</td>';
            $html .= '<td>' . $cloth->partog . '</td>';
            $html .= '<td>' . $cloth->pai_tsa . '</td>';
            $html .= '<td>' . $this->formatDate($cloth->rawrul_tareekh) . '</td>';
            $html .= '<td>' . $this->formatDate($cloth->tasleem_tareekh) . '</td>';
            $html .= '<td>' . $cloth->tidad . '</td>';
            $html .= '<td>' . number_format($cloth->money, 2) . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody></table>';
        $html .= '</div>'; // table-container
        $html .= '</div>'; // content-section

        $html .= '<div class="footer">';
        $html .= '<div class="stats-container">';
        $html .= '<div class="stat-card">';
        $html .= '<div class="stat-value">' . $count . '</div>';
        $html .= '<div class="stat-label">ټول ریکارډونه</div>';
        $html .= '</div>';
        $html .= '<div class="stat-card">';
        $html .= '<div class="stat-value">' . number_format($totalMoney, 0) . '</div>';
        $html .= '<div class="stat-label">ټولې پیسې (افغانۍ)</div>';
        $html .= '</div>';
        $html .= '</div>';
        $html .= '<div class="generation-info">';
        $html .= '<p>دا راپور د ' . $date . ' نیټې په اتوماتیک ډول تولید شوی</p>';
        $html .= '</div>';
        $html .= '</div>';

        $html .= '</div>'; // report-container
        $html .= '<div class="watermark">TMS</div>';
        $html .= '</body></html>';

        return $html;
    }

    private function generateUniformsHtml($uniforms, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $count = $uniforms->count();
        $totalMoney = $uniforms->sum('money');
        $date = date('Y-m-d H:i:s');

        $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $html .= $this->getBaseStyles();
        $html .= '</head><body>';

        $html .= '<div class="report-container">';
        $html .= '<div class="header">';
        $html .= '<div class="header-content">';
        $html .= '<div class="company-name">د خیاطۍ مدیریت سیسټم</div>';
        $html .= '<div class="report-title">د درشي راپور</div>';
        $html .= '<div class="report-subtitle">' . $typeLabel . '</div>';
        $html .= '<div class="report-date">د تولید نیټه: ' . $date . '</div>';
        $html .= '</div>';
        $html .= '</div>';

        $html .= '<div class="content-section">';
        $html .= '<div class="table-container">';

        $html .= '<table>';
        $html .= '<thead><tr>';
        $html .= '<th>نوم</th><th>موبایل</th><th>یخن قک</th><th>پتلون</th><th>غاړه</th><th>زیګر</th>';
        $html .= '<th>لستونی</th><th>د راوړلو نیټه</th><th>د تسلیمولو نیټه</th><th>تعداد</th><th>پیسې</th>';
        $html .= '</tr></thead><tbody>';

        foreach ($uniforms as $uniform) {
            $html .= '<tr>';
            $html .= '<td>' . htmlspecialchars($uniform->nom) . '</td>';
            $html .= '<td>' . htmlspecialchars($uniform->mobile) . '</td>';
            $html .= '<td>' . $uniform->yakhun_qak . '</td>';
            $html .= '<td>' . $uniform->patlun . '</td>';
            $html .= '<td>' . $uniform->ghara . '</td>';
            $html .= '<td>' . $uniform->zegar . '</td>';
            $html .= '<td>' . $uniform->lstoony . '</td>';
            $html .= '<td>' . $this->formatDate($uniform->rawrul_tareekh) . '</td>';
            $html .= '<td>' . $this->formatDate($uniform->tasleem_tareekh) . '</td>';
            $html .= '<td>' . $uniform->tidad . '</td>';
            $html .= '<td>' . number_format($uniform->money, 2) . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody></table>';
        $html .= '</div>'; // table-container
        $html .= '</div>'; // content-section

        $html .= '<div class="footer">';
        $html .= '<div class="stats-container">';
        $html .= '<div class="stat-card">';
        $html .= '<div class="stat-value">' . $count . '</div>';
        $html .= '<div class="stat-label">ټول ریکارډونه</div>';
        $html .= '</div>';
        $html .= '<div class="stat-card">';
        $html .= '<div class="stat-value">' . number_format($totalMoney, 0) . '</div>';
        $html .= '<div class="stat-label">ټولې پیسې (افغانۍ)</div>';
        $html .= '</div>';
        $html .= '</div>';
        $html .= '<div class="generation-info">';
        $html .= '<p>دا راپور د ' . $date . ' نیټې په اتوماتیک ډول تولید شوی</p>';
        $html .= '</div>';
        $html .= '</div>';

        $html .= '</div>'; // report-container
        $html .= '<div class="watermark">TMS</div>';
        $html .= '</body></html>';

        return $html;
    }

    private function generateKortaisHtml($kortais, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $count = $kortais->count();
        $totalMoney = $kortais->sum('money');
        $date = date('Y-m-d H:i:s');

        $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $html .= $this->getBaseStyles();
        $html .= '</head><body>';
        
        $html .= '<div class="header">';
        $html .= '<div class="title">د کورتۍ راپور</div>';
        $html .= '<div class="subtitle">' . $typeLabel . '</div>';
        $html .= '<div class="subtitle">نیټه: ' . $date . '</div>';
        $html .= '</div>';

        $html .= '<table>';
        $html .= '<thead><tr>';
        $html .= '<th>نوم</th><th>موبایل</th><th>شانه</th><th>تینه</th><th>لستونی اوږد</th><th>لستونی بروالی</th>';
        $html .= '<th>غاړه دول</th><th>زیګر</th><th>د راوړلو نیټه</th><th>د تسلیمولو نیټه</th><th>تعداد</th><th>پیسې</th>';
        $html .= '</tr></thead><tbody>';

        foreach ($kortais as $kortai) {
            $html .= '<tr>';
            $html .= '<td>' . htmlspecialchars($kortai->nom) . '</td>';
            $html .= '<td>' . htmlspecialchars($kortai->mobile) . '</td>';
            $html .= '<td>' . $kortai->shana . '</td>';
            $html .= '<td>' . $kortai->tenna . '</td>';
            $html .= '<td>' . $kortai->lstoony_ojd . '</td>';
            $html .= '<td>' . $kortai->lstoony_browali . '</td>';
            $html .= '<td>' . $kortai->ghara_dol . '</td>';
            $html .= '<td>' . $kortai->zegar . '</td>';
            $html .= '<td>' . $this->formatDate($kortai->rawrul_tareekh) . '</td>';
            $html .= '<td>' . $this->formatDate($kortai->tasleem_tareekh) . '</td>';
            $html .= '<td>' . $kortai->tidad . '</td>';
            $html .= '<td>' . number_format($kortai->money, 2) . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody></table>';
        
        $html .= '<div class="footer">';
        $html .= '<div class="stats">';
        $html .= '<div class="stat-item"><strong>ټول ریکارډونه: ' . $count . '</strong></div>';
        $html .= '<div class="stat-item"><strong>ټولې پیسې: ' . number_format($totalMoney, 2) . '</strong></div>';
        $html .= '</div>';
        $html .= '<p>د جوړولو نیټه: ' . $date . '</p>';
        $html .= '</div>';
        
        $html .= '</body></html>';

        return $html;
    }

    private function generateSadraisHtml($sadrais, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $count = $sadrais->count();
        $totalMoney = $sadrais->sum('money');
        $date = date('Y-m-d H:i:s');

        $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $html .= $this->getBaseStyles();
        $html .= '</head><body>';
        
        $html .= '<div class="header">';
        $html .= '<div class="title">د صدری راپور</div>';
        $html .= '<div class="subtitle">' . $typeLabel . '</div>';
        $html .= '<div class="subtitle">نیټه: ' . $date . '</div>';
        $html .= '</div>';

        $html .= '<table>';
        $html .= '<thead><tr>';
        $html .= '<th>نوم</th><th>موبایل</th><th>پیسې</th><th>شانه</th><th>تینه</th><th>غاړه دول</th>';
        $html .= '<th>زیګر</th><th>تعداد</th><th>د راوړلو نیټه</th><th>د تسلیمولو نیټه</th>';
        $html .= '</tr></thead><tbody>';

        foreach ($sadrais as $sadrai) {
            $html .= '<tr>';
            $html .= '<td>' . htmlspecialchars($sadrai->nom) . '</td>';
            $html .= '<td>' . htmlspecialchars($sadrai->mobile) . '</td>';
            $html .= '<td>' . number_format($sadrai->money, 2) . '</td>';
            $html .= '<td>' . $sadrai->shana . '</td>';
            $html .= '<td>' . $sadrai->tenna . '</td>';
            $html .= '<td>' . $sadrai->ghara_dol . '</td>';
            $html .= '<td>' . $sadrai->zegar . '</td>';
            $html .= '<td>' . $sadrai->tidad . '</td>';
            $html .= '<td>' . $this->formatDate($sadrai->rawrul_tareekh) . '</td>';
            $html .= '<td>' . $this->formatDate($sadrai->tasleem_tareekh) . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody></table>';
        
        $html .= '<div class="footer">';
        $html .= '<div class="stats">';
        $html .= '<div class="stat-item"><strong>ټول ریکارډونه: ' . $count . '</strong></div>';
        $html .= '<div class="stat-item"><strong>ټولې پیسې: ' . number_format($totalMoney, 2) . '</strong></div>';
        $html .= '</div>';
        $html .= '<p>د جوړولو نیټه: ' . $date . '</p>';
        $html .= '</div>';
        
        $html .= '</body></html>';

        return $html;
    }
}
