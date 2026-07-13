"use client";

import { useMemo, useState } from 'react';
import { Edit2, Filter, Frown, Meh, Play, Plus, Smile, Sparkles, Trash2 } from 'lucide-react';
import { createId, type FlashcardDifficulty, type WorkspaceFlashcard } from '@/lib/workspace-store';
import { useWorkspace } from '@/components/workspace-provider';

export default function Flashcards() {
  const { state, setState } = useWorkspace();
  const [collectionFilter, setCollectionFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | FlashcardDifficulty>('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [form, setForm] = useState({ front: '', back: '', topic: '', collectionId: '' });

  const topics = useMemo(() => Array.from(new Set(state.flashcards.map((card) => card.topic).filter(Boolean))), [state.flashcards]);

  const visibleFlashcards = useMemo(() => state.flashcards.filter((card) => {
    const matchesCollection = collectionFilter === 'all' || card.collectionId === collectionFilter;
    const matchesDifficulty = difficultyFilter === 'all' || card.status === difficultyFilter;
    const matchesTopic = topicFilter === 'all' || card.topic === topicFilter;
    return matchesCollection && matchesDifficulty && matchesTopic;
  }), [collectionFilter, difficultyFilter, state.flashcards, topicFilter]);

  const createFlashcard = () => {
    if (!form.front.trim() || !form.back.trim()) {
      return;
    }

    const nextCard: WorkspaceFlashcard = {
      id: createId('card'),
      front: form.front.trim(),
      back: form.back.trim(),
      status: 'new',
      topic: form.topic.trim() || 'General',
      collectionId: form.collectionId || undefined,
      sourceTitle: state.videos[0]?.title || 'Manual entry',
    };

    setState((current) => ({
      ...current,
      flashcards: [nextCard, ...current.flashcards],
    }));

    setForm({ front: '', back: '', topic: '', collectionId: '' });
    setEditingCardId(null);
  };

  const updateFlashcard = (id: string, patch: Partial<WorkspaceFlashcard>) => {
    setState((current) => ({
      ...current,
      flashcards: current.flashcards.map((card) => (card.id === id ? { ...card, ...patch } : card)),
    }));
  };

  const deleteFlashcard = (id: string) => {
    setState((current) => ({
      ...current,
      flashcards: current.flashcards.filter((card) => card.id !== id),
    }));
  };

  const generateFromLibrary = () => {
    const generated = state.videos.flatMap((video) => {
      const topics = video.topics.length > 0 ? video.topics : [video.title];

      return topics.slice(0, 2).map((topic) => ({
        id: createId('card'),
        front: `Explain ${topic}.`,
        back: video.notes || `Derived from ${video.title}.`,
        status: 'new' as FlashcardDifficulty,
        topic,
        collectionId: video.collectionIds[0],
        sourceTitle: video.title,
      }));
    });

    if (generated.length === 0) {
      return;
    }

    setState((current) => ({
      ...current,
      flashcards: [...generated, ...current.flashcards],
    }));
  };

  const selectedCard = state.flashcards.find((card) => card.id === editingCardId) ?? null;

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-8 p-6 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-headline-lg text-[32px] text-on-surface mb-2">Flashcards</h1>
          <p className="font-body-md text-[16px] text-on-surface-variant">Automatically generated cards that the user can review, edit, delete, and mark easy or hard.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={generateFromLibrary} className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low">
            <Sparkles className="h-4 w-4" /> Generate from Library
          </button>
          <button onClick={createFlashcard} className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2 text-sm font-medium text-on-primary-container transition-colors hover:bg-primary hover:text-on-primary">
            <Plus className="h-4 w-4" /> Add Card
          </button>
        </div>
      </div>

      <section className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            <textarea value={form.front} onChange={(event) => setForm((current) => ({ ...current, front: event.target.value }))} className="min-h-24 w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none" placeholder="Front of the flashcard" />
            <textarea value={form.back} onChange={(event) => setForm((current) => ({ ...current, back: event.target.value }))} className="min-h-28 w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none" placeholder="Back of the flashcard" />
          </div>
          <div className="space-y-3 rounded-2xl border border-outline-variant bg-surface p-4">
            <input value={form.topic} onChange={(event) => setForm((current) => ({ ...current, topic: event.target.value }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none" placeholder="Topic" />
            <select value={form.collectionId} onChange={(event) => setForm((current) => ({ ...current, collectionId: event.target.value }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none">
              <option value="">No collection</option>
              {state.collections.map((collection) => <option key={collection.id} value={collection.id}>{collection.name}</option>)}
            </select>
            <button onClick={createFlashcard} className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-surface-tint">Save Card</button>
            <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-3 text-sm text-on-surface-variant">Use the form to create manual cards, or generate cards from uploaded videos.</div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
        <div className="mb-6 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3">
            <Filter className="h-4 w-4 text-on-surface-variant" />
            <select value={collectionFilter} onChange={(event) => setCollectionFilter(event.target.value)} className="bg-transparent text-sm outline-none">
              <option value="all">All Collections</option>
              {state.collections.map((collection) => <option key={collection.id} value={collection.id}>{collection.name}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3">
            <Filter className="h-4 w-4 text-on-surface-variant" />
            <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value as typeof difficultyFilter)} className="bg-transparent text-sm outline-none">
              <option value="all">All Difficulties</option>
              <option value="new">New</option>
              <option value="easy">Easy</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3">
            <Filter className="h-4 w-4 text-on-surface-variant" />
            <select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)} className="bg-transparent text-sm outline-none">
              <option value="all">All Topics</option>
              {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
            </select>
          </label>
        </div>

        {visibleFlashcards.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleFlashcards.map((card) => (
              <div key={card.id} className="rounded-2xl border border-outline-variant bg-surface p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-secondary-container px-2.5 py-1 text-xs font-medium text-on-secondary-container">{card.topic}</span>
                  <button onClick={() => setEditingCardId(card.id)} className="text-on-surface-variant hover:text-primary"><Edit2 className="h-4 w-4" /></button>
                </div>

                <div className="mt-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <p className="text-sm font-medium text-on-surface">Question</p>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{card.front}</p>
                </div>
                <div className="mt-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <p className="text-sm font-medium text-on-surface">Answer</p>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{card.back}</p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-sm text-on-surface-variant">
                  <span>{card.sourceTitle}</span>
                  <span className="rounded-full border border-outline-variant px-2.5 py-1 text-xs">{card.status}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => updateFlashcard(card.id, { status: 'easy' })} className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-3 py-2 text-sm hover:bg-surface-container-high"><Smile className="h-4 w-4" /> Easy</button>
                  <button onClick={() => updateFlashcard(card.id, { status: 'hard' })} className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-3 py-2 text-sm hover:bg-surface-container-high"><Frown className="h-4 w-4" /> Hard</button>
                  <button onClick={() => updateFlashcard(card.id, { status: 'new' })} className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-3 py-2 text-sm hover:bg-surface-container-high"><Meh className="h-4 w-4" /> Reset</button>
                  <button onClick={() => deleteFlashcard(card.id)} className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-3 py-2 text-sm text-error hover:bg-error-container"><Trash2 className="h-4 w-4" /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface p-8 text-sm text-on-surface-variant">
            No flashcards match your filters. Generate cards from the library or add one manually.
          </div>
        )}
      </section>

      {selectedCard && (
        <section className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-semibold text-on-surface">Edit flashcard</h2>
              <p className="mt-1 text-sm text-on-surface-variant">Update the selected card before saving changes.</p>
            </div>
            <button onClick={() => setEditingCardId(null)} className="rounded-lg border border-outline-variant px-4 py-2 text-sm hover:bg-surface-container-highest">Close</button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <textarea value={selectedCard.front} onChange={(event) => updateFlashcard(selectedCard.id, { front: event.target.value })} className="min-h-28 w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none" />
            <textarea value={selectedCard.back} onChange={(event) => updateFlashcard(selectedCard.id, { back: event.target.value })} className="min-h-28 w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none" />
          </div>
        </section>
      )}

      {state.flashcards.length === 0 && (
        <section className="rounded-[2rem] border border-dashed border-outline-variant bg-surface-container-lowest p-6 text-sm text-on-surface-variant">
          No flashcards exist yet. Upload videos first, then generate cards from the library.
        </section>
      )}
    </div>
  );
}