import React from 'react';
import {
  Share2,
  Printer,
  Code,
  BookmarkPlus,
  Volume2,
  VolumeX,
  Settings2,
  BookMarked,
  Check,
  ExternalLink,
  Facebook,
  Twitter,
} from 'lucide-react';
import { ReadingPreferences } from '../types';

interface PoemActionsBarProps {
  onOpenShare: (platform?: 'facebook' | 'twitter' | 'tumblr') => void;
  onOpenPrintMode: () => void;
  onOpenEmbed: () => void;
  onOpenAnthology: () => void;
  isReciting: boolean;
  onToggleRecitation: () => void;
  preferences: ReadingPreferences;
  onUpdatePreferences: (updated: Partial<ReadingPreferences>) => void;
  isInAnthology: boolean;
  selectedLineCount?: number;
  onClearSelection?: () => void;
}

export const PoemActionsBar: React.FC<PoemActionsBarProps> = ({
  onOpenShare,
  onOpenPrintMode,
  onOpenEmbed,
  onOpenAnthology,
  isReciting,
  onToggleRecitation,
  preferences,
  onUpdatePreferences,
  isInAnthology,
}) => {
  const [showSettings, setShowSettings] = React.useState(false);
  const [showShareMenu, setShowShareMenu] = React.useState(false);

  const isNocturne = preferences.theme === 'nocturne';
  const isParchment = preferences.theme === 'parchment';
  const isIridescent = preferences.theme === 'iridescent';
  const isCyber = preferences.theme === 'cyber-aurora';

  const btnBase = `inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2`;
  const btnSecondary = isIridescent
    ? 'bg-white/80 hover:bg-white text-zinc-900 border border-purple-300/70 shadow-sm hover:shadow-purple-500/20 focus-visible:ring-purple-400'
    : isCyber
    ? 'bg-zinc-800/80 hover:bg-zinc-700 text-cyan-300 border border-cyan-500/40 focus-visible:ring-cyan-400'
    : isNocturne
    ? 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 focus-visible:ring-amber-400'
    : isParchment
    ? 'bg-[#f4efe4] hover:bg-[#e9e1d2] text-stone-800 border border-stone-300 focus-visible:ring-amber-700'
    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 focus-visible:ring-zinc-400';

  const btnPrimary = isIridescent
    ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-semibold shadow-md shadow-purple-500/30 hover:opacity-95'
    : isCyber
    ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 text-zinc-950 font-bold shadow-cyan-500/30'
    : isNocturne
    ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold'
    : isParchment
    ? 'bg-stone-900 hover:bg-stone-800 text-amber-50 font-medium'
    : 'bg-zinc-900 hover:bg-zinc-800 text-white font-medium';

  return (
    <div className="no-print mb-8 sticky top-3 z-30">
      <div
        className={`p-2 sm:p-2.5 rounded-xl backdrop-blur-md border shadow-sm transition-colors duration-200 flex flex-wrap items-center justify-between gap-2 ${
          isIridescent
            ? 'bg-white/85 dark:bg-zinc-900/85 border-purple-300/50 shadow-purple-500/20'
            : isCyber
            ? 'bg-zinc-900/90 border-cyan-500/40 shadow-cyan-500/20'
            : isNocturne
            ? 'bg-zinc-900/90 border-zinc-800 shadow-black/40'
            : isParchment
            ? 'bg-[#faf6ee]/95 border-stone-300 shadow-stone-400/10'
            : 'bg-white/95 border-zinc-200 shadow-zinc-200/50'
        }`}
      >
        {/* Primary Requested Actions */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Add this poem to an anthology */}
          <button
            id="action-add-anthology"
            onClick={onOpenAnthology}
            className={`${btnBase} ${isInAnthology ? btnPrimary : btnSecondary}`}
            title="Add this poem to an anthology"
          >
            {isInAnthology ? (
              <>
                <BookMarked className="w-3.5 h-3.5" />
                <span>In Anthologies</span>
                <Check className="w-3 h-3 ml-0.5 opacity-80" />
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Add to Anthology</span>
              </>
            )}
          </button>

          {/* Individual Vibrant Blinking Social Share Buttons */}
          <button
            id="share-facebook-btn"
            onClick={() => onOpenShare('facebook')}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-white bg-blue-600/90 hover:bg-blue-500 border border-blue-400 animate-neon-blue-blink shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
            title="Share on Facebook"
          >
            <Facebook className="w-3.5 h-3.5 fill-current" />
            <span className="whitespace-nowrap">Share on Facebook</span>
          </button>

          <button
            id="share-twitter-btn"
            onClick={() => onOpenShare('twitter')}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400 animate-neon-cyan-blink shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
            title="Share on Twitter (X)"
          >
            <Twitter className="w-3.5 h-3.5 fill-current" />
            <span className="whitespace-nowrap">Share on Twitter(X)</span>
          </button>

          <button
            id="share-tumblr-btn"
            onClick={() => onOpenShare('tumblr')}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-pink-200 bg-pink-950/80 hover:bg-pink-900 border border-pink-400 animate-neon-pink-blink shadow-lg shadow-pink-500/30 transition-all hover:scale-105 active:scale-95"
            title="Share on Tumblr"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Share on Tumblr</span>
          </button>

          {/* View Print Mode */}
          <button
            id="action-print-mode"
            onClick={onOpenPrintMode}
            className={`${btnBase} ${btnSecondary}`}
            title="View print mode"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Mode</span>
          </button>

          {/* Copy Embed Code */}
          <button
            id="action-embed-code"
            onClick={onOpenEmbed}
            className={`${btnBase} ${btnSecondary}`}
            title="Copy embed code"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Copy Embed</span>
          </button>
        </div>

        {/* Reader Audio & Typography Controls */}
        <div className="flex items-center gap-1.5">
          {/* Read Aloud Recitation */}
          <button
            id="action-recitation"
            onClick={onToggleRecitation}
            className={`${btnBase} ${
              isReciting
                ? 'bg-amber-600 text-white font-medium animate-pulse'
                : btnSecondary
            }`}
            title={isReciting ? 'Stop Recitation' : 'Listen to Recitation'}
          >
            {isReciting ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Recite</span>
              </>
            )}
          </button>

          {/* Reading Preferences Toggle */}
          <div className="relative">
            <button
              id="action-reading-settings"
              onClick={() => setShowSettings(!showSettings)}
              className={`${btnBase} ${btnSecondary}`}
              title="Reading Preferences"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            {showSettings && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-xl border p-3 shadow-xl z-50 text-xs font-sans-ui ${
                  isNocturne
                    ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
                    : isParchment
                    ? 'bg-[#fcf9f2] border-stone-300 text-stone-900'
                    : 'bg-white border-zinc-200 text-zinc-900'
                }`}
              >
                <div className="font-semibold text-xs mb-2.5 pb-1 border-b opacity-80 flex items-center justify-between">
                  <span>Reading Settings</span>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-[10px] opacity-60 hover:opacity-100"
                  >
                    Close
                  </button>
                </div>

                {/* Theme Selection */}
                <div className="mb-3">
                  <span className="text-[11px] block font-medium opacity-70 mb-1.5">Atmosphere</span>
                  <div className="grid grid-cols-2 gap-1.5 mb-1">
                    <button
                      onClick={() => onUpdatePreferences({ theme: 'iridescent' })}
                      className={`py-1 px-1.5 rounded text-[11px] font-medium border text-center transition-all ${
                        preferences.theme === 'iridescent'
                          ? 'border-purple-500 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 text-purple-700 dark:text-purple-300 font-bold'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      ✨ Iridescent
                    </button>
                    <button
                      onClick={() => onUpdatePreferences({ theme: 'cyber-aurora' })}
                      className={`py-1 px-1.5 rounded text-[11px] font-medium border text-center transition-all ${
                        preferences.theme === 'cyber-aurora'
                          ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      ⚡ Cyber-Aurora
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {(['parchment', 'light', 'nocturne'] as const).map((thm) => (
                      <button
                        key={thm}
                        onClick={() => onUpdatePreferences({ theme: thm })}
                        className={`py-1 px-1.5 rounded text-[11px] font-medium capitalize border text-center transition-all ${
                          preferences.theme === thm
                            ? 'border-amber-500 bg-amber-500/10 font-bold'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        {thm === 'parchment' ? 'Parchment' : thm === 'light' ? 'Library' : 'Nocturne'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Face Selection */}
                <div className="mb-3">
                  <span className="text-[11px] block font-medium opacity-70 mb-1.5">Typography</span>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => onUpdatePreferences({ fontStyle: 'garamond' })}
                      className={`py-1 px-1.5 rounded text-[11px] border font-serif-folio ${
                        preferences.fontStyle === 'garamond'
                          ? 'border-amber-500 bg-amber-500/10 font-bold'
                          : 'border-transparent opacity-70'
                      }`}
                    >
                      Garamond
                    </button>
                    <button
                      onClick={() => onUpdatePreferences({ fontStyle: 'newsreader' })}
                      className={`py-1 px-1.5 rounded text-[11px] border font-editorial ${
                        preferences.fontStyle === 'newsreader'
                          ? 'border-amber-500 bg-amber-500/10 font-bold'
                          : 'border-transparent opacity-70'
                      }`}
                    >
                      Newsreader
                    </button>
                    <button
                      onClick={() => onUpdatePreferences({ fontStyle: 'sans' })}
                      className={`py-1 px-1.5 rounded text-[11px] border font-sans-ui ${
                        preferences.fontStyle === 'sans'
                          ? 'border-amber-500 bg-amber-500/10 font-bold'
                          : 'border-transparent opacity-70'
                      }`}
                    >
                      Modern
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div className="mb-3">
                  <span className="text-[11px] block font-medium opacity-70 mb-1.5">Text Scale</span>
                  <div className="grid grid-cols-3 gap-1">
                    {(['normal', 'large', 'scholarly'] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => onUpdatePreferences({ fontSize: sz })}
                        className={`py-1 px-1.5 rounded text-[11px] border capitalize ${
                          preferences.fontSize === sz
                            ? 'border-amber-500 bg-amber-500/10 font-bold'
                            : 'border-transparent opacity-70'
                        }`}
                      >
                        {sz === 'normal' ? 'Standard' : sz === 'large' ? 'Large' : 'Scholarly'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-1.5 pt-1 border-t border-black/5 dark:border-white/10">
                  <label className="flex items-center justify-between cursor-pointer py-1">
                    <span className="text-[11px]">Academic Line Numbers</span>
                    <input
                      type="checkbox"
                      checked={preferences.showLineNumbers}
                      onChange={(e) =>
                        onUpdatePreferences({ showLineNumbers: e.target.checked })
                      }
                      className="rounded accent-amber-600"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer py-1">
                    <span className="text-[11px]">Glossary term highlights</span>
                    <input
                      type="checkbox"
                      checked={preferences.showGlossaryHints}
                      onChange={(e) =>
                        onUpdatePreferences({ showGlossaryHints: e.target.checked })
                      }
                      className="rounded accent-amber-600"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
