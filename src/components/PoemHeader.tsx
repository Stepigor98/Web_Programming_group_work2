import React from 'react';
import { BookOpen, Calendar, MapPin, Feather } from 'lucide-react';
import { POEM_METADATA } from '../data/poemData';

interface PoemHeaderProps {
  theme: 'parchment' | 'light' | 'nocturne';
}

export const PoemHeader: React.FC<PoemHeaderProps> = ({ theme }) => {
  const isNocturne = theme === 'nocturne';
  const isParchment = theme === 'parchment';

  return (
    <header className="mb-8 border-b pb-8 transition-colors duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs tracking-wider uppercase mb-3">
        <div className="flex items-center gap-2 font-medium opacity-75">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{POEM_METADATA.play}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] opacity-70">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {POEM_METADATA.firstFolioDate}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Elsinore Castle
          </span>
        </div>
      </div>

      <h1
        id="poem-title"
        className={`font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 leading-tight ${
          isNocturne ? 'text-amber-100/90' : isParchment ? 'text-stone-900' : 'text-zinc-900'
        }`}
      >
        {POEM_METADATA.title}
      </h1>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <div className="flex items-center gap-1.5 font-serif-folio text-lg sm:text-xl font-medium">
          <Feather className={`w-4 h-4 ${isNocturne ? 'text-amber-400' : 'text-amber-700'}`} />
          <span className={isNocturne ? 'text-zinc-200' : 'text-zinc-800'}>
            {POEM_METADATA.author}
          </span>
        </div>
        <span
          className={`font-editorial text-sm tracking-wide ${
            isNocturne ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          ({POEM_METADATA.authorLifespan})
        </span>
      </div>

      <p
        className={`mt-4 font-editorial text-xs sm:text-sm italic leading-relaxed max-w-3xl ${
          isNocturne ? 'text-zinc-400 border-zinc-800' : isParchment ? 'text-stone-700 border-stone-300' : 'text-zinc-600 border-zinc-200'
        } pl-3 border-l-2`}
      >
        {POEM_METADATA.sceneContext}
      </p>
    </header>
  );
};
