"use client";

import { useMemo, useState } from 'react';
import { Bot, Library, MessageSquareText, Send, Video } from 'lucide-react';
import { createId } from '@/lib/workspace-store';
import { useWorkspace } from '@/components/workspace-provider';

function buildAnswer(question: string, mode: 'Current Video' | 'Collection' | 'Entire Library', videoTitle: string | null, collectionName: string | null, librarySize: number) {
  const subject = mode === 'Current Video' ? videoTitle ?? 'the current video' : mode === 'Collection' ? collectionName ?? 'the selected collection' : 'the entire library';

  const opening = `Based on ${subject}, here is the best answer I can assemble from your stored learning data.`;
  const followUp = question.trim() ? `You asked: "${question.trim()}".` : 'Ask a question to begin.';
  const sourceNote = librarySize > 0 ? `I found ${librarySize} uploaded resource${librarySize === 1 ? '' : 's'} that can be used as sources.` : 'Add videos or collections to generate grounded answers, sources, and timestamps.';

  return `${opening} ${followUp} ${sourceNote}`;
}

function pickRelatedVideos(question: string, mode: 'Current Video' | 'Collection' | 'Entire Library', currentVideoTitle: string | null, selectedCollectionName: string | null, videoTitles: string[]) {
  const lowerQuestion = question.toLowerCase();
  const explicitMatches = videoTitles.filter((title) => lowerQuestion.includes(title.toLowerCase()));

  if (explicitMatches.length > 0) {
    return explicitMatches.slice(0, 3);
  }

  if (mode === 'Current Video' && currentVideoTitle) {
    return [currentVideoTitle];
  }

  if (mode === 'Collection' && selectedCollectionName) {
    return videoTitles.filter((title) => title.toLowerCase().includes(selectedCollectionName.toLowerCase())).slice(0, 3);
  }

  return videoTitles.slice(0, 3);
}

