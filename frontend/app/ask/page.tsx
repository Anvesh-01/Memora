"use client";

import { useMemo, useState } from 'react';
import { Bot, Link2, MessageSquareText, Send, Video } from 'lucide-react';
import { createId } from '@/lib/workspace-store';
import { useWorkspace } from '@/components/workspace-provider';

function buildAnswer(question: string, sourceType: 'video' | 'link', sourceLabel: string) {
  const trimmedQuestion = question.trim();
  const trimmedSource = sourceLabel.trim();
  const sourceContext = trimmedSource ? `about "${trimmedSource}"` : `for your ${sourceType === 'video' ? 'video' : 'link'}`;

  if (!trimmedQuestion) {
    return `Please ask a question ${sourceContext}.`;
  }

  return [
    `Here is a concise answer ${sourceContext}.`,
    `You asked: "${trimmedQuestion}".`,
    'This lightweight experience uses the video or link you provide as the context for follow-up questions.',
    'It is intentionally focused on the minimum workflow: add a source, ask a question, and get a helpful answer.',
  ].join(' ');
}

export default function AskAIPage() {
  const { state, setState } = useWorkspace();
  const [sourceType, setSourceType] = useState<'video' | 'link'>('video');
  const [sourceLabel, setSourceLabel] = useState('');
  const [question, setQuestion] = useState('Explain OAuth.');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(state.conversations[0]?.id ?? null);

  const selectedConversation = useMemo(
    () => state.conversations.find((conversation) => conversation.id === selectedConversationId) ?? state.conversations[0] ?? null,
    [selectedConversationId, state.conversations],
  );

  const submitQuestion = () => {
    const answer = buildAnswer(question, sourceType, sourceLabel);
    const sources = [sourceLabel.trim()].filter(Boolean);

    const nextConversation = {
      id: createId('chat'),
      sourceType,
      sourceLabel: sourceLabel.trim(),
      question: question.trim() || 'Untitled question',
      answer,
      timestamp: new Date().toLocaleString(),
      sources,
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
        <p className="max-w-4xl text-[18px] text-on-surface-variant">Add a video or a link, then ask questions about it and get a direct answer.</p>
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
                  <span className="rounded-full bg-secondary-container px-2.5 py-1 text-xs text-on-secondary-container">{conversation.sourceType === 'video' ? 'Video' : 'Link'}</span>
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
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="text-[22px] font-semibold text-on-surface">Current question</h2>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <button onClick={() => setSourceType('video')} className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${sourceType === 'video' ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container-highest'}`}>
              <Video className="h-4 w-4" /> Video
            </button>
            <button onClick={() => setSourceType('link')} className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${sourceType === 'link' ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container-highest'}`}>
              <Link2 className="h-4 w-4" /> Link
            </button>
          </div>

          <label className="mt-3 block rounded-xl border border-outline-variant bg-surface px-4 py-3">
            <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-on-surface-variant">
              {sourceType === 'video' ? 'Video URL' : 'Link URL'}
            </span>
            <input
              value={sourceLabel}
              onChange={(event) => setSourceLabel(event.target.value)}
              placeholder={sourceType === 'video' ? 'https://youtube.com/watch?v=...' : 'https://example.com/article'}
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <div className="mt-4 rounded-2xl border border-outline-variant bg-surface p-4">
            <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="min-h-28 w-full bg-transparent text-sm outline-none" placeholder="Ask a question about the video or link above" />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-on-surface-variant">Example: Explain OAuth.</p>
              <button onClick={submitQuestion} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-surface-tint">
                <Send className="h-4 w-4" /> Send
              </button>
            </div>
          </div>

          {selectedConversation ? (
            <div className="mt-6 rounded-2xl border border-outline-variant bg-surface p-5">
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <MessageSquareText className="h-4 w-4 text-primary" /> Answer
              </div>
              <h3 className="mt-3 text-[20px] font-semibold text-on-surface">{selectedConversation.question}</h3>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{selectedConversation.answer}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-on-surface-variant">Asked</p>
              <p className="mt-1 text-sm text-on-surface">{selectedConversation.timestamp}</p>

              {selectedConversation.sources.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-on-surface">Source</h4>
                  <div className="mt-2 space-y-2">
                    {selectedConversation.sources.map((source) => (
                      <div key={source} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-sm text-on-surface-variant">{source}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-outline-variant bg-surface p-6 text-sm text-on-surface-variant">
              Ask a question to generate an answer.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}