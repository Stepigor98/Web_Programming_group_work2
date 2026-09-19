import React from 'react';
import { Printer, ArrowLeft, Download, FileText } from 'lucide-react';
import { POEM_LINES, POEM_METADATA } from '../data/poemData';

interface PrintModeViewProps {
  onClose: () => void;
  showLineNumbers: boolean;
}

export const PrintModeView: React.FC<PrintModeViewProps> = ({
  onClose,
  showLineNumbers,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 py-6 sm:py-10 px-4 font-serif-folio selection:bg-amber-100">
      {/* Print Control Toolbar (hidden on paper print) */}
      <div className="no-print max-w-2xl mx-auto mb-8 bg-white/95 backdrop-blur border border-neutral-300 rounded-xl p-3 shadow-md flex items-center justify-between gap-3 sticky top-4 z-40">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans-ui font-medium rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Print View</span>
        </button>

        <div className="text-xs font-sans-ui text-neutral-500 font-medium hidden sm:block">
          Folio Print Preview Edition
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-sans-ui font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print or Save PDF</span>
        </button>
      </div>

      {/* Printable Sheet (Standard A4 / Letter format proportions) */}
      <div className="print-container max-w-2xl mx-auto bg-white border border-neutral-200 shadow-xl rounded-sm p-8 sm:p-14 sm:py-16">
        {/* Folio Header */}
        <div className="text-center pb-8 border-b-2 border-neutral-900 mb-8">
          <div className="text-[11px] uppercase tracking-[0.25em] font-sans-ui text-neutral-600 mb-2">
            The Tragedy of Hamlet, Prince of Denmark
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
            Actus Tertius, Scæna Prima
          </h1>
          <div className="text-sm italic font-editorial text-neutral-700">
            William Shakespeare (1564 – 1616)
          </div>
          <div className="mt-4 text-xs font-sans-ui uppercase tracking-widest text-neutral-500">
            — Enter Prince Hamlet —
          </div>
        </div>

        {/* Verses */}
        <div className="space-y-1 text-base sm:text-lg leading-relaxed sm:leading-loose text-neutral-900">
          {POEM_LINES.map((line) => {
            const isFifth = line.lineNum % 5 === 0;
            return (
              <div key={line.lineNum} className="flex items-baseline">
                {showLineNumbers && (
                  <span className="w-8 select-none text-right pr-4 text-xs font-sans-ui text-neutral-400">
                    {isFifth ? line.lineNum : ''}
                  </span>
                )}
                <span className="flex-1">{line.text}</span>
              </div>
            );
          })}
        </div>

        {/* Traditional Elizabethan Printer's Colophon / Tailpiece */}
        <div className="mt-12 pt-8 border-t border-neutral-300 text-center text-xs text-neutral-600 font-editorial space-y-1">
          <div className="font-display tracking-widest uppercase text-[10px] text-neutral-400">
            ❦ Folio Edition Reference ❦
          </div>
          <p className="italic">
            Text transcribed according to the First Folio of 1623 and Second Quarto of 1604.
          </p>
          <p className="text-[10px] font-sans-ui text-neutral-400">
            Printed for personal library and scholarly study.
          </p>
        </div>
      </div>
    </div>
  );
};
