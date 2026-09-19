import React, { useState, useEffect, useRef } from 'react';
import { PoemHeader } from './components/PoemHeader';
import { PoemActionsBar } from './components/PoemActionsBar';
import { PoemReader } from './components/PoemReader';
import { AnthologyModal } from './components/AnthologyModal';
import { EmbedCodeModal } from './components/EmbedCodeModal';
import { ShareModal } from './components/ShareModal';
import { PrintModeView } from './components/PrintModeView';
import { GlossarySidebar } from './components/GlossarySidebar';
import { ShakePearCard } from './components/ShakePearCard';
import { POEM_ID, POEM_LINES, POEM_METADATA, DEFAULT_ANTHOLOGIES } from './data/poemData';
import { Anthology, Annotation, ReadingPreferences } from './types';
import { Check, Info, BookOpen, Quote, Sparkles, Wand2 } from 'lucide-react';

const STORAGE_KEY_ANTHOLOGIES = 'hamlet_user_anthologies_v1';
const STORAGE_KEY_PREFS = 'hamlet_user_prefs_v3';

export default function App() {
  // Reading preferences with Cyberpunk neon theme as default
  const [preferences, setPreferences] = useState<ReadingPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          theme: parsed.theme || 'cyber-aurora',
        };
      }
    } catch {
      // fallback
    }
    return {
      theme: 'cyber-aurora',
      fontStyle: 'garamond',
      fontSize: 'normal',
      showLineNumbers: true,
      showGlossaryHints: true,
      lineSpacing: 'comfortable',
    };
  });

  // User anthologies
  const [anthologies, setAnthologies] = useState<Anthology[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANTHOLOGIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_ANTHOLOGIES;
  });

  // Modals & views
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [isAnthologyModalOpen, setIsAnthologyModalOpen] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharePlatform, setSharePlatform] = useState<'facebook' | 'twitter' | 'tumblr' | undefined>(undefined);

  // Literary annotation / gloss selected
  const [selectedAnnotation, setSelectedAnnotation] = useState<{
    annotation: Annotation;
    lineNum: number;
  } | null>(null);

  // Recitation state
  const [isReciting, setIsReciting] = useState(false);
  const [activeRecitationLine, setActiveRecitationLine] = useState<number | null>(null);
  const recitationTimeouts = useRef<NodeJS.Timeout[]>([]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(preferences));
    } catch {
      // ignore
    }
  }, [preferences]);

  // Sync anthologies to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANTHOLOGIES, JSON.stringify(anthologies));
    } catch {
      // ignore
    }
  }, [anthologies]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const updatePreferences = (updated: Partial<ReadingPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updated }));
  };

  // Check if current poem is in at least one anthology
  const isInAnthology = anthologies.some((a) => a.poemIds.includes(POEM_ID));

  const handleTogglePoemInAnthology = (anthologyId: string) => {
    setAnthologies((prev) =>
      prev.map((a) => {
        if (a.id === anthologyId) {
          const has = a.poemIds.includes(POEM_ID);
          const newIds = has
            ? a.poemIds.filter((id) => id !== POEM_ID)
            : [...a.poemIds, POEM_ID];
          showToast(has ? `Removed from “${a.title}”` : `Added to “${a.title}”`);
          return { ...a, poemIds: newIds };
        }
        return a;
      })
    );
  };

  const handleCreateAnthology = (title: string, description: string) => {
    const newAnth: Anthology = {
      id: `anthology-${Date.now()}`,
      title,
      description,
      createdAt: new Date().toISOString().split('T')[0],
      poemIds: [POEM_ID],
    };
    setAnthologies((prev) => [newAnth, ...prev]);
    showToast(`Created “${title}” with Hamlet included!`);
  };

  const handleDeleteAnthology = (id: string) => {
    setAnthologies((prev) => prev.filter((a) => a.id !== id));
    showToast('Anthology deleted');
  };

  const handleUpdateNote = (anthologyId: string, note: string) => {
    setAnthologies((prev) =>
      prev.map((a) => (a.id === anthologyId ? { ...a, notes: note } : a))
    );
    showToast('Marginalia note saved successfully');
  };

  // Speech Recitation
  const stopRecitation = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    recitationTimeouts.current.forEach(clearTimeout);
    recitationTimeouts.current = [];
    setIsReciting(false);
    setActiveRecitationLine(null);
  };

  const startRecitation = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showToast('Speech audio is not supported in this browser.');
      return;
    }

    stopRecitation();
    setIsReciting(true);

    // Sequence through lines
    const lines = POEM_LINES;
    let accumulatedTime = 0;

    lines.forEach((line, index) => {
      // Calculate delay based on word count
      const words = line.text.split(' ').length;
      const durationMs = Math.max(1800, words * 450);

      const timeout = setTimeout(() => {
        setActiveRecitationLine(line.lineNum);

        const utterance = new SpeechSynthesisUtterance(line.text);
        utterance.rate = 0.88; // Poetic deliberate tempo
        utterance.pitch = 0.95;

        // Try to pick an English voice if available
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(
          (v) => v.lang.includes('en-GB') || v.lang.includes('en-US')
        );
        if (enVoice) utterance.voice = enVoice;

        window.speechSynthesis.speak(utterance);

        if (index === lines.length - 1) {
          utterance.onend = () => {
            stopRecitation();
            showToast('Recitation completed.');
          };
        }
      }, accumulatedTime);

      recitationTimeouts.current.push(timeout);
      accumulatedTime += durationMs;
    });
  };

  const toggleRecitation = () => {
    if (isReciting) {
      stopRecitation();
    } else {
      startRecitation();
    }
  };

  useEffect(() => {
    return () => {
      stopRecitation();
    };
  }, []);

  // Sharing handling
  const handleOpenShare = (platform?: 'facebook' | 'twitter' | 'tumblr') => {
    if (platform === 'facebook') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
      return;
    }
    if (platform === 'twitter') {
      const text = encodeURIComponent(
        `“To be, or not to be: that is the question...” — William Shakespeare, Hamlet (Act III, Scene I)`
      );
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
      return;
    }
    if (platform === 'tumblr') {
      const quote = encodeURIComponent(
        `To be, or not to be: that is the question: Whether ’tis nobler in the mind to suffer the slings and arrows of outrageous fortune...`
      );
      const source = encodeURIComponent(`William Shakespeare, Hamlet (Act III, Scene I)`);
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.tumblr.com/widgets/share/tool?posttype=quote&content=${quote}&source=${source}&canonicalUrl=${url}`,
        '_blank'
      );
      return;
    }
    setSharePlatform(platform);
    setIsShareModalOpen(true);
  };

  const handleCopyQuote = (quoteText: string) => {
    navigator.clipboard.writeText(quoteText);
    showToast('Quote copied to clipboard!');
  };

  // Check theme backgrounds
  const isNocturne = preferences.theme === 'nocturne';
  const isParchment = preferences.theme === 'parchment';
  const isIridescent = preferences.theme === 'iridescent';
  const isCyber = preferences.theme === 'cyber-aurora';

  if (isPrintMode) {
    return (
      <PrintModeView
        onClose={() => setIsPrintMode(false)}
        showLineNumbers={preferences.showLineNumbers}
      />
    );
  }

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 selection:bg-cyan-500/30 selection:text-cyan-200 ${
        isCyber
          ? 'bg-[#06070e] text-zinc-100'
          : isIridescent
          ? 'bg-gradient-to-br from-slate-50 via-purple-50/40 via-pink-50/30 to-amber-50/30 text-zinc-900'
          : isNocturne
          ? 'bg-[#111113] text-zinc-100'
          : isParchment
          ? 'bg-[#fcf9f2] text-stone-900'
          : 'bg-[#fafafa] text-zinc-900'
      }`}
    >
      {/* Cyberpunk Grid Background Overlay */}
      {isCyber && (
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0, 240, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Cyberpunk Neon Glow & Ambient Lights */}
      {isCyber && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-20 -left-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-transparent blur-3xl animate-float-slow" />
          <div
            className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-pink-500/20 via-purple-600/15 to-transparent blur-3xl animate-float-slow"
            style={{ animationDelay: '-3s' }}
          />
          <div
            className="absolute -bottom-20 left-1/3 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-cyan-400/15 via-pink-500/15 to-transparent blur-3xl animate-float-slow"
            style={{ animationDelay: '-5s' }}
          />
        </div>
      )}

      {/* Iridescent Ambient Glowing Orbs */}
      {isIridescent && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-400/25 to-purple-400/25 blur-3xl animate-float-slow" />
          <div
            className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/25 to-blue-400/25 blur-3xl animate-float-slow"
            style={{ animationDelay: '-2s' }}
          />
          <div
            className="absolute -bottom-24 left-1/4 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-amber-300/20 via-pink-400/20 to-purple-400/20 blur-3xl animate-float-slow"
            style={{ animationDelay: '-4s' }}
          />
        </div>
      )}

      {/* Top Folio Header Band with Atmosphere Quick Switch */}
      <div
        className={`no-print relative z-10 border-b text-[11px] font-sans-ui tracking-wider uppercase py-2 px-4 transition-colors ${
          isCyber
            ? 'bg-[#080a14]/90 backdrop-blur-md border-cyan-500/30 text-cyan-300 shadow-sm shadow-cyan-500/10'
            : isIridescent
            ? 'bg-white/80 backdrop-blur-md border-purple-200/60 text-purple-900'
            : isNocturne
            ? 'bg-zinc-950/60 border-zinc-800 text-zinc-400'
            : isParchment
            ? 'bg-[#f3ede1]/80 border-stone-300 text-stone-700'
            : 'bg-zinc-100/80 border-zinc-200 text-zinc-600'
        }`}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className={`w-3.5 h-3.5 ${isCyber ? 'text-cyan-400' : 'text-purple-500'}`} />
            <span className="font-semibold">
              {isCyber ? 'NEURAL FOLIO ARCHIVE // 2077' : 'First Folio Edition'}
            </span>
            <span className="opacity-50">•</span>
            <span className="hidden sm:inline">The Tragedy of Hamlet</span>
          </div>

          {/* Quick Atmosphere Selector in English */}
          <div className="flex items-center gap-1 normal-case text-xs">
            <span className="opacity-60 text-[10px] uppercase font-bold mr-1">Atmosphere:</span>
            <button
              onClick={() => updatePreferences({ theme: 'cyber-aurora' })}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                isCyber
                  ? 'bg-cyan-400 text-zinc-950 shadow-md shadow-cyan-400/40'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-70'
              }`}
              title="Cyberpunk Neon Mode"
            >
              ⚡ Cyberpunk
            </button>
            <button
              onClick={() => updatePreferences({ theme: 'iridescent' })}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                isIridescent
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white shadow-sm shadow-purple-500/30'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-70'
              }`}
              title="Vibrant Iridescent Shimmer"
            >
              ✨ Iridescent
            </button>
            <button
              onClick={() => updatePreferences({ theme: 'parchment' })}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                isParchment
                  ? 'bg-amber-200 text-amber-950 font-bold'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-70'
              }`}
              title="Classic Parchment"
            >
              📜 Parchment
            </button>
            <button
              onClick={() => updatePreferences({ theme: 'nocturne' })}
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium transition-all ${
                isNocturne
                  ? 'bg-zinc-800 text-zinc-100 font-bold'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-70'
              }`}
              title="Nocturne Dark Mode"
            >
              🎭 Nocturne
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Play & Soliloquy Header */}
        <PoemHeader theme={preferences.theme} />

        {/* Featured William Shake-Pear Meme Card with Shake & Audio Interaction */}
        <ShakePearCard theme={preferences.theme} />

        {/* The Action Bar with requested tools: Share (FB, Twitter, Tumblr), Print Mode, Embed Code, Add to Anthology */}
        <PoemActionsBar
          onOpenShare={handleOpenShare}
          onOpenPrintMode={() => setIsPrintMode(true)}
          onOpenEmbed={() => setIsEmbedModalOpen(true)}
          onOpenAnthology={() => setIsAnthologyModalOpen(true)}
          isReciting={isReciting}
          onToggleRecitation={toggleRecitation}
          preferences={preferences}
          onUpdatePreferences={updatePreferences}
          isInAnthology={isInAnthology}
        />

        {/* Main Content Grid: Soliloquy Verses + Scholarly Glossary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Verse Column */}
          <div className="lg:col-span-8">
            <div
              className={`p-6 sm:p-10 rounded-2xl border shadow-sm transition-colors duration-200 relative ${
                isIridescent
                  ? 'bg-white/85 dark:bg-zinc-900/85 border-purple-300/60 shadow-xl shadow-purple-500/10 backdrop-blur-xl'
                  : isCyber
                  ? 'bg-zinc-900/85 border-cyan-500/30 shadow-xl shadow-cyan-950/40 backdrop-blur-xl'
                  : isNocturne
                  ? 'bg-zinc-900/60 border-zinc-800/80 shadow-black/20'
                  : isParchment
                  ? 'bg-[#faf6ee] border-stone-300/80 shadow-stone-300/20'
                  : 'bg-white border-zinc-200 shadow-zinc-100'
              }`}
            >
              <PoemReader
                preferences={preferences}
                activeRecitationLine={activeRecitationLine}
                onSelectAnnotation={(annotation, lineNum) =>
                  setSelectedAnnotation(
                    selectedAnnotation?.lineNum === lineNum ? null : { annotation, lineNum }
                  )
                }
                selectedAnnotation={selectedAnnotation}
                onCopyQuote={handleCopyQuote}
              />
            </div>
          </div>

          {/* Side Scholarly Glossary Column */}
          <div className="no-print lg:col-span-4 space-y-6">
            <GlossarySidebar
              onSelectTerm={(annotation, lineNum) =>
                setSelectedAnnotation({ annotation, lineNum })
              }
              isNocturne={isNocturne}
              isParchment={isParchment}
              isIridescent={isIridescent}
              isCyber={isCyber}
            />

            {/* Quick Dramatic Context Box */}
            <div
              className={`p-5 rounded-2xl border text-xs font-sans-ui transition-colors leading-relaxed ${
                isIridescent
                  ? 'bg-white/80 dark:bg-zinc-900/80 border-purple-200 text-zinc-700 dark:text-zinc-300 shadow-md shadow-purple-500/5'
                  : isCyber
                  ? 'bg-zinc-900/60 border-cyan-900/80 text-zinc-300'
                  : isNocturne
                  ? 'bg-zinc-900/40 border-zinc-800 text-zinc-300'
                  : isParchment
                  ? 'bg-[#faf6ee] border-stone-300 text-stone-700'
                  : 'bg-white border-zinc-200 text-zinc-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-display font-semibold text-sm">
                <Quote
                  className={`w-4 h-4 ${
                    isIridescent
                      ? 'text-purple-600'
                      : isCyber
                      ? 'text-cyan-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                />
                <span className={isIridescent ? 'text-iridescent font-bold' : ''}>
                  Rhetorical Context
                </span>
              </div>
              <p className="opacity-90">
                Unlike Hamlet’s earlier private soliloquies, this speech contains no first-person pronouns
                (“I” or “me”) until the final lines when he notices Ophelia. It functions as a universal
                philosophical meditation on existence, suffering, and the dread of the afterlife.
              </p>
              <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between opacity-70 text-[11px]">
                <span>Meter: Blank Verse</span>
                <span>Feminine Endings: 11-syllables</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals for Requested Operations */}
      <AnthologyModal
        isOpen={isAnthologyModalOpen}
        onClose={() => setIsAnthologyModalOpen(false)}
        anthologies={anthologies}
        onTogglePoemInAnthology={handleTogglePoemInAnthology}
        onCreateAnthology={handleCreateAnthology}
        onDeleteAnthology={handleDeleteAnthology}
        onUpdateNote={handleUpdateNote}
        isNocturne={isNocturne}
        isParchment={isParchment}
      />

      <EmbedCodeModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
        isNocturne={isNocturne}
        isParchment={isParchment}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        initialPlatform={sharePlatform}
        isNocturne={isNocturne}
        isParchment={isParchment}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium font-sans-ui shadow-2xl border border-white/10 dark:border-black/10">
            <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
