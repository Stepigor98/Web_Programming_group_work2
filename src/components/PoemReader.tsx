import React from 'react';
import { POEM_LINES } from '../data/poemData';
import { Annotation, ReadingPreferences } from '../types';
import { Info, Copy, Check, Quote } from 'lucide-react';

interface PoemReaderProps {
  preferences: ReadingPreferences;
  activeRecitationLine: number | null;
  onSelectAnnotation: (annotation: Annotation, lineNum: number) => void;
  selectedAnnotation: { annotation: Annotation; lineNum: number } | null;
  onCopyQuote: (text: string) => void;
}

export const PoemReader: React.FC<PoemReaderProps> = ({
  preferences,
  activeRecitationLine,
  onSelectAnnotation,
  selectedAnnotation,
  onCopyQuote,
}) => {
  const [copiedLine, setCopiedLine] = React.useState<number | null>(null);
  const [hoveredLine, setHoveredLine] = React.useState<number | null>(null);

  const isNocturne = preferences.theme === 'nocturne';
  const isParchment = preferences.theme === 'parchment';

  // Font family class
  const fontClass =
    preferences.fontStyle === 'garamond'
      ? 'font-serif-folio'
      : preferences.fontStyle === 'newsreader'
      ? 'font-editorial'
      : 'font-sans-ui';

  // Font size class
  const sizeClass =
    preferences.fontSize === 'normal'
      ? 'text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose'
      : preferences.fontSize === 'large'
      ? 'text-xl sm:text-2xl md:text-3xl leading-relaxed sm:leading-loose'
      : 'text-base sm:text-lg md:text-xl leading-normal sm:leading-relaxed';

  const handleCopySingleLine = (lineNum: number, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyQuote(`"${text}" — William Shakespeare, Hamlet`);
    setCopiedLine(lineNum);
    setTimeout(() => setCopiedLine(null), 2000);
  };

  // Helper to render text with clickable annotated words
  const renderLineContent = (text: string, lineNum: number, annotations?: Annotation[]) => {
    if (!annotations || annotations.length === 0 || !preferences.showGlossaryHints) {
      return <span>{text}</span>;
    }

    // Sort terms by length descending to prevent partial match collisions
    const terms = [...annotations].sort((a, b) => b.term.length - a.term.length);
    let parts: React.ReactNode[] = [text];

    terms.forEach((annot) => {
      const nextParts: React.ReactNode[] = [];
      const regex = new RegExp(`(${annot.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i');

      parts.forEach((part) => {
        if (typeof part !== 'string') {
          nextParts.push(part);
          return;
        }

        const segments = part.split(regex);
        segments.forEach((seg, idx) => {
          if (seg.toLowerCase() === annot.term.toLowerCase()) {
            const isCurrent =
              selectedAnnotation?.lineNum === lineNum &&
              selectedAnnotation.annotation.term.toLowerCase() === annot.term.toLowerCase();

            nextParts.push(
              <span
                key={`${annot.term}-${idx}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAnnotation(annot, lineNum);
                }}
                className={`cursor-pointer transition-all duration-150 inline-block px-0.5 rounded ${
                  isCurrent
                    ? 'bg-amber-400/30 text-amber-900 dark:text-amber-200 underline decoration-amber-500 decoration-2 font-medium'
                    : isNocturne
                    ? 'underline decoration-amber-500/50 decoration-dotted underline-offset-4 hover:text-amber-200 hover:decoration-amber-300'
                    : isParchment
                    ? 'underline decoration-amber-800/50 decoration-dotted underline-offset-4 hover:text-amber-950 hover:decoration-amber-800'
                    : 'underline decoration-zinc-400 decoration-dotted underline-offset-4 hover:text-zinc-900 hover:decoration-zinc-800'
                }`}
                title={`Click for literary gloss: ${annot.term}`}
              >
                {seg}
              </span>
            );
          } else if (seg) {
            nextParts.push(seg);
          }
        });
      });

      parts = nextParts;
    });

    return <>{parts}</>;
  };

  return (
    <div className="relative">
      <div className={`space-y-1 sm:space-y-1.5 ${fontClass} ${sizeClass}`}>
        {POEM_LINES.map((line) => {
          const isActiveRecitation = activeRecitationLine === line.lineNum;
          const isAcademicFifth = line.lineNum % 5 === 0;

          return (
            <div
              key={line.lineNum}
              onMouseEnter={() => setHoveredLine(line.lineNum)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`group relative flex items-baseline transition-all duration-200 rounded-md px-2 py-0.5 -mx-2 ${
                isActiveRecitation
                  ? isNocturne
                    ? 'bg-amber-950/40 text-amber-100 ring-1 ring-amber-500/40'
                    : isParchment
                    ? 'bg-amber-200/50 text-amber-950 ring-1 ring-amber-600/30'
                    : 'bg-zinc-100 text-zinc-950 ring-1 ring-zinc-300'
                  : hoveredLine === line.lineNum
                  ? isNocturne
                    ? 'bg-white/[0.03]'
                    : isParchment
                    ? 'bg-stone-200/40'
                    : 'bg-zinc-50'
                  : ''
              }`}
            >
              {/* Academic Line Number Margin */}
              {preferences.showLineNumbers && (
                <div
                  className={`w-8 sm:w-12 select-none text-right pr-3 sm:pr-4 text-xs tracking-wider transition-opacity duration-150 shrink-0 font-sans-ui ${
                    isAcademicFifth
                      ? isNocturne
                        ? 'text-amber-400/80 font-semibold'
                        : isParchment
                        ? 'text-stone-700 font-semibold'
                        : 'text-zinc-800 font-semibold'
                      : 'opacity-20 group-hover:opacity-60 text-zinc-500'
                  }`}
                >
                  {line.lineNum}
                </div>
              )}

              {/* Line Verse Text */}
              <div
                className={`flex-1 tracking-normal transition-colors ${
                  isNocturne
                    ? 'text-zinc-200'
                    : isParchment
                    ? 'text-stone-900'
                    : 'text-zinc-900'
                }`}
              >
                {renderLineContent(line.text, line.lineNum, line.annotations)}
              </div>

              {/* Action utilities visible on hover */}
              <div className="no-print opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1 pl-2 shrink-0">
                {line.annotations && line.annotations.length > 0 && (
                  <button
                    onClick={() => onSelectAnnotation(line.annotations![0], line.lineNum)}
                    className="p-1 rounded text-xs opacity-60 hover:opacity-100 transition-opacity"
                    title={`View gloss for ${line.annotations[0].term}`}
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={(e) => handleCopySingleLine(line.lineNum, line.text, e)}
                  className="p-1 rounded text-xs opacity-60 hover:opacity-100 transition-opacity"
                  title="Copy this line"
                >
                  {copiedLine === line.lineNum ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Annotation Callout if selected */}
      {selectedAnnotation && (
        <div
          className={`no-print mt-8 p-4 rounded-xl border shadow-lg transition-all duration-200 ${
            isNocturne
              ? 'bg-zinc-900/95 border-amber-500/40 text-zinc-100'
              : isParchment
              ? 'bg-[#f7f2e7] border-amber-800/30 text-stone-900'
              : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-folio text-lg font-bold italic tracking-wide">
                  “{selectedAnnotation.annotation.term}”
                </span>
                <span className="text-[11px] font-sans-ui uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  Line {selectedAnnotation.lineNum} Gloss
                </span>
              </div>
              <p className="mt-1.5 font-sans-ui text-sm font-medium leading-relaxed">
                {selectedAnnotation.annotation.definition}
              </p>
              <p className="mt-1 font-editorial text-xs italic opacity-80 leading-relaxed">
                {selectedAnnotation.annotation.context}
              </p>
            </div>
            <button
              onClick={() => onSelectAnnotation(selectedAnnotation.annotation, -1)}
              className="text-xs px-2 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100 font-sans-ui"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
