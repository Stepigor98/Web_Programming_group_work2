import React from 'react';
import {
  X,
  Plus,
  BookMarked,
  Check,
  FolderPlus,
  Trash2,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Anthology } from '../types';
import { POEM_ID, POEM_METADATA } from '../data/poemData';

interface AnthologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  anthologies: Anthology[];
  onTogglePoemInAnthology: (anthologyId: string) => void;
  onCreateAnthology: (title: string, description: string, themeColor?: string) => void;
  onDeleteAnthology: (id: string) => void;
  onUpdateNote: (anthologyId: string, note: string) => void;
  isNocturne: boolean;
  isParchment: boolean;
}

export const AnthologyModal: React.FC<AnthologyModalProps> = ({
  isOpen,
  onClose,
  anthologies,
  onTogglePoemInAnthology,
  onCreateAnthology,
  onDeleteAnthology,
  onUpdateNote,
  isNocturne,
  isParchment,
}) => {
  const [newTitle, setNewTitle] = React.useState('');
  const [newDesc, setNewDesc] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'manage' | 'notes'>('manage');
  const [selectedAnthologyForNote, setSelectedAnthologyForNote] = React.useState<string>(
    anthologies[0]?.id || ''
  );
  const [noteText, setNoteText] = React.useState('');

  React.useEffect(() => {
    const selected = anthologies.find((a) => a.id === selectedAnthologyForNote);
    if (selected) {
      setNoteText(selected.notes || '');
    }
  }, [selectedAnthologyForNote, anthologies]);

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onCreateAnthology(newTitle.trim(), newDesc.trim());
    setNewTitle('');
    setNewDesc('');
    setIsCreating(false);
  };

  const handleSaveNote = () => {
    if (selectedAnthologyForNote) {
      onUpdateNote(selectedAnthologyForNote, noteText);
    }
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
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-lg ${
                isNocturne
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg sm:text-xl">
                Poetry Anthologies
              </h2>
              <p className="text-xs opacity-75 font-sans-ui">
                Save & categorize “Hamlet, Act III, Scene I [To be, or not to be]”
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

        {/* Tab Selection */}
        <div className="px-6 pt-3 border-b border-black/5 dark:border-white/5 flex gap-4 text-xs font-sans-ui font-medium">
          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'manage'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-semibold'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            My Anthologies ({anthologies.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-2 border-b-2 transition-all ${
              activeTab === 'notes'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400 font-semibold'
                : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            Anthology Margin Notes & Reflections
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {activeTab === 'manage' ? (
            <>
              <div className="space-y-3">
                {anthologies.map((anthology) => {
                  const hasPoem = anthology.poemIds.includes(POEM_ID);
                  return (
                    <div
                      key={anthology.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        hasPoem
                          ? isNocturne
                            ? 'bg-amber-950/20 border-amber-500/40 ring-1 ring-amber-500/20'
                            : isParchment
                            ? 'bg-amber-50/80 border-amber-800/30 ring-1 ring-amber-800/10'
                            : 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-200'
                          : isNocturne
                          ? 'bg-zinc-800/40 border-zinc-800'
                          : isParchment
                          ? 'bg-stone-100/50 border-stone-200'
                          : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm font-sans-ui">
                            {anthology.title}
                          </h3>
                          {hasPoem && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> Included
                            </span>
                          )}
                        </div>
                        {anthology.description && (
                          <p className="text-xs opacity-75 mt-0.5 leading-relaxed">
                            {anthology.description}
                          </p>
                        )}
                        <div className="text-[11px] opacity-60 mt-2 flex items-center gap-3 font-sans-ui">
                          <span>{anthology.poemIds.length} piece{anthology.poemIds.length === 1 ? '' : 's'}</span>
                          <span>•</span>
                          <span>Created {anthology.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onTogglePoemInAnthology(anthology.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                            hasPoem
                              ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600'
                              : 'bg-amber-600 text-white hover:bg-amber-500 font-semibold shadow-sm'
                          }`}
                        >
                          {hasPoem ? (
                            <>Remove</>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" /> Add Poem
                            </>
                          )}
                        </button>
                        {anthology.id !== 'renaissance-tragedies' && (
                          <button
                            onClick={() => onDeleteAnthology(anthology.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 opacity-70 hover:opacity-100 transition-opacity"
                            title="Delete Anthology"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Anthology Toggle / Form */}
              {isCreating ? (
                <form
                  onSubmit={handleCreateSubmit}
                  className={`p-4 rounded-xl border mt-4 space-y-3 ${
                    isNocturne
                      ? 'bg-zinc-800/60 border-zinc-700'
                      : isParchment
                      ? 'bg-white border-stone-300'
                      : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-80 font-sans-ui">
                      Create New Anthology
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="text-xs opacity-60 hover:opacity-100"
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 opacity-80">
                      Anthology Title
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g., Elizabethan Masterworks, Death & Fate..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 opacity-80">
                      Description / Editorial Focus
                    </label>
                    <textarea
                      rows={2}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Theme, literary notes, or personal collection purpose..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="px-3 py-1 text-xs rounded-lg opacity-70 hover:opacity-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-medium bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors shadow-sm"
                    >
                      Save & Add Poem
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsCreating(true)}
                  className={`w-full py-2.5 px-4 rounded-xl border border-dashed flex items-center justify-center gap-2 text-xs font-medium transition-all opacity-80 hover:opacity-100 ${
                    isNocturne
                      ? 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/40'
                      : isParchment
                      ? 'border-stone-400 hover:border-stone-600 hover:bg-stone-100'
                      : 'border-zinc-300 hover:border-zinc-500 hover:bg-zinc-50'
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Create a New Custom Anthology</span>
                </button>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1 opacity-80 font-sans-ui">
                  Select Anthology to Edit Marginalia:
                </label>
                <select
                  value={selectedAnthologyForNote}
                  onChange={(e) => setSelectedAnthologyForNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans-ui"
                >
                  {anthologies.map((a) => (
                    <option key={a.id} value={a.id} className="bg-zinc-900 text-white">
                      {a.title} {a.poemIds.includes(POEM_ID) ? '(Includes Hamlet)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 opacity-80 font-sans-ui flex items-center justify-between">
                  <span>Reader’s Study Notes & Marginalia</span>
                  <span className="text-[11px] opacity-60">Auto-saved to local memory</span>
                </label>
                <textarea
                  rows={6}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Record your personal reflections, staging notes, thematic parallels, or memorize cues for Hamlet's speech..."
                  className="w-full p-3 text-xs font-editorial leading-relaxed rounded-xl border bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  className="px-4 py-1.5 text-xs font-medium bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Marginalia Note</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs opacity-75 font-sans-ui">
          <span>{POEM_METADATA.title}</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
