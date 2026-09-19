import React from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Twitter,
  Facebook,
  ExternalLink,
  Quote,
} from 'lucide-react';
import { POEM_METADATA } from '../data/poemData';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlatform?: 'facebook' | 'twitter' | 'tumblr';
  isNocturne: boolean;
  isParchment: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  isNocturne,
  isParchment,
}) => {
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [copiedQuote, setCopiedQuote] = React.useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ai.studio';
  const famousQuote = `“To be, or not to be: that is the question: Whether ’tis nobler in the mind to suffer the slings and arrows of outrageous fortune...” — William Shakespeare, Hamlet`;

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `“To be, or not to be: that is the question...” — William Shakespeare, Hamlet (Act III, Scene I)`
    );
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareTumblr = () => {
    const quote = encodeURIComponent(famousQuote);
    const source = encodeURIComponent(`William Shakespeare, Hamlet (Act III, Scene I)`);
    const url = encodeURIComponent(currentUrl);
    window.open(
      `https://www.tumblr.com/widgets/share/tool?posttype=quote&content=${quote}&source=${source}&canonicalUrl=${url}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(famousQuote);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden transition-colors duration-200 ${
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
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg">
                Share this Work
              </h2>
              <p className="text-xs opacity-75 font-sans-ui">
                {POEM_METADATA.title}
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

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Direct Platforms */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-75 font-sans-ui block mb-1">
              Social Platforms
            </span>
            <button
              onClick={handleShareFacebook}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs font-medium font-sans-ui"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Share on Facebook</div>
                  <div className="opacity-60 text-[11px]">Post to timeline or group</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={handleShareTwitter}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs font-medium font-sans-ui"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black dark:bg-zinc-800 text-white flex items-center justify-center">
                  <Twitter className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Share on Twitter (X)</div>
                  <div className="opacity-60 text-[11px]">Tweet quote with link</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={handleShareTumblr}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-xs font-medium font-sans-ui"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#36465d] text-white flex items-center justify-center font-serif font-bold text-base">
                  t
                </div>
                <div className="text-left">
                  <div className="font-semibold">Share on Tumblr</div>
                  <div className="opacity-60 text-[11px]">Post as formatted quotation</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </button>
          </div>

          {/* Quick Copy Link and Quote */}
          <div className="pt-2 border-t border-black/5 dark:border-white/10 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied' : 'Copy Page Link'}</span>
              </button>

              <button
                onClick={handleCopyQuote}
                className="flex-1 py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Quote className="w-3.5 h-3.5" />}
                <span>{copiedQuote ? 'Quote Copied' : 'Copy Famous Quote'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
