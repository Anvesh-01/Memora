"use client";

import Link from 'next/link';
import { useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import { ArrowRight, BarChart3, Brain, CalendarClock, ChevronRight, Clock3, History, Sparkles, TrendingUp, Video } from 'lucide-react';
import { useWorkspace } from '@/components/workspace-provider';
import { summarizeWorkspace } from '@/lib/workspace-store';

function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-outline-variant bg-surface p-6 text-sm text-on-surface-variant">{children}</div>;
}

export default function Dashboard() {
  const { user } = useUser();
  const { state } = useWorkspace();
  const summary = useMemo(() => summarizeWorkspace(state), [state]);
  const recentVideos = useMemo(() => [...state.videos].sort((left, right) => right.addedAt.localeCompare(left.addedAt)).slice(0, 3), [state.videos]);
  const continueLearning = useMemo(() => state.videos.filter((video) => video.status === 'ready').slice(0, 3).map((video, index) => ({
    id: video.id,
    title: video.title,
    progress: Math.max(20, 100 - index * 20),
    nextStep: video.topics[0] ? `Review ${video.topics[0]}` : 'Resume the video',
  })), [state.videos]);
  const recommendations = useMemo(() => {
    const items: string[] = [];

    if (state.videos.length === 0) {
      items.push('Upload your first video to unlock the rest of the workspace.');
    }

    if (summary.failedVideos > 0) {
      items.push(`Fix ${summary.failedVideos} failed upload${summary.failedVideos === 1 ? '' : 's'} in the Library.`);
    }

    if (summary.pendingVideos > 0) {
      items.push(`You still have ${summary.pendingVideos} video${summary.pendingVideos === 1 ? '' : 's'} processing.`);
    }

    if (state.flashcards.length > 0) {
      items.push('Review your flashcards and mark the difficult ones as hard.');
    }

    if (state.quizzes.length > 0) {
      items.push('Retake a quiz to improve weak topics.');
    }

    return items;
  }, [state.flashcards.length, state.quizzes.length, state.videos.length, summary.failedVideos, summary.pendingVideos]);
  const revisions = useMemo(() => state.flashcards.filter((card) => card.status !== 'easy').slice(0, 3), [state.flashcards]);
  const progressSeries = useMemo(() => {
    const series = state.videos.slice(-7).map((video, index) => ({ label: String(index + 1), value: Math.min(100, 30 + video.bookmarkCount * 10 + index * 5) }));
    return series.length > 0 ? series : [];
  }, [state.videos]);

  return (
    <div className="flex-1 space-y-8 overflow-y-auto p-6 md:p-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-4 py-1.5 text-on-surface-variant">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-code-sm text-[12px]">Home dashboard</span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-on-surface md:text-5xl">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-on-surface-variant md:text-lg">This overview updates from the same workspace data that powers Library, Collections, Ask AI, Flashcards, Quizzes, and Knowledge Graph.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto">
            <StatCard label="Videos" value={summary.videos} />
            <StatCard label="Collections" value={summary.collections} />
            <StatCard label="Flashcards" value={summary.flashcards} />
            <StatCard label="Quizzes" value={summary.quizzes} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <section className="xl:col-span-7 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-[22px] font-semibold text-on-surface">Recently added videos</h2>
              <p className="mt-1 text-sm text-on-surface-variant">Latest uploads and processing states from your Library.</p>
            </div>
            <Link href="/library" className="inline-flex items-center gap-2 text-sm font-medium text-primary">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>

          {recentVideos.length > 0 ? (
            <div className="space-y-4">
              {recentVideos.map((video) => (
                <div key={video.id} className="rounded-2xl border border-outline-variant bg-surface p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-[16px] font-semibold text-on-surface">{video.title}</h3>
                      <p className="mt-1 text-sm text-on-surface-variant">{video.notes || 'No notes yet.'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-on-surface-variant">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{video.status}</span>
                      <span className="rounded-full bg-surface-container-high px-2.5 py-1">{video.duration}</span>
                      <span className="rounded-full bg-surface-container-high px-2.5 py-1">{video.bookmarkCount} bookmarks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : <EmptyState>No uploads yet. Add a video in the Library to populate this section.</EmptyState>}
        </section>

        <section className="xl:col-span-5 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-5">
            <h2 className="text-[22px] font-semibold text-on-surface">Continue learning</h2>
            <p className="mt-1 text-sm text-on-surface-variant">Resume active study from the latest processed videos.</p>
          </div>

          {continueLearning.length > 0 ? (
            <div className="space-y-4">
              {continueLearning.map((item) => (
                <div key={item.id} className="rounded-2xl border border-outline-variant bg-surface p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-on-surface">{item.title}</h3>
                      <p className="mt-1 text-sm text-on-surface-variant">{item.nextStep}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-on-surface-variant">Progress</p>
                      <p className="text-lg font-semibold text-primary">{item.progress}%</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-container-high"><div className="h-full rounded-full bg-primary" style={{ width: `${item.progress}%` }} /></div>
                </div>
              ))}
            </div>
          ) : <EmptyState>Nothing is in progress yet. Open a processed video to start this section.</EmptyState>}
        </section>

        <section className="xl:col-span-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-5 flex items-center gap-2"><Brain className="h-5 w-5 text-primary" /><h2 className="text-[22px] font-semibold text-on-surface">AI Recommendations</h2></div>
          {recommendations.length > 0 ? <div className="space-y-3">{recommendations.map((item) => <div key={item} className="rounded-2xl border border-outline-variant bg-surface p-4 text-sm text-on-surface-variant">{item}</div>)}</div> : <EmptyState>Recommendations appear after you add learning data.</EmptyState>}
          <Link href="/ask" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-highest">Ask AI <ArrowRight className="h-4 w-4" /></Link>
        </section>

        <section className="xl:col-span-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-5 flex items-center gap-2"><CalendarClock className="h-5 w-5 text-primary" /><h2 className="text-[22px] font-semibold text-on-surface">Revision due today</h2></div>
          {revisions.length > 0 ? <div className="space-y-3">{revisions.map((card) => <div key={card.id} className="flex items-center justify-between rounded-2xl border border-outline-variant bg-surface p-4"><div><h3 className="font-medium text-on-surface">{card.front}</h3><p className="mt-1 text-sm text-on-surface-variant">Topic: {card.topic}</p></div><Clock3 className="h-4 w-4 text-primary" /></div>)}</div> : <EmptyState>No revisions are due right now.</EmptyState>}
        </section>

        <section className="xl:col-span-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-5 flex items-center gap-2"><History className="h-5 w-5 text-primary" /><h2 className="text-[22px] font-semibold text-on-surface">Recent questions</h2></div>
          {state.recentQuestions.length > 0 ? <div className="space-y-3">{state.recentQuestions.map((question) => <div key={question} className="rounded-2xl border border-outline-variant bg-surface p-4 text-sm leading-6 text-on-surface-variant">{question}</div>)}</div> : <EmptyState>Recent questions will appear here after you use Ask AI.</EmptyState>}
        </section>

        <section className="xl:col-span-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-5 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /><h2 className="text-[22px] font-semibold text-on-surface">Learning statistics</h2></div>
          <div className="grid grid-cols-2 gap-3">
            <StatMetric label="Processed videos" value={summary.processedVideos} />
            <StatMetric label="Pending videos" value={summary.pendingVideos} />
            <StatMetric label="Failed videos" value={summary.failedVideos} />
            <StatMetric label="Due cards" value={summary.dueCards} />
          </div>
        </section>

        <section className="xl:col-span-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-5 flex items-center gap-2"><Video className="h-5 w-5 text-primary" /><h2 className="text-[22px] font-semibold text-on-surface">Recently viewed videos</h2></div>
          {state.recentlyViewed.length > 0 ? <div className="space-y-3">{state.recentlyViewed.map((title) => <div key={title} className="flex items-center justify-between rounded-2xl border border-outline-variant bg-surface p-4"><span className="text-sm text-on-surface">{title}</span><ChevronRight className="h-4 w-4 text-on-surface-variant" /></div>)}</div> : <EmptyState>No recent views yet.</EmptyState>}
        </section>

        <section className="xl:col-span-12 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
          <div className="mb-5 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /><h2 className="text-[22px] font-semibold text-on-surface">Progress graph</h2></div>
          {progressSeries.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
              <div className="rounded-2xl border border-outline-variant bg-surface p-5">
                <p className="text-sm text-on-surface-variant">Weekly trend</p>
                <p className="mt-2 text-4xl font-semibold text-on-surface">{Math.round(progressSeries.reduce((total, point) => total + point.value, 0) / progressSeries.length)}%</p>
                <p className="mt-2 text-sm text-on-surface-variant">Trend reflects uploaded video activity and bookmark counts.</p>
              </div>
              <div className="rounded-2xl border border-outline-variant bg-surface p-5">
                <div className="flex h-64 items-end gap-4">{progressSeries.map((point) => <div key={point.label} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-xl bg-gradient-to-t from-primary to-primary-container" style={{ height: `${Math.max(10, point.value)}%` }} /><span className="text-[11px] text-on-surface-variant">{point.label}</span></div>)}</div>
              </div>
            </div>
          ) : <EmptyState>Graph appears after enough activity is recorded.</EmptyState>}
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-outline-variant bg-surface p-4"><p className="text-sm text-on-surface-variant">{label}</p><p className="mt-2 text-2xl font-semibold text-on-surface">{value}</p></div>;
}

function StatMetric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-outline-variant bg-surface p-4"><p className="text-sm text-on-surface-variant">{label}</p><p className="mt-2 text-2xl font-semibold text-on-surface">{value}</p></div>;
}