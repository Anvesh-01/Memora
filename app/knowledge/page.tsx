"use client";

import { useMemo, useState } from 'react';
import { Network, ArrowDown, Video, FileText, MessageSquareText, FolderKanban } from 'lucide-react';
import { buildGraphNodes } from '@/lib/workspace-store';
import { useWorkspace } from '@/components/workspace-provider';

export default function KnowledgeGraphPage() {
  const { state } = useWorkspace();
  const nodes = useMemo(() => buildGraphNodes(state), [state]);
  const [selectedNodeId, setSelectedNodeId] = useState(nodes[0]?.id ?? '');

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? nodes[0] ?? null;

  const groupedNodes = useMemo(() => ({
    collection: nodes.filter((node) => node.kind === 'collection'),
    topic: nodes.filter((node) => node.kind === 'topic'),
    video: nodes.filter((node) => node.kind === 'video'),
  }), [nodes]);

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-8 p-6 md:p-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-display-lg text-[48px] leading-tight text-on-background">Knowledge Graph</h1>
        <p className="max-w-4xl text-[18px] text-on-surface-variant">Interactive graph of your videos, collections, notes, flashcards, and questions. Click a node to inspect its related content.</p>
      </div>

      {nodes.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <section className="rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
            <div className="mb-6 flex items-center gap-2 text-sm text-on-surface-variant">
              <Network className="h-5 w-5 text-primary" /> Interactive graph
            </div>

            <div className="space-y-8">
              <GraphRow title="Collections" nodes={groupedNodes.collection} selectedNodeId={selectedNodeId} onSelect={setSelectedNodeId} />
              <div className="flex items-center justify-center text-on-surface-variant"><ArrowDown className="h-5 w-5" /></div>
              <GraphRow title="Topics" nodes={groupedNodes.topic} selectedNodeId={selectedNodeId} onSelect={setSelectedNodeId} />
              <div className="flex items-center justify-center text-on-surface-variant"><ArrowDown className="h-5 w-5" /></div>
              <GraphRow title="Videos" nodes={groupedNodes.video} selectedNodeId={selectedNodeId} onSelect={setSelectedNodeId} />
            </div>
          </section>

          <aside className="space-y-4 rounded-[2rem] border border-outline-variant bg-surface-container-lowest p-6">
            {selectedNode ? (
              <>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Selected node</p>
                  <h2 className="mt-2 text-[24px] font-semibold text-on-surface">{selectedNode.label}</h2>
                  <p className="mt-1 text-sm text-on-surface-variant">{selectedNode.kind}</p>
                </div>

                <div className="rounded-2xl border border-outline-variant bg-surface p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-on-surface"><FolderKanban className="h-4 w-4 text-primary" /> Related videos</div>
                  <div className="mt-3 space-y-2 text-sm text-on-surface-variant">
                    {selectedNode.relatedVideoIds.length > 0 ? selectedNode.relatedVideoIds.map((videoId) => {
                      const video = state.videos.find((item) => item.id === videoId);
                      return video ? <div key={videoId} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3">{video.title}</div> : null;
                    }) : <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-3">No related videos.</div>}
                  </div>
                </div>

                <div className="rounded-2xl border border-outline-variant bg-surface p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-on-surface"><FileText className="h-4 w-4 text-primary" /> Notes</div>
                  <div className="mt-3 space-y-2 text-sm text-on-surface-variant">
                    {selectedNode.notes.length > 0 ? selectedNode.notes.map((note) => <div key={note} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3">{note}</div>) : <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-3">No notes yet.</div>}
                  </div>
                </div>

                <div className="rounded-2xl border border-outline-variant bg-surface p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-on-surface"><MessageSquareText className="h-4 w-4 text-primary" /> Questions</div>
                  <div className="mt-3 space-y-2 text-sm text-on-surface-variant">
                    {selectedNode.questions.length > 0 ? selectedNode.questions.map((question) => <div key={question} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3">{question}</div>) : <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-3">No questions yet.</div>}
                  </div>
                </div>
              </>
            ) : null}
          </aside>
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-outline-variant bg-surface-container-lowest p-8 text-sm text-on-surface-variant">
          Add collections or videos to build the knowledge graph. Nodes will appear here automatically.
        </div>
      )}
    </div>
  );
}

function GraphRow({
  title,
  nodes,
  selectedNodeId,
  onSelect,
}: {
  title: string;
  nodes: Array<{
    id: string;
    label: string;
    kind: 'collection' | 'topic' | 'video';
  }>;
  selectedNodeId: string;
  onSelect: (id: string) => void;
}) {
  const tone = title === 'Collections' ? 'bg-secondary-container text-on-secondary-container' : title === 'Topics' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface';

  return (
    <div>
      <div className="mb-3 text-sm font-medium text-on-surface-variant">{title}</div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {nodes.length > 0 ? nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => onSelect(node.id)}
            className={`rounded-2xl border px-4 py-4 text-left transition-colors ${selectedNodeId === node.id ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface hover:border-primary'}`}
          >
            <div className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>{node.kind}</div>
            <p className="mt-3 text-[16px] font-medium text-on-surface">{node.label}</p>
          </button>
        )) : (
          <div className="rounded-2xl border border-dashed border-outline-variant bg-surface p-4 text-sm text-on-surface-variant">No {title.toLowerCase()} yet.</div>
        )}
      </div>
    </div>
  );
}