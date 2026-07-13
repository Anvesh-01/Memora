"use client";

import { useMemo, useState } from 'react';
import { BrainCircuit, FolderPlus, Plus, Video, FileText, GalleryVertical, HelpCircle, Tag } from 'lucide-react';
import { createId } from '@/lib/workspace-store';
import { useWorkspace } from '@/components/workspace-provider';

export default function Collections() {
  const { state, setState } = useWorkspace();
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(state.collections[0]?.id ?? null);
  const [form, setForm] = useState({ name: '', description: '', tags: '' });

  const selectedCollection = useMemo(
    () => state.collections.find((collection) => collection.id === selectedCollectionId) ?? state.collections[0] ?? null,
    [selectedCollectionId, state.collections],
  );

  const collectionSummary = useMemo(() => {
    return state.collections.map((collection) => {
      const videos = state.videos.filter((video) => video.collectionIds.includes(collection.id));
      const flashcards = state.flashcards.filter((card) => card.collectionId === collection.id);
      const quizzes = state.quizzes.filter((quiz) => quiz.sourceTitle.includes(collection.name));

      return {
        ...collection,
        videos,
        flashcards,
        quizzes,
        notes: videos.map((video) => video.notes).filter(Boolean),
      };
    });
  }, [state.collections, state.flashcards, state.quizzes, state.videos]);

  const createCollection = () => {
    if (!form.name.trim()) {
      return;
    }

    const nextCollection = {
      id: createId('collection'),
      name: form.name.trim(),
      description: form.description.trim(),
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      color: ['#0749a1', '#0f766e', '#a855f7', '#ea580c', '#14532d'][state.collections.length % 5],
    };

    setState((current) => ({
      ...current,
      collections: [nextCollection, ...current.collections],
    }));

    setSelectedCollectionId(nextCollection.id);
    setForm({ name: '', description: '', tags: '' });
  };

  const linkedVideos = selectedCollection ? state.videos.filter((video) => video.collectionIds.includes(selectedCollection.id)) : [];
  const linkedFlashcards = selectedCollection ? state.flashcards.filter((card) => card.collectionId === selectedCollection.id) : [];
  const linkedQuizzes = selectedCollection ? state.quizzes.filter((quiz) => quiz.sourceTitle.toLowerCase().includes(selectedCollection.name.toLowerCase())) : [];

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-8 p-6 md:p-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display-lg text-[48px] leading-tight text-on-background">Collections</h1>
        <p className="max-w-3xl text-[18px] text-on-surface-variant">Organize videos into focused sets like AI, Python, Django, JavaScript, Machine Learning, Interview Prep, or College.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-semibold text-on-surface">Your collections</h2>
              <p className="mt-1 text-sm text-on-surface-variant">Each collection can hold videos, notes, flashcards, and quizzes.</p>
            </div>
            <div className="rounded-2xl border border-outline-variant bg-surface px-4 py-3 text-sm text-on-surface-variant">
              {state.collections.length} total collections
            </div>
          </div>

          {collectionSummary.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {collectionSummary.map((collection) => {
                const isActive = collection.id === selectedCollection?.id;

                return (
                  <button
                    key={collection.id}
                    onClick={() => setSelectedCollectionId(collection.id)}
                    className={`flex h-full flex-col rounded-2xl border p-5 text-left transition-colors ${isActive ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface hover:border-primary'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[20px] font-semibold text-on-surface">{collection.name}</h3>
                        <p className="mt-1 text-sm text-on-surface-variant">{collection.description || 'No description yet.'}</p>
                      </div>
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: collection.color }} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {collection.tags.length > 0 ? collection.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-outline-variant bg-surface px-2.5 py-1 text-xs text-on-surface-variant">
                          <Tag className="h-3 w-3" /> {tag}
                        </span>
                      )) : (
                        <span className="text-sm text-on-surface-variant">No tags yet.</span>
                      )}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-on-surface-variant">
                      <div className="rounded-xl border border-outline-variant bg-surface p-3"><Video className="h-4 w-4 text-primary" /><p className="mt-2 text-on-surface">{collection.videos.length} videos</p></div>
                      <div className="rounded-xl border border-outline-variant bg-surface p-3"><FileText className="h-4 w-4 text-primary" /><p className="mt-2 text-on-surface">{collection.notes.length} notes</p></div>
                      <div className="rounded-xl border border-outline-variant bg-surface p-3"><GalleryVertical className="h-4 w-4 text-primary" /><p className="mt-2 text-on-surface">{collection.flashcards.length} flashcards</p></div>
                      <div className="rounded-xl border border-outline-variant bg-surface p-3"><HelpCircle className="h-4 w-4 text-primary" /><p className="mt-2 text-on-surface">{collection.quizzes.length} quizzes</p></div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-outline-variant bg-surface p-8 text-sm text-on-surface-variant">
              No collections yet. Create your first collection to organize videos by subject.
            </div>
          )}

          {selectedCollection && (
            <div className="mt-6 rounded-2xl border border-outline-variant bg-surface p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="text-[22px] font-semibold text-on-surface">{selectedCollection.name}</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">{selectedCollection.description || 'No description provided.'}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-3 py-1 text-sm text-on-surface-variant">
                  <BrainCircuit className="h-4 w-4 text-primary" /> Collection overview
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <p className="text-sm text-on-surface-variant">Videos</p>
                  <p className="mt-2 text-2xl font-semibold text-on-surface">{linkedVideos.length}</p>
                </div>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <p className="text-sm text-on-surface-variant">Flashcards</p>
                  <p className="mt-2 text-2xl font-semibold text-on-surface">{linkedFlashcards.length}</p>
                </div>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                  <p className="text-sm text-on-surface-variant">Quizzes</p>
                  <p className="mt-2 text-2xl font-semibold text-on-surface">{linkedQuizzes.length}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                <div className="rounded-xl border border-outline-variant bg-surface p-4">
                  <h4 className="text-sm font-medium text-on-surface">Videos</h4>
                  <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
                    {linkedVideos.length > 0 ? linkedVideos.map((video) => <li key={video.id}>{video.title}</li>) : <li>No videos yet.</li>}
                  </ul>
                </div>
                <div className="rounded-xl border border-outline-variant bg-surface p-4">
                  <h4 className="text-sm font-medium text-on-surface">Notes</h4>
                  <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
                    {linkedVideos.some((video) => video.notes) ? linkedVideos.filter((video) => video.notes).map((video) => <li key={video.id}>{video.notes}</li>) : <li>No notes yet.</li>}
                  </ul>
                </div>
                <div className="rounded-xl border border-outline-variant bg-surface p-4">
                  <h4 className="text-sm font-medium text-on-surface">Flashcards & quizzes</h4>
                  <ul className="mt-3 space-y-2 text-sm text-on-surface-variant">
                    {linkedFlashcards.length > 0 ? linkedFlashcards.map((card) => <li key={card.id}>{card.front}</li>) : <li>No flashcards yet.</li>}
                    {linkedQuizzes.length > 0 ? linkedQuizzes.map((quiz) => <li key={quiz.id}>{quiz.title}</li>) : <li>No quizzes yet.</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-4 rounded-[2rem] border border-outline-variant bg-surface p-5 xl:sticky xl:top-6">
          <div>
            <div className="flex items-center gap-2">
              <FolderPlus className="h-5 w-5 text-primary" />
              <h3 className="text-[18px] font-semibold text-on-surface">Create collection</h3>
            </div>
            <p className="mt-1 text-sm text-on-surface-variant">Start a new collection for AI, Python, Django, JavaScript, Machine Learning, Interview Prep, or College.</p>
          </div>

          <div className="space-y-3">
            <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none" placeholder="Collection name" />
            <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="min-h-28 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none" placeholder="Description" />
            <input value={form.tags} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none" placeholder="Tags, comma separated" />
            <button onClick={createCollection} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-surface-tint">
              <Plus className="h-4 w-4" /> Add Collection
            </button>
          </div>

          {state.collections.length === 0 && (
            <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
              Collections are empty until you add one here or assign videos to a collection from the Library.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}