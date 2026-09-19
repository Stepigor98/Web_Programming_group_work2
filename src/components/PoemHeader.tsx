import React from 'react';
import { BookOpen, Calendar, MapPin, Feather, Sparkles } from 'lucide-react';
import { POEM_METADATA } from '../data/poemData';
import { ReadingTheme } from '../types';

interface PoemHeaderProps {
  theme: ReadingTheme;
}

export const PoemHeader: React.FC<PoemHeaderProps> = ({ theme }) => {
  const isNocturne = theme === 'nocturne';
  const isParchment = theme === 'parchment';
  const isIridescent = theme === 'iridescent';
  const isCyber = theme === 'cyber-aurora';

  return (
    <header className="mb-6 border-b pb-6 transition-colors duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs tracking-wider uppercase mb-3">
        <div className="flex items-center gap-2 font-medium opacity-80">
          <BookOpen className="w-3.5 h-3.5 text-purple-500" />
          <span>{POEM_METADATA.play}</span>
          {isIridescent && (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-purple-400/30 text-purple-700 dark:text-purple-300 font-semibold lowercase">
              <Sparkles className="w-2.5 h-2.5" /> iridescent
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-[11px] opacity-75">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-cyan-500" /> {POEM_METADATA.firstFolioDate}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-500" /> Elsinore Castle
          </span>
        </div>
      </div>

      <h1
        id="poem-title"
        className={`font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 leading-tight ${
          isIridescent
            ? 'text-iridescent'
            : isCyber
            ? 'bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent'
            : isNocturne
            ? 'text-amber-100/90'
            : isParchment
            ? 'text-stone-900'
            : 'text-zinc-900'
        }`}
      >
        {POEM_METADATA.title}
      </h1>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <div className="flex items-center gap-1.5 font-serif-folio text-lg sm:text-xl font-medium">
          <Feather
            className={`w-4 h-4 ${
              isIridescent
                ? 'text-pink-500'
                : isCyber
                ? 'text-cyan-400'
                : isNocturne
                ? 'text-amber-400'
                : 'text-amber-700'
            }`}
          />
          <span
            className={
              isNocturne || isCyber
                ? 'text-zinc-200'
                : isIridescent
                ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                : 'text-zinc-800'
            }
          >
            {POEM_METADATA.author}
          </span>
        </div>
        <span
          className={`font-editorial text-sm tracking-wide ${
            isNocturne || isCyber ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          ({POEM_METADATA.authorLifespan})
        </span>
      </div>

      <p
        className={`mt-4 font-editorial text-xs sm:text-sm italic leading-relaxed max-w-3xl pl-3 border-l-2 ${
          isIridescent
            ? 'text-zinc-700 dark:text-zinc-300 border-purple-400'
            : isCyber
            ? 'text-zinc-300 border-cyan-500'
            : isNocturne
            ? 'text-zinc-400 border-zinc-800'
            : isParchment
            ? 'text-stone-700 border-stone-300'
            : 'text-zinc-600 border-zinc-200'
        }`}
      >
        {POEM_METADATA.sceneContext}
      </p>
    </header>
  );
};
