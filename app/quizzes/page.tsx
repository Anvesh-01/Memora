"use client";

import { useMemo, useState } from 'react';
import { ArrowUpDown, CheckCircle2, Filter, History, LineChart, ListTodo, Sparkles, Timer } from 'lucide-react';
import { createId, type QuizType, type WorkspaceQuiz } from '@/lib/workspace-store';
import { useWorkspace } from '@/components/workspace-provider';

const quizTypes: QuizType[] = ['MCQ', 'True/False', 'Coding', 'Interview', 'Fill Blanks'];

export default function Quizzes() {
  const { state, setState } = useWorkspace();
  const [typeFilter, setTypeFilter] = useState<'all' | QuizType>('all');
  const [collectionFilter, setCollectionFilter] = useState('all');
  const [form, setForm] = useState({ title: '', type: 'MCQ' as QuizType, sourceTitle: '', questions: '10', duration: '10m', weakTopics: '' });

  const visibleQuizzes = useMemo(() => state.quizzes.filter((quiz) => {
    const matchesType = typeFilter === 'all' || quiz.type === typeFilter;
    const matchesCollection = collectionFilter === 'all' || quiz.sourceTitle.toLowerCase().includes(collectionFilter.toLowerCase());
    return matchesType && matchesCollection;
  }), [collectionFilter, state.quizzes, typeFilter]);

  const stats = useMemo(() => {
    const completed = state.quizzes.filter((quiz) => quiz.status === 'completed');
    const averageScore = completed.length ? Math.round(completed.reduce((total, quiz) => total + quiz.score, 0) / completed.length) : 0;
    const averageAccuracy = completed.length ? Math.round(completed.reduce((total, quiz) => total + quiz.accuracy, 0) / completed.length) : 0;
    const weakTopics = Array.from(new Set(completed.flatMap((quiz) => quiz.weakTopics)));

    return { averageScore, averageAccuracy, completed: completed.length, weakTopics };
  }, [state.quizzes]);

  const generateFromLibrary = () => {
    const generated = state.videos.filter((video) => video.status === 'ready').map((video) => ({
      id: createId('quiz'),
      title: `${video.title} Review`,
      type: 'MCQ' as QuizType,
      sourceTitle: video.title,
      questions: Math.max(5, video.topics.length * 2 || 5),
      duration: `${Math.max(5, video.topics.length * 3 || 10)}m`,
      score: 0,
      accuracy: 0,
      weakTopics: video.topics.slice(0, 3),
      status: 'new' as const,
    }));

    if (generated.length === 0) {
      return;
    }

    setState((current) => ({
      ...current,
      quizzes: [...generated, ...current.quizzes],
    }));
  };

  const createQuiz = () => {
    if (!form.title.trim()) {
      return;
    }

    const nextQuiz: WorkspaceQuiz = {
      id: createId('quiz'),
      title: form.title.trim(),
      type: form.type,
      sourceTitle: form.sourceTitle.trim() || state.videos[0]?.title || 'Library',
      questions: Number(form.questions) || 10,
      duration: form.duration.trim() || '10m',
      score: 0,
      accuracy: 0,
      weakTopics: form.weakTopics.split(',').map((topic) => topic.trim()).filter(Boolean),
      status: 'new',
    };

    setState((current) => ({
      ...current,
      quizzes: [nextQuiz, ...current.quizzes],
    }));

    setForm({ title: '', type: 'MCQ', sourceTitle: '', questions: '10', duration: '10m', weakTopics: '' });
  };

  const updateQuiz = (id: string, patch: Partial<WorkspaceQuiz>) => {
    setState((current) => ({
      ...current,
      quizzes: current.quizzes.map((quiz) => (quiz.id === id ? { ...quiz, ...patch } : quiz)),
    }));
  };

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-8 p-6 md:p-10">
      <div className="mb-2">
        <h1 className="font-display-lg text-[48px] text-on-background leading-tight">Quizzes</h1>
        <p className="mt-2 max-w-3xl text-[18px] text-on-surface-variant">Generated from uploaded videos, flashcards, and collections. The page updates as your learning data changes.</p>
      </div>

      <section className="grid gap-6 md:grid-cols-12">
        <div className="relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 md:col-span-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-3 py-1 text-sm text-on-surface-variant">
                <Sparkles className="h-4 w-4 text-primary" /> Recommended assessment
              </div>
              <h2 className="text-[32px] font-semibold text-on-surface">Build a quiz from your current learning set</h2>
              <p className="mt-2 max-w-2xl text-[16px] text-on-surface-variant">Pick a source, choose the type, and create assessments that reflect the videos and collections you actually upload.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
              <span className="rounded-full bg-secondary-container px-3 py-1 text-on-secondary-container">MCQ</span>
              <span className="rounded-full bg-secondary-container px-3 py-1 text-on-secondary-container">True/False</span>
              <span className="rounded-full bg-secondary-container px-3 py-1 text-on-secondary-container">Coding</span>
              <span className="rounded-full bg-secondary-container px-3 py-1 text-on-secondary-container">Interview</span>
              <span className="rounded-full bg-secondary-container px-3 py-1 text-on-secondary-container">Fill Blanks</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 md:col-span-4">
          <h3 className="mb-4 flex items-center gap-2 text-[22px] font-semibold text-on-surface"><LineChart className="h-5 w-5 text-primary" /> Performance overview</h3>
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-on-surface-variant">Average score</span>
                <span className="font-medium text-on-surface">{stats.averageScore}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-container">
                <div className="h-full rounded-full bg-primary" style={{ width: `${stats.averageScore}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-on-surface-variant">Average accuracy</span>
                <span className="font-medium text-on-surface">{stats.averageAccuracy}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-container">
                <div className="h-full rounded-full bg-secondary" style={{ width: `${stats.averageAccuracy}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-on-surface-variant">Assessments completed</span>
                <span className="font-medium text-on-surface">{stats.completed}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-outline-variant pt-5">
            <p className="mb-3 text-sm font-medium text-on-surface">Weak topics</p>
            <div className="flex flex-wrap gap-2">
              {stats.weakTopics.length > 0 ? stats.weakTopics.map((topic) => <span key={topic} className="rounded-full border border-outline-variant px-3 py-1 text-xs text-on-surface-variant">{topic}</span>) : <span className="text-sm text-on-surface-variant">No completed quizzes yet.</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-[22px] font-semibold text-on-surface">Create or filter quizzes</h3>
            <p className="mt-1 text-sm text-on-surface-variant">Generate a quiz from your library, or add a custom assessment manually.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={generateFromLibrary} className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"><Sparkles className="h-4 w-4" /> Generate from Library</button>
            <button onClick={createQuiz} className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2 text-sm font-medium text-on-primary-container transition-colors hover:bg-primary hover:text-on-primary"><ListTodo className="h-4 w-4" /> Save Quiz</button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none" placeholder="Quiz title" />
            <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as QuizType }))} className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none">
              {quizTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <input value={form.sourceTitle} onChange={(event) => setForm((current) => ({ ...current, sourceTitle: event.target.value }))} className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none" placeholder="Source title" />
            <input value={form.questions} onChange={(event) => setForm((current) => ({ ...current, questions: event.target.value }))} className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none" placeholder="Questions" />
            <input value={form.duration} onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))} className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none" placeholder="Duration" />
            <input value={form.weakTopics} onChange={(event) => setForm((current) => ({ ...current, weakTopics: event.target.value }))} className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm outline-none md:col-span-2 lg:col-span-3 xl:col-span-5" placeholder="Weak topics, comma separated" />
          </div>

          <aside className="space-y-3 rounded-2xl border border-outline-variant bg-surface p-4">
            <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3">
              <Filter className="h-4 w-4 text-on-surface-variant" />
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as typeof typeFilter)} className="w-full bg-transparent text-sm outline-none">
                <option value="all">All Types</option>
                {quizTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3">
              <ArrowUpDown className="h-4 w-4 text-on-surface-variant" />
              <select value={collectionFilter} onChange={(event) => setCollectionFilter(event.target.value)} className="w-full bg-transparent text-sm outline-none">
                <option value="all">All Sources</option>
                {state.collections.map((collection) => <option key={collection.id} value={collection.name}>{collection.name}</option>)}
              </select>
            </label>
            <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
              Quiz data is derived from your uploaded videos, collections, and existing assessments.
            </div>
          </aside>
        </div>
      </section>

      <section className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-[22px] font-semibold text-on-surface">Available quizzes</h3>
            <p className="mt-1 text-sm text-on-surface-variant">Generated assessments and completed quizzes are shown here.</p>
          </div>
          <div className="rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm text-on-surface-variant">{visibleQuizzes.length} quizzes</div>
        </div>

        {visibleQuizzes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleQuizzes.map((quiz) => (
              <article key={quiz.id} className="flex flex-col rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-surface-container-high px-3 py-1 text-xs text-on-surface-variant">{quiz.type}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${quiz.status === 'completed' ? 'bg-primary/10 text-primary' : 'bg-secondary-container text-on-secondary-container'}`}>{quiz.status}</span>
                </div>

                <h4 className="mt-4 text-[20px] font-semibold text-on-surface">{quiz.title}</h4>
                <p className="mt-2 text-sm text-on-surface-variant">Source: {quiz.sourceTitle}</p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-on-surface-variant">
                  <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3"><ListTodo className="h-4 w-4 text-primary" /><p className="mt-2 text-on-surface">{quiz.questions} questions</p></div>
                  <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3"><Timer className="h-4 w-4 text-primary" /><p className="mt-2 text-on-surface">{quiz.duration}</p></div>
                  <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3"><CheckCircle2 className="h-4 w-4 text-primary" /><p className="mt-2 text-on-surface">{quiz.score}% score</p></div>
                  <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3"><LineChart className="h-4 w-4 text-primary" /><p className="mt-2 text-on-surface">{quiz.accuracy}% accuracy</p></div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {quiz.weakTopics.length > 0 ? quiz.weakTopics.map((topic) => <span key={topic} className="rounded-full border border-outline-variant px-2.5 py-1 text-xs text-on-surface-variant">{topic}</span>) : <span className="text-sm text-on-surface-variant">No weak topics recorded.</span>}
                </div>

                <div className="mt-auto pt-5 flex gap-2">
                  <button onClick={() => updateQuiz(quiz.id, { status: 'completed', score: Math.max(quiz.score, 80), accuracy: Math.max(quiz.accuracy, 80) })} className="flex-1 rounded-lg border border-outline-variant px-3 py-2 text-sm hover:bg-surface-container-highest">Mark Completed</button>
                  <button onClick={() => updateQuiz(quiz.id, { score: Math.min(100, quiz.score + 5), accuracy: Math.min(100, quiz.accuracy + 5) })} className="flex-1 rounded-lg border border-outline-variant px-3 py-2 text-sm hover:bg-surface-container-highest">Retake</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface p-8 text-sm text-on-surface-variant">No quizzes match your filters yet. Generate one from the library or save a custom quiz.</div>
        )}
      </section>

      {state.quizzes.length === 0 && (
        <section className="rounded-[2rem] border border-dashed border-outline-variant bg-surface-container-lowest p-6 text-sm text-on-surface-variant">
          No quizzes exist yet. Add videos first, then generate assessments from those sources.
        </section>
      )}
    </div>
  );
}