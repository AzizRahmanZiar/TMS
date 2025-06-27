<?php

namespace App\Services;

use Mpdf\Mpdf;

class PdfReportService
{
    public function generateClothsReport($cloths, $type)
    {
        $html = $this->generateClothsHtml($cloths, $type);

        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4-L',
            'orientation' => 'L',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 10,
            'margin_bottom' => 10,
            'default_font' => 'dejavusans',
            'dir' => 'rtl',
            'default_font_size' => 12,
            'autoScriptToLang' => true,
            'autoLangToFont' => true
        ]);

        $mpdf->WriteHTML($html);
        return $mpdf;
    }

    public function generateUniformsReport($uniforms, $type)
    {
        $html = $this->generateUniformsHtml($uniforms, $type);

        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4-L',
            'orientation' => 'L',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 10,
            'margin_bottom' => 10,
            'default_font' => 'dejavusans',
            'dir' => 'rtl',
            'default_font_size' => 12,
            'autoScriptToLang' => true,
            'autoLangToFont' => true
        ]);

        $mpdf->WriteHTML($html);
        return $mpdf;
    }

    public function generateKortaisReport($kortais, $type)
    {
        $html = $this->generateKortaisHtml($kortais, $type);

        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4-L',
            'orientation' => 'L',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 10,
            'margin_bottom' => 10,
            'default_font' => 'dejavusans',
            'dir' => 'rtl',
            'default_font_size' => 12,
            'autoScriptToLang' => true,
            'autoLangToFont' => true
        ]);

        $mpdf->WriteHTML($html);
        return $mpdf;
    }

    public function generateSadraisReport($sadrais, $type)
    {
        $html = $this->generateSadraisHtml($sadrais, $type);

        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4-L',
            'orientation' => 'L',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 10,
            'margin_bottom' => 10,
            'default_font' => 'dejavusans',
            'dir' => 'rtl',
            'default_font_size' => 12,
            'autoScriptToLang' => true,
            'autoLangToFont' => true
        ]);

        $mpdf->WriteHTML($html);
        return $mpdf;
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
        } catch (\Exception) {
            return $date; // Return as is if parsing fails
        }
    }





    private function getBaseStyles()
    {
        return '
        <style>
            * {
                font-family: "DejaVu Sans", sans-serif !important;
            }
            body {
                font-family: "DejaVu Sans", sans-serif;
                direction: rtl;
                text-align: right;
                margin: 0;
                padding: 15px;
                font-size: 14px;
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
                background: #5d5361;
                color: white;
                padding: 15px;
                text-align: center;
                margin-bottom: 15px;
                border-radius: 5px;
            }
            .company-name {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 8px;
            }
            .report-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 6px;
            }
            .report-subtitle {
                font-size: 16px;
                margin-bottom: 6px;
            }
            .report-date {
                font-size: 14px;
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
                margin: 15px 0;
                font-size: 11px;
                direction: rtl;
                text-align: right;
            }
            th {
                background: #6d6354;
                color: white;
                padding: 10px 6px;
                text-align: center;
                font-weight: bold;
                font-size: 10px;
                border: 1px solid #4d463d;
                direction: rtl;
            }
            td {
                padding: 8px 5px;
                text-align: center;
                background-color: #ffffff;
                font-size: 10px;
                border: 1px solid #ddd;
                direction: rtl;
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
                background: linear-gradient(135deg, #b36447 0%, #954e3b 100%);
                color: white;
                padding: 15px;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                text-align: center;
                flex: 1;
                box-shadow: 0 4px 15px rgba(179, 100, 71, 0.3);
            }
            .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: white;
                margin-bottom: 8px;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
            }
            .stat-label {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.9);
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
                color: #6d6354;
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

        $html = '<!DOCTYPE html><html dir="rtl" lang="ps"><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $html .= $this->getBaseStyles();
        $html .= '</head><body dir="rtl">';

        $html .= '<div class="report-container">';
        $html .= '<div class="header">';
        $html .= '<div class="header-content">';
        $html .= '<div class="company-name">د خیاطۍ مدیریت سیسټم</div>';
        $html .= '<div class="report-title">د جامو راپور</div>';
        $html .= '<div class="report-subtitle">' . htmlspecialchars($typeLabel) . '</div>';
        $html .= '<div class="report-date">د تولید نیټه: ' . $date . '</div>';
        $html .= '</div>';
        $html .= '</div>';

        $html .= '<div class="content-section">';
        $html .= '<div class="table-container">';
        $html .= '<table>';
        $html .= '<thead><tr>';
        $html .= '<th>نوم</th><th>موبایل</th><th>قد</th><th>شانه</th><th>غاړه</th><th>زیګر</th>';
        $html .= '<th>لستونی</th><th>پرتوګ</th><th>پای څه</th><th>لستوڼي</th><th>لستوڼي غوټۍ</th>';
        $html .= '<th>بین</th><th>بین کاټ</th><th>د مخ جیب</th><th>ترخزي</th><th>کالري</th>';
        $html .= '<th>شبازي</th><th>عربي</th><th>لمن</th><th>لستوڼي ۲</th>';
        $html .= '<th>د راوړلو نیټه</th><th>د تسلیمولو نیټه</th><th>تعداد</th><th>پیسې</th>';
        $html .= '</tr></thead><tbody>';

        foreach ($cloths as $cloth) {
            $html .= '<tr>';
            $html .= '<td>' . htmlspecialchars($cloth->nom ?: 'نامعلوم') . '</td>';
            $html .= '<td>' . htmlspecialchars($cloth->mobile ?: 'نامعلوم') . '</td>';
            $html .= '<td>' . ($cloth->qadd ?: '-') . '</td>';
            $html .= '<td>' . ($cloth->shana ?: '-') . '</td>';
            $html .= '<td>' . ($cloth->ghara ?: '-') . '</td>';
            $html .= '<td>' . ($cloth->zegar ?: '-') . '</td>';
            $html .= '<td>' . ($cloth->lstoony ?: '-') . '</td>';
            $html .= '<td>' . ($cloth->partog ?: '-') . '</td>';
            $html .= '<td>' . ($cloth->pai_tsa ?: '-') . '</td>';
            $html .= '<td>' . ($cloth->lastoni ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->lastoni_goti ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->bin ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->bin_kat ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->makh_jib ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->tarikhzi ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->kalari ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->shabazi ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->arabi ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->lemen ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($cloth->lastoni_2 ? 'هو' : 'نه') . '</td>';
            $html .= '<td>' . ($this->formatDate($cloth->rawrul_tareekh) ?: 'نامعلوم') . '</td>';
            $html .= '<td>' . ($this->formatDate($cloth->tasleem_tareekh) ?: 'نه دی تسلیم شوی') . '</td>';
            $html .= '<td>' . ($cloth->tidad ?: 1) . '</td>';
            $html .= '<td>' . number_format($cloth->money ?: 0, 0) . '</td>';
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

        $html = '<!DOCTYPE html><html dir="rtl" lang="ps"><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $html .= $this->getBaseStyles();
        $html .= '</head><body dir="rtl">';

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
            $html .= '<td>' . ($this->formatDate($uniform->rawrul_tareekh) ?: 'نامعلوم') . '</td>';
            $html .= '<td>' . ($this->formatDate($uniform->tasleem_tareekh) ?: 'نه دی تسلیم شوی') . '</td>';
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

        $html = '<!DOCTYPE html><html dir="rtl" lang="ps"><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $html .= $this->getBaseStyles();
        $html .= '</head><body dir="rtl">';

        $html .= '<div class="report-container">';
        $html .= '<div class="header">';
        $html .= '<div class="header-content">';
        $html .= '<div class="company-name">د خیاطۍ مدیریت سیسټم</div>';
        $html .= '<div class="report-title">د کورتۍ راپور</div>';
        $html .= '<div class="report-subtitle">' . htmlspecialchars($typeLabel) . '</div>';
        $html .= '<div class="report-date">د تولید نیټه: ' . $date . '</div>';
        $html .= '</div>';
        $html .= '</div>';

        $html .= '<div class="summary-stats">';
        $html .= '<div class="stat-item"><span class="stat-label">ټول ریکارډونه:</span> <span class="stat-value">' . $count . '</span></div>';
        $html .= '<div class="stat-item"><span class="stat-label">ټولې پیسې:</span> <span class="stat-value">' . number_format($totalMoney) . ' افغانۍ</span></div>';
        $html .= '</div>';

        $html .= '<table class="data-table">';
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
            $html .= '<td>' . ($this->formatDate($kortai->rawrul_tareekh) ?: 'نامعلوم') . '</td>';
            $html .= '<td>' . ($this->formatDate($kortai->tasleem_tareekh) ?: 'نه دی تسلیم شوی') . '</td>';
            $html .= '<td>' . $kortai->tidad . '</td>';
            $html .= '<td>' . number_format($kortai->money, 2) . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody></table>';
        $html .= '</div>'; // Close report-container
        $html .= '</body></html>';

        return $html;
    }

    private function generateSadraisHtml($sadrais, $type)
    {
        $typeLabel = $this->getTypeLabel($type);
        $count = $sadrais->count();
        $totalMoney = $sadrais->sum('money');
        $date = date('Y-m-d H:i:s');

        $html = '<!DOCTYPE html><html dir="rtl" lang="ps"><head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
        $html .= $this->getBaseStyles();
        $html .= '</head><body dir="rtl">';

        $html .= '<div class="report-container">';
        $html .= '<div class="header">';
        $html .= '<div class="header-content">';
        $html .= '<div class="company-name">د خیاطۍ مدیریت سیسټم</div>';
        $html .= '<div class="report-title">د صدری راپور</div>';
        $html .= '<div class="report-subtitle">' . htmlspecialchars($typeLabel) . '</div>';
        $html .= '<div class="report-date">د تولید نیټه: ' . $date . '</div>';
        $html .= '</div>';
        $html .= '</div>';

        $html .= '<div class="summary-stats">';
        $html .= '<div class="stat-item"><span class="stat-label">ټول ریکارډونه:</span> <span class="stat-value">' . $count . '</span></div>';
        $html .= '<div class="stat-item"><span class="stat-label">ټولې پیسې:</span> <span class="stat-value">' . number_format($totalMoney) . ' افغانۍ</span></div>';
        $html .= '</div>';

        $html .= '<table class="data-table">';
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
            $html .= '<td>' . ($this->formatDate($sadrai->rawrul_tareekh) ?: 'نامعلوم') . '</td>';
            $html .= '<td>' . ($this->formatDate($sadrai->tasleem_tareekh) ?: 'نه دی تسلیم شوی') . '</td>';
            $html .= '</tr>';
        }

        $html .= '</tbody></table>';
        $html .= '</div>'; // Close report-container
        $html .= '</body></html>';

        return $html;
    }
}
