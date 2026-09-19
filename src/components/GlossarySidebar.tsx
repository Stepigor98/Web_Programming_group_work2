import React from 'react';
import { BookOpen, Search, ChevronRight } from 'lucide-react';
import { POEM_LINES } from '../data/poemData';
import { Annotation } from '../types';

interface GlossarySidebarProps {
  onSelectTerm: (annotation: Annotation, lineNum: number) => void;
  isNocturne: boolean;
  isParchment: boolean;
}

export const GlossarySidebar: React.FC<GlossarySidebarProps> = ({
  onSelectTerm,
  isNocturne,
  isParchment,
}) => {
  const [query, setQuery] = React.useState('');

  // Extract all unique annotations with their line numbers
  const allAnnotations = React.useMemo(() => {
    const list: { annot: Annotation; lineNum: number }[] = [];
    POEM_LINES.forEach((line) => {
      line.annotations?.forEach((annot) => {
        list.push({ annot, lineNum: line.lineNum });
      });
    });
    return list;
  }, []);

  const filtered = allAnnotations.filter(
    (item) =>
      item.annot.term.toLowerCase().includes(query.toLowerCase()) ||
      item.annot.definition.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={`rounded-2xl border p-5 transition-colors duration-200 ${
        isNocturne
          ? 'bg-zinc-900/80 border-zinc-800 text-zinc-200'
          : isParchment
          ? 'bg-[#faf6ee] border-stone-300 text-stone-900'
          : 'bg-white border-zinc-200 text-zinc-900'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <h3 className="font-display font-semibold text-sm">
            Archaic Glossary & Glosses
          </h3>
        </div>
        <span className="text-[11px] font-sans-ui opacity-60">
          {allAnnotations.length} terms
        </span>
      </div>

      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 opacity-50" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search archaic definitions..."
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans-ui"
        />
      </div>

      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {filtered.map(({ annot, lineNum }) => (
          <button
            key={`${annot.term}-${lineNum}`}
            onClick={() => onSelectTerm(annot, lineNum)}
            className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 group ${
              isNocturne
                ? 'bg-zinc-800/40 border-zinc-800/60 hover:border-amber-500/40 hover:bg-zinc-800/80'
                : isParchment
                ? 'bg-[#f4efe4] border-stone-300/80 hover:border-amber-800/40 hover:bg-[#ede5d4]'
                : 'bg-zinc-50 border-zinc-200/80 hover:border-zinc-400 hover:bg-zinc-100'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-folio font-semibold text-sm">
                  {annot.term}
                </span>
                <span className="text-[10px] font-sans-ui opacity-60">
                  (Line {lineNum})
                </span>
              </div>
              <p className="text-xs font-sans-ui opacity-80 mt-0.5 line-clamp-2 leading-relaxed">
                {annot.definition}
              </p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-6 text-xs opacity-60 font-sans-ui">
            No terms matching “{query}”
          </div>
        )}
      </div>
    </div>
  );
};
