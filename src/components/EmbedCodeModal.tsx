import React from 'react';
import { X, Copy, Check, Code, Eye } from 'lucide-react';
import { POEM_METADATA } from '../data/poemData';

interface EmbedCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isNocturne: boolean;
  isParchment: boolean;
}

export const EmbedCodeModal: React.FC<EmbedCodeModalProps> = ({
  isOpen,
  onClose,
  isNocturne,
  isParchment,
}) => {
  const [embedTheme, setEmbedTheme] = React.useState<'parchment' | 'dark' | 'minimal'>('parchment');
  const [embedType, setEmbedType] = React.useState<'card' | 'full'>('card');
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ai.studio';

  const embedSnippet =
    embedType === 'card'
      ? `<blockquote class="shakespeare-poem-embed" style="margin: 1.5rem auto; max-width: 580px; padding: 1.5rem; border-radius: 12px; background: ${
          embedTheme === 'dark' ? '#18181b' : embedTheme === 'parchment' ? '#fbf8f1' : '#ffffff'
        }; color: ${
          embedTheme === 'dark' ? '#f4f4f5' : '#18181b'
        }; border: 1px solid ${
          embedTheme === 'dark' ? '#27272a' : '#e4e4e7'
        }; font-family: 'EB Garamond', Georgia, serif; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
  <h3 style="margin: 0 0 0.5rem; font-family: 'Cinzel', Georgia, serif; font-size: 1.25rem; font-weight: 600;">${POEM_METADATA.title}</h3>
  <p style="margin: 0 0 1rem; font-size: 0.875rem; opacity: 0.8; font-style: italic;">By ${POEM_METADATA.author} (${POEM_METADATA.authorLifespan})</p>
  <p style="margin: 0; font-size: 1.125rem; line-height: 1.8; font-style: italic;">
    “To be, or not to be: that is the question:<br>
    Whether ’tis nobler in the mind to suffer<br>
    The slings and arrows of outrageous fortune,<br>
    Or to take arms against a sea of troubles,<br>
    And by opposing end them?...”
  </p>
  <footer style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid rgba(0,0,0,0.1); font-size: 0.75rem; opacity: 0.7; font-family: sans-serif;">
    <a href="${currentUrl}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Read complete soliloquy & study notes</a>
  </footer>
</blockquote>`
      : `<div class="shakespeare-full-embed" style="max-width: 640px; margin: 1.5rem auto; padding: 2rem; border-radius: 16px; background: ${
          embedTheme === 'dark' ? '#121214' : embedTheme === 'parchment' ? '#faf6ee' : '#ffffff'
        }; color: ${
          embedTheme === 'dark' ? '#e4e4e7' : '#1c1917'
        }; border: 1px solid ${
          embedTheme === 'dark' ? '#27272a' : '#d6d3d1'
        }; font-family: 'EB Garamond', Georgia, serif;">
  <div style="text-align: center; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(120,120,120,0.2); padding-bottom: 1rem;">
    <h2 style="margin: 0 0 0.25rem; font-size: 1.4rem;">${POEM_METADATA.title}</h2>
    <p style="margin: 0; font-size: 0.9rem; opacity: 0.75;">${POEM_METADATA.author} (${POEM_METADATA.authorLifespan})</p>
  </div>
  <pre style="white-space: pre-wrap; font-family: inherit; font-size: 1rem; line-height: 1.8; margin: 0;">
To be, or not to be: that is the question:
Whether ’tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles,
And by opposing end them? To die: to sleep;
No more; and by a sleep to say we end
The heart-ache and the thousand natural shocks
That flesh is heir to, ’tis a consummation
Devoutly to be wish’d...
  </pre>
</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-xl rounded-2xl shadow-2xl border overflow-hidden transition-colors duration-200 ${
          isNocturne
            ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
            : isParchment
            ? 'bg-[#faf6ee] border-stone-300 text-stone-900'
            : 'bg-white border-zinc-200 text-zinc-900'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-lg ${
                isNocturne
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg sm:text-xl">
                Copy Embed Code
              </h2>
              <p className="text-xs opacity-75 font-sans-ui">
                Embed this soliloquy directly into your blog, publication, or notes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Controls */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs font-sans-ui">
            <div>
              <label className="block font-medium opacity-80 mb-1.5">Card Style</label>
              <div className="flex rounded-lg border p-0.5 border-black/10 dark:border-white/10">
                <button
                  onClick={() => setEmbedType('card')}
                  className={`flex-1 py-1 px-2 rounded-md font-medium text-center transition-all ${
                    embedType === 'card'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  Featured Excerpt
                </button>
                <button
                  onClick={() => setEmbedType('full')}
                  className={`flex-1 py-1 px-2 rounded-md font-medium text-center transition-all ${
                    embedType === 'full'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  Extended Verse
                </button>
              </div>
            </div>

            <div>
              <label className="block font-medium opacity-80 mb-1.5">Theme Palette</label>
              <div className="flex rounded-lg border p-0.5 border-black/10 dark:border-white/10">
                {(['parchment', 'dark', 'minimal'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setEmbedTheme(t)}
                    className={`flex-1 py-1 px-1.5 rounded-md font-medium text-center capitalize transition-all text-[11px] ${
                      embedTheme === t
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Embed Code Block */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-75 font-sans-ui">
                HTML Embed Snippet
              </span>
              <span className="text-[11px] opacity-60">Responsive HTML & CSS</span>
            </div>
            <div className="relative">
              <textarea
                readOnly
                rows={5}
                value={embedSnippet}
                className="w-full p-3 font-mono text-[11px] leading-relaxed rounded-xl border bg-black/5 dark:bg-black/40 border-black/10 dark:border-white/10 focus:outline-none select-all"
              />
            </div>
          </div>

          {/* Copy CTA */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-xs opacity-70 font-sans-ui">
              <Eye className="w-3.5 h-3.5" />
              <span>Free, self-contained embed snippet</span>
            </div>
            <button
              onClick={handleCopy}
              className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Embed Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
