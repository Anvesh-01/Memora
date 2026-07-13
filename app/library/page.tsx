"use client";

import { useMemo, useState } from 'react';
import {
  Bookmark,
  Filter,
  Folder,
  Grid3X3,
  List,
  Plus,
  Search,
  Tag,
  UploadCloud,
  Video,
  Clock3,
  CircleAlert,
  Loader2,
} from 'lucide-react';
import { createId, type WorkspaceVideo } from '@/lib/workspace-store';
import { useWorkspace } from '@/components/workspace-provider';

function matchesQuery(video: WorkspaceVideo, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [video.title, video.notes, video.duration, video.status, video.sourceType, ...video.topics].join(' ').toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export default function Library() {
  const { state, setState } = useWorkspace();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | WorkspaceVideo['status']>('all');
  const [collectionFilter, setCollectionFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'bookmarks'>('recent');

  const [form, setForm] = useState({
    title: '',
    sourceType: 'youtube' as WorkspaceVideo['sourceType'],
    duration: '',
    status: 'processing' as WorkspaceVideo['status'],
    topics: '',
    notes: '',
    collectionId: '',
    thumbnail: '',
  });

  const uniqueTopics = useMemo(
    () => Array.from(new Set(state.videos.flatMap((video) => video.topics))).filter(Boolean),
    [state.videos],
  );

  const visibleVideos = useMemo(() => {
    const filtered = state.videos.filter((video) => {
      const matchesStatus = statusFilter === 'all' || video.status === statusFilter;
      const matchesCollection = collectionFilter === 'all' || video.collectionIds.includes(collectionFilter);
      const matchesTopic = topicFilter === 'all' || video.topics.includes(topicFilter);
      return matchesStatus && matchesCollection && matchesTopic && matchesQuery(video, search);
    });

    return filtered.sort((left, right) => {
      if (sortBy === 'title') {
        return left.title.localeCompare(right.title);
      }

      if (sortBy === 'bookmarks') {
        return right.bookmarkCount - left.bookmarkCount;
      }

      return right.addedAt.localeCompare(left.addedAt);
    });
  }, [collectionFilter, search, sortBy, state.videos, statusFilter, topicFilter]);

  const stats = {
    total: state.videos.length,
    ready: state.videos.filter((video) => video.status === 'ready').length,
    processing: state.videos.filter((video) => video.status === 'processing').length,
    failed: state.videos.filter((video) => video.status === 'failed').length,
  };

  const createVideo = () => {
    if (!form.title.trim()) {
      return;
    }

    const nextVideo: WorkspaceVideo = {
      id: createId('video'),
      title: form.title.trim(),
      sourceType: form.sourceType,
      duration: form.duration.trim() || '--',
      status: form.status,
      topics: form.topics.split(',').map((topic) => topic.trim()).filter(Boolean),
      notes: form.notes.trim(),
      bookmarkCount: 0,
      collectionIds: form.collectionId ? [form.collectionId] : [],
      thumbnail: form.thumbnail.trim() || undefined,
      addedAt: new Date().toLocaleDateString(),
    };

    setState((current) => ({
      ...current,
      videos: [nextVideo, ...current.videos],
      recentQuestions: current.recentQuestions,
      recentlyViewed: [nextVideo.title, ...current.recentlyViewed].slice(0, 8),
    }));

    setForm({
      title: '',
      sourceType: 'youtube',
      duration: '',
      status: 'processing',
      topics: '',
      notes: '',
      collectionId: '',
      thumbnail: '',
    });
  };

  const bumpBookmark = (id: string) => {
    setState((current) => ({
      ...current,
      videos: current.videos.map((video) => (
        video.id === id ? { ...video, bookmarkCount: video.bookmarkCount + 1 } : video
      )),
    }));
  };

  const removeVideo = (id: string) => {
    setState((current) => ({
      ...current,
      videos: current.videos.filter((video) => video.id !== id),
      flashcards: current.flashcards.filter((card) => card.sourceTitle !== state.videos.find((video) => video.id === id)?.title),
      quizzes: current.quizzes.filter((quiz) => quiz.sourceTitle !== state.videos.find((video) => video.id === id)?.title),
    }));
  };

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-8 p-6 md:p-10">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="font-display-lg text-[48px] leading-tight text-on-background">Library</h1>
          <p className="mt-1 text-[18px] text-on-surface-variant">Your entire video knowledge base, driven by the data you add to the app.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-auto">
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4">
            <p className="text-sm text-on-surface-variant">Total</p>
            <p className="mt-2 text-2xl font-semibold text-on-surface">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4">
            <p className="text-sm text-on-surface-variant">Ready</p>
            <p className="mt-2 text-2xl font-semibold text-on-surface">{stats.ready}</p>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4">
            <p className="text-sm text-on-surface-variant">Processing</p>
            <p className="mt-2 text-2xl font-semibold text-on-surface">{stats.processing}</p>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4">
            <p className="text-sm text-on-surface-variant">Failed</p>
            <p className="mt-2 text-2xl font-semibold text-on-surface">{stats.failed}</p>
          </div>
        </div>
      </div>

      <section className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[22px] font-semibold text-on-surface">Search, filter, and sort</h2>
            <p className="mt-1 text-sm text-on-surface-variant">Use the controls below to work through your uploaded resources.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setView('grid')} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${view === 'grid' ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container-highest'}`}>
              <Grid3X3 className="h-4 w-4" /> Grid
            </button>
            <button onClick={() => setView('list')} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${view === 'list' ? 'border-primary bg-primary-container text-on-primary-container' : 'border-outline-variant bg-surface text-on-surface hover:bg-surface-container-highest'}`}>
              <List className="h-4 w-4" /> List
            </button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap gap-3">
              <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3 focus-within:border-primary">
                <Search className="h-4 w-4 text-on-surface-variant" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, notes, topic, or status" className="w-full bg-transparent text-sm outline-none placeholder:text-on-surface-variant" />
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3">
                <Filter className="h-4 w-4 text-on-surface-variant" />
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} className="bg-transparent text-sm outline-none">
                  <option value="all">All Statuses</option>
                  <option value="ready">Ready</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3">
                <Folder className="h-4 w-4 text-on-surface-variant" />
                <select value={collectionFilter} onChange={(event) => setCollectionFilter(event.target.value)} className="bg-transparent text-sm outline-none">
                  <option value="all">All Collections</option>
                  {state.collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>{collection.name}</option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3">
                <Tag className="h-4 w-4 text-on-surface-variant" />
                <select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)} className="bg-transparent text-sm outline-none">
                  <option value="all">All Topics</option>
                  {uniqueTopics.map((topic) => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface px-4 py-3">
                <Clock3 className="h-4 w-4 text-on-surface-variant" />
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)} className="bg-transparent text-sm outline-none">
                  <option value="recent">Newest First</option>
                  <option value="title">Title</option>
                  <option value="bookmarks">Bookmark Count</option>
                </select>
              </label>
            </div>

            <div className="mt-6">
              {visibleVideos.length > 0 ? (
                view === 'grid' ? (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {visibleVideos.map((video) => (
                      <article key={video.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest transition-colors hover:border-primary">
                        <div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary/20 via-surface-container-high to-secondary/20 px-6 text-center">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">{video.sourceType}</p>
                            <h3 className="mt-2 text-xl font-semibold text-on-surface">{video.title}</h3>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-5">
                          <div className="flex items-center justify-between gap-3 text-sm text-on-surface-variant">
                            <span className="inline-flex items-center gap-1"><Video className="h-4 w-4" /> {video.duration}</span>
                            <span className="inline-flex items-center gap-1"><Bookmark className="h-4 w-4" /> {video.bookmarkCount}</span>
                          </div>
                          <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${video.status === 'ready' ? 'bg-primary/10 text-primary' : video.status === 'processing' ? 'bg-secondary/10 text-secondary' : 'bg-error-container text-on-error-container'}`}>
                            {video.status}
                          </span>
                          <p className="line-clamp-3 text-sm leading-6 text-on-surface-variant">{video.notes || 'No notes added yet.'}</p>
                          <div className="mt-auto flex flex-wrap gap-2">
                            {video.topics.map((topic) => (
                              <span key={topic} className="rounded-full border border-outline-variant bg-surface px-2.5 py-1 text-xs text-on-surface-variant">{topic}</span>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            <button onClick={() => bumpBookmark(video.id)} className="rounded-lg border border-outline-variant px-3 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-highest">Bookmark</button>
                            <button onClick={() => removeVideo(video.id)} className="rounded-lg border border-outline-variant px-3 py-2 text-sm text-error transition-colors hover:bg-error-container">Delete</button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {visibleVideos.map((video) => (
                      <article key={video.id} className="flex flex-col gap-4 rounded-2xl border border-outline-variant bg-surface p-4 lg:flex-row lg:items-center">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-on-surface">{video.title}</h3>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${video.status === 'ready' ? 'bg-primary/10 text-primary' : video.status === 'processing' ? 'bg-secondary/10 text-secondary' : 'bg-error-container text-on-error-container'}`}>{video.status}</span>
                          </div>
                          <p className="mt-1 text-sm text-on-surface-variant">{video.notes || 'No notes added yet.'}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {video.topics.map((topic) => (
                              <span key={topic} className="rounded-full border border-outline-variant bg-surface px-2.5 py-1 text-xs text-on-surface-variant">{topic}</span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm text-on-surface-variant lg:w-[260px] lg:grid-cols-1">
                          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3"><span className="block text-xs uppercase tracking-[0.2em]">Duration</span><span className="mt-1 block text-on-surface">{video.duration}</span></div>
                          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3"><span className="block text-xs uppercase tracking-[0.2em]">Bookmarks</span><span className="mt-1 block text-on-surface">{video.bookmarkCount}</span></div>
                          <button onClick={() => bumpBookmark(video.id)} className="rounded-lg border border-outline-variant px-3 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-highest">Bookmark</button>
                          <button onClick={() => removeVideo(video.id)} className="rounded-lg border border-outline-variant px-3 py-2 text-sm text-error transition-colors hover:bg-error-container">Delete</button>
                        </div>
                      </article>
                    ))}
                  </div>
                )
              ) : (
                <div className="rounded-2xl border border-dashed border-outline-variant bg-surface p-8 text-sm leading-6 text-on-surface-variant">
                  {state.videos.length === 0
                    ? 'No uploads yet. Use the upload panel to add your first YouTube or offline video.'
                    : 'No videos match the current search and filter settings.'}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4 rounded-2xl border border-outline-variant bg-surface p-5 xl:sticky xl:top-6">
            <div>
              <div className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-primary" />
                <h3 className="text-[18px] font-semibold text-on-surface">Upload resource</h3>
              </div>
              <p className="mt-1 text-sm text-on-surface-variant">Add multiple YouTube links or offline videos one at a time, then group them into collections.</p>
            </div>

            <div className="space-y-3">
              <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none" placeholder="Title" />
              <select value={form.sourceType} onChange={(event) => setForm((current) => ({ ...current, sourceType: event.target.value as WorkspaceVideo['sourceType'] }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none">
                <option value="youtube">YouTube</option>
                <option value="offline">Offline Video</option>
              </select>
              <input value={form.duration} onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none" placeholder="Duration, for example 42 min" />
              <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as WorkspaceVideo['status'] }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none">
                <option value="processing">Processing</option>
                <option value="ready">Ready</option>
                <option value="failed">Failed</option>
              </select>
              <input value={form.topics} onChange={(event) => setForm((current) => ({ ...current, topics: event.target.value }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none" placeholder="Topics, comma separated" />
              <textarea value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} className="min-h-28 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none" placeholder="Notes" />
              <label className="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3">
                <Folder className="h-4 w-4 text-on-surface-variant" />
                <select value={form.collectionId} onChange={(event) => setForm((current) => ({ ...current, collectionId: event.target.value }))} className="w-full bg-transparent text-sm outline-none">
                  <option value="">No collection</option>
                  {state.collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>{collection.name}</option>
                  ))}
                </select>
              </label>
              <input value={form.thumbnail} onChange={(event) => setForm((current) => ({ ...current, thumbnail: event.target.value }))} className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm outline-none" placeholder="Optional thumbnail URL" />
              <button onClick={createVideo} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-surface-tint">
                <Plus className="h-4 w-4" /> Add Video
              </button>
            </div>

            <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
              <p className="font-medium text-on-surface">Supported inputs</p>
              <ul className="mt-2 space-y-1">
                <li>Multiple YouTube links</li>
                <li>Multiple offline videos</li>
                <li>Topics, notes, and bookmark counts</li>
              </ul>
            </div>

            {state.videos.length === 0 && (
              <div className="flex items-start gap-3 rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
                <CircleAlert className="mt-0.5 h-4 w-4 text-primary" />
                Add a video to populate the library cards, filters, and the downstream pages.
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}