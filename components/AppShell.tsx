'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { WorkspaceProvider } from '@/components/workspace-provider';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <WorkspaceProvider>
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64 w-full min-h-screen overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </WorkspaceProvider>
  );
}