export type VideoStatus = 'ready' | 'processing' | 'failed';
export type FlashcardDifficulty = 'easy' | 'hard' | 'new';
export type QuizType = 'MCQ' | 'True/False' | 'Coding' | 'Interview' | 'Fill Blanks';

export type WorkspaceVideo = {
  id: string;
  title: string;
  sourceType: 'youtube' | 'offline';
  duration: string;
  status: VideoStatus;
  topics: string[];
  notes: string;
  bookmarkCount: number;
  collectionIds: string[];
  thumbnail?: string;
  addedAt: string;
};

export type WorkspaceCollection = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  color: string;
};

export type WorkspaceFlashcard = {
  id: string;
  front: string;
  back: string;
  status: FlashcardDifficulty;
  topic: string;
  collectionId?: string;
  sourceTitle: string;
};

export type WorkspaceQuiz = {
  id: string;
  title: string;
  type: QuizType;
  sourceTitle: string;
  questions: number;
  duration: string;
  score: number;
  accuracy: number;
  weakTopics: string[];
  status: 'new' | 'completed';
};

export type WorkspaceConversation = {
  id: string;
  sourceType: 'video' | 'link';
  sourceLabel: string;
  question: string;
  answer: string;
  timestamp: string;
  sources: string[];
};

export type WorkspaceState = {
  videos: WorkspaceVideo[];
  collections: WorkspaceCollection[];
  flashcards: WorkspaceFlashcard[];
  quizzes: WorkspaceQuiz[];
  conversations: WorkspaceConversation[];
  recentQuestions: string[];
  recentlyViewed: string[];
  selectedVideoId: string | null;
};

export type GraphNode = {
  id: string;
  label: string;
  kind: 'collection' | 'topic' | 'video';
  relatedVideoIds: string[];
  notes: string[];
  questions: string[];
};

export const WORKSPACE_STORAGE_KEY_PREFIX = 'memo.workspace.';

export function createEmptyWorkspaceState(): WorkspaceState {
  return {
    videos: [],
    collections: [],
    flashcards: [],
    quizzes: [],
    conversations: [],
    recentQuestions: [],
    recentlyViewed: [],
    selectedVideoId: null,
  };
}

export function workspaceStorageKey(userId: string | null | undefined) {
  return `${WORKSPACE_STORAGE_KEY_PREFIX}${userId || 'guest'}`;
}

export function loadWorkspaceState(userId: string | null | undefined) {
  if (typeof window === 'undefined') {
    return createEmptyWorkspaceState();
  }

  try {
    const raw = window.localStorage.getItem(workspaceStorageKey(userId));

    if (!raw) {
      return createEmptyWorkspaceState();
    }

    const parsed = JSON.parse(raw) as Partial<WorkspaceState>;

    return {
      ...createEmptyWorkspaceState(),
      ...parsed,
      videos: Array.isArray(parsed.videos) ? parsed.videos : [],
      collections: Array.isArray(parsed.collections) ? parsed.collections : [],
      flashcards: Array.isArray(parsed.flashcards) ? parsed.flashcards : [],
      quizzes: Array.isArray(parsed.quizzes) ? parsed.quizzes : [],
      conversations: Array.isArray(parsed.conversations) ? parsed.conversations : [],
      recentQuestions: Array.isArray(parsed.recentQuestions) ? parsed.recentQuestions : [],
      recentlyViewed: Array.isArray(parsed.recentlyViewed) ? parsed.recentlyViewed : [],
    };
  } catch {
    return createEmptyWorkspaceState();
  }
}

export function saveWorkspaceState(userId: string | null | undefined, state: WorkspaceState) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(workspaceStorageKey(userId), JSON.stringify(state));
}

export function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function inferPrimaryVideo(state: WorkspaceState) {
  return state.videos.find((video) => video.status === 'ready') ?? state.videos[0] ?? null;
}

export function buildGraphNodes(state: WorkspaceState): GraphNode[] {
  const nodes = new Map<string, GraphNode>();

  for (const collection of state.collections) {
    nodes.set(collection.id, {
      id: collection.id,
      label: collection.name,
      kind: 'collection',
      relatedVideoIds: state.videos.filter((video) => video.collectionIds.includes(collection.id)).map((video) => video.id),
      notes: state.videos.filter((video) => video.collectionIds.includes(collection.id)).map((video) => video.notes).filter(Boolean),
      questions: state.recentQuestions.slice(0, 3),
    });
  }

  for (const video of state.videos) {
    nodes.set(video.id, {
      id: video.id,
      label: video.title,
      kind: 'video',
      relatedVideoIds: [video.id],
      notes: video.notes ? [video.notes] : [],
      questions: state.recentQuestions.slice(0, 2),
    });

    for (const topic of video.topics) {
      const topicId = `topic:${topic.toLowerCase().replace(/\s+/g, '-')}`;
      const existing = nodes.get(topicId);

      nodes.set(topicId, {
        id: topicId,
        label: topic,
        kind: 'topic',
        relatedVideoIds: existing ? Array.from(new Set([...existing.relatedVideoIds, video.id])) : [video.id],
        notes: existing ? Array.from(new Set([...existing.notes, video.notes].filter(Boolean) as string[])) : video.notes ? [video.notes] : [],
        questions: existing ? Array.from(new Set([...existing.questions, ...state.recentQuestions])) : state.recentQuestions.slice(0, 3),
      });
    }
  }

  return Array.from(nodes.values());
}

export function summarizeWorkspace(state: WorkspaceState) {
  const processedVideos = state.videos.filter((video) => video.status === 'ready').length;
  const pendingVideos = state.videos.filter((video) => video.status === 'processing').length;
  const failedVideos = state.videos.filter((video) => video.status === 'failed').length;
  const dueCards = state.flashcards.filter((card) => card.status !== 'easy').length;

  return {
    videos: state.videos.length,
    processedVideos,
    pendingVideos,
    failedVideos,
    collections: state.collections.length,
    flashcards: state.flashcards.length,
    quizzes: state.quizzes.length,
    dueCards,
    selectedVideo: inferPrimaryVideo(state),
  };
}
