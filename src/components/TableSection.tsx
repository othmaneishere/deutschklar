import React from 'react';
import { Table as TableIcon } from 'lucide-react';
import { ContentSection, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';

interface TableSectionProps {
  section: ContentSection;
  languageMode: LanguageMode;
  showTranslations: boolean;
  isCompact?: boolean;
}

export const TableSection: React.FC<TableSectionProps> = ({
  section,
  languageMode,
}) => {
  const data = section.tableData;
  if (!data) return null;

  const headers =
    data.headersDe && data.headersAr && data.headersEn && data.headersFr
      ? languageMode === 'none'
        ? data.headersDe
        : languageMode === 'ar'
        ? data.headersAr
        : languageMode === 'en'
        ? data.headersEn
        : data.headersFr
      : data.headers || data.headersDe || [];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden" id="section-tables">
      {/* Table Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
            <TableIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-tight">
              {section.titleDe}
            </h3>
            {languageMode !== 'none' && (
              <p
                className={`text-xs sm:text-sm text-slate-500 mt-0.5 ${
                  languageMode === 'ar' ? 'font-arabic text-slate-700 font-medium' : ''
                }`}
                dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
              >
                {languageMode === 'ar' && section.titleAr}
                {languageMode === 'en' && section.titleEn}
                {languageMode === 'fr' && section.titleFr}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Table Grid with generous cell padding */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-xs">
              {headers.map((h, i) => (
                <th key={i} className="px-6 py-3.5 whitespace-nowrap font-mono text-xs uppercase tracking-wider">
                  {h}
                </th>
              ))}
              <th className="px-6 py-3.5 text-right font-mono text-xs uppercase tracking-wider">Audio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.rows.map((row, rIdx) => {
              const isArray = Array.isArray(row);
              const displayCells: string[] = isArray
                ? row
                : languageMode === 'none'
                ? row.de
                : languageMode === 'ar'
                ? row.ar || row.de
                : languageMode === 'en'
                ? row.en || row.de
                : row.fr || row.de;

              const audioText = isArray
                ? row[1] || row[0] || ''
                : row.de[1] || row.de[0] || '';

              return (
                <tr
                  key={rIdx}
                  className="hover:bg-amber-50/40 transition-colors group"
                >
                  {displayCells.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`px-6 py-4 whitespace-nowrap ${
                        cIdx === 0
                          ? 'font-bold text-slate-900 text-base'
                          : 'text-slate-700 font-medium text-sm'
                      } ${languageMode === 'ar' ? 'font-arabic' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <AudioButton text={audioText} size="sm" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
