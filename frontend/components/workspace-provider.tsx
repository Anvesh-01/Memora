"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  createEmptyWorkspaceState,
  loadWorkspaceState,
  saveWorkspaceState,
  type WorkspaceState,
} from '@/lib/workspace-store';

type WorkspaceContextValue = {
  state: WorkspaceState;
  setState: React.Dispatch<React.SetStateAction<WorkspaceState>>;
  ready: boolean;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [state, setState] = useState<WorkspaceState>(createEmptyWorkspaceState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    setState(loadWorkspaceState(user?.id ?? null));
    setReady(true);
  }, [isLoaded, user?.id]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    saveWorkspaceState(user?.id ?? null, state);
  }, [ready, state, user?.id]);

  const value = useMemo(() => ({ state, setState, ready }), [state, ready]);

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }

  return context;
}