export default function AskAIPage() {
  const { state, setState } = useWorkspace();
  const [mode, setMode] = useState<'Current Video' | 'Collection' | 'Entire Library'>('Current Video');
  const [question, setQuestion] = useState('Explain OAuth.');
  const [currentVideoId, setCurrentVideoId] = useState(state.selectedVideoId ?? state.videos[0]?.id ?? '');
  const [collectionId, setCollectionId] = useState(state.collections[0]?.id ?? '');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(state.conversations[0]?.id ?? null);

  const selectedVideo = useMemo(() => state.videos.find((video) => video.id === currentVideoId) ?? state.videos[0] ?? null, [currentVideoId, state.videos]);
  const selectedCollection = useMemo(() => state.collections.find((collection) => collection.id === collectionId) ?? state.collections[0] ?? null, [collectionId, state.collections]);
  const selectedConversation = useMemo(() => state.conversations.find((conversation) => conversation.id === selectedConversationId) ?? state.conversations[0] ?? null, [selectedConversationId, state.conversations]);

  const submitQuestion = () => {
    const videoTitles = state.videos.map((video) => video.title);
    const relatedVideos = pickRelatedVideos(question, mode, selectedVideo?.title ?? null, selectedCollection?.name ?? null, videoTitles);
    const answer = buildAnswer(question, mode, selectedVideo?.title ?? null, selectedCollection?.name ?? null, state.videos.length);
    const sources = [selectedVideo?.title, selectedCollection?.name, ...relatedVideos].filter(Boolean) as string[];

    const nextConversation = {
      id: createId('chat'),
      mode,
      question: question.trim() || 'Untitled question',
      answer,
      timestamp: new Date().toLocaleString(),
      relatedVideos,
      sources: Array.from(new Set(sources)),
    };

    setState((current) => ({
      ...current,
      conversations: [nextConversation, ...current.conversations],
      recentQuestions: [nextConversation.question, ...current.recentQuestions].slice(0, 8),
    }));

    setSelectedConversationId(nextConversation.id);
    setQuestion('');
  };

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-8 p-6 md:p-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display-lg text-[48px] leading-tight text-on-background">Ask AI</h1>
        <p className="max-w-4xl text-[18px] text-on-surface-variant">Most used page. Ask a question about the current video, a collection, or your entire library, then review the answer, timestamp, related videos, and sources.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-5">
          <div className="flex items-center gap-2 border-b border-outline-variant pb-4">
            <MessageSquareText className="h-5 w-5 text-primary" />
            <h2 className="text-[20px] font-semibold text-on-surface">Chat history</h2>
          </div>

          <div className="mt-4 space-y-3">
            {state.conversations.length > 0 ? state.conversations.map((conversation) => (
              <button key={conversation.id} onClick={() => setSelectedConversationId(conversation.id)} className={`w-full rounded-2xl border p-4 text-left transition-colors ${selectedConversation?.id === conversation.id ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface hover:border-primary'}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-secondary-container px-2.5 py-1 text-xs text-on-secondary-container">{conversation.mode}</span>
                  <span className="text-xs text-on-surface-variant">{conversation.timestamp}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-on-surface">{conversation.question}</p>
              </button>
            )) : (
              <div className="rounded-2xl border border-dashed border-outline-variant bg-surface p-5 text-sm text-on-surface-variant">No chat history yet. Ask a question to start the conversation list.</div>
            )}
          </div>
        </aside>

        <section className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h2 className="text-[22px] font-semibold text-on-surface">Current question</h2>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <button onClick={() => setMode('Current Video')} className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${mode === 'Current Video' ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container-highest'}`}>Current Video</button>
                <button onClick={() => setMode('Collection')} className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${mode === 'Collection' ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container-highest'}`}>Collection</button>
                <button onClick={() => setMode('Entire Library')} className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${mode === 'Entire Library' ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container-highest'}`}>Entire Library</button>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <label className="rounded-xl border border-outline-variant bg-surface px-4 py-3">
                  <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-on-surface-variant">Source video</span>
                  <select value={currentVideoId} onChange={(event) => setCurrentVideoId(event.target.value)} className="w-full bg-transparent text-sm outline-none">
                    {state.videos.length > 0 ? state.videos.map((video) => <option key={video.id} value={video.id}>{video.title}</option>) : <option value="">No videos yet</option>}
                  </select>
                </label>

                <label className="rounded-xl border border-outline-variant bg-surface px-4 py-3">
                  <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-on-surface-variant">Source collection</span>
                  <select value={collectionId} onChange={(event) => setCollectionId(event.target.value)} className="w-full bg-transparent text-sm outline-none">
                    {state.collections.length > 0 ? state.collections.map((collection) => <option key={collection.id} value={collection.id}>{collection.name}</option>) : <option value="">No collections yet</option>}
                  </select>
                </label>
              </div>

              <div className="mt-4 rounded-2xl border border-outline-variant bg-surface p-4">
                <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="min-h-28 w-full bg-transparent text-sm outline-none" placeholder="Ask a question about a video, collection, or the whole library" />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-on-surface-variant">Example: Explain OAuth.</p>
                  <button onClick={submitQuestion} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-surface-tint">
                    <Send className="h-4 w-4" /> Send
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[280px] rounded-2xl border border-outline-variant bg-surface p-4">
              <h3 className="text-sm font-medium text-on-surface">Data scope</h3>
              <div className="mt-3 space-y-3 text-sm text-on-surface-variant">
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3">Videos: {state.videos.length}</div>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3">Collections: {state.collections.length}</div>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3">Flashcards: {state.flashcards.length}</div>
                <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3">Quizzes: {state.quizzes.length}</div>
              </div>
            </div>
          </div>

          {selectedConversation ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                  <Library className="h-4 w-4 text-primary" /> Answer
                </div>
                <h3 className="mt-3 text-[20px] font-semibold text-on-surface">{selectedConversation.question}</h3>
                <p className="mt-3 text-sm leading-7 text-on-surface-variant">{selectedConversation.answer}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-on-surface-variant">Timestamp</p>
                <p className="mt-1 text-sm text-on-surface">{selectedConversation.timestamp}</p>
              </div>

              <div className="space-y-4 rounded-2xl border border-outline-variant bg-surface p-5">
                <div>
                  <h4 className="text-sm font-medium text-on-surface">Related videos</h4>
                  <div className="mt-3 space-y-2">
                    {selectedConversation.relatedVideos.length > 0 ? selectedConversation.relatedVideos.map((title) => (
                      <div key={title} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-sm text-on-surface-variant">{title}</div>
                    )) : <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-3 text-sm text-on-surface-variant">No related videos found.</div>}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-on-surface">Sources</h4>
                  <div className="mt-3 space-y-2">
                    {selectedConversation.sources.length > 0 ? selectedConversation.sources.map((source) => (
                      <div key={source} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-sm text-on-surface-variant">{source}</div>
                    )) : <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-3 text-sm text-on-surface-variant">No sources yet.</div>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-outline-variant bg-surface p-6 text-sm text-on-surface-variant">
              Ask a question to generate an answer, timestamp, related videos, and sources.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}