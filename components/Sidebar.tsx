'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Network, Brain, Settings } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Ask AI', href: '/ask', icon: Brain },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="bg-surface dark:bg-surface-container-lowest h-full w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-outline flex-col py-10 overflow-y-auto hidden md:flex z-40">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
          <Network className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="font-headline-md text-[24px] font-bold text-primary dark:text-inverse-primary leading-tight">Mnemosyne</h1>
          <p className="font-label-md text-[11px] text-on-surface-variant dark:text-surface-variant uppercase tracking-wider">Video Q&amp;A</p>
        </div>
      </div>
      <ul className="flex flex-col gap-1 px-4 mt-4 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          const isHome = item.href === '/';
          const exactlyActive = isActive && (isHome ? pathname === '/' : true);

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded text-[14px] font-label-md transition-colors duration-200 ease-in-out relative ${
                  exactlyActive
                    ? 'bg-surface-container-low dark:bg-surface-container text-primary dark:text-secondary-fixed-dim font-bold border-r-2 border-primary dark:border-secondary-fixed-dim'
                    : 'text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <item.icon className={`w-5 h-5 ${exactlyActive ? 'fill-current opacity-20' : ''}`} strokeWidth={exactlyActive ? 2.5 : 2} />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto px-4 mb-4">
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 border-t border-outline-variant pt-4 hover:bg-surface-container-lowest transition-colors rounded">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-outline-variant shrink-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByhhaY4g5pX2rY7yxIlqH6PQ8spxwUjWI0EUBdQLpFFhFqZJbCxecaCmh_UsJCEq_JKh_RpvfTrjzL2KKlG9N8gZEJbp-apjnSPeDgQv5O1XHhFiV4WqlOFcdXMJbm_yy2kz0UASkEtWFiEm2OyX1l6YzOghGcAUIu0YJSgh9n-RISXu9w6xEyROHtt17us6UBDrmIJ7vVLF0RCstcFR_gyUvK2v9M1GsflUQHVqVvaABK5WhkxU3rSgauQ5q2NaaIX8MH6A24dZ2v"
              alt="User Profile"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-[14px] text-on-surface">Dr. A. Turing</span>
            <span className="font-code-sm text-[11px] text-on-surface-variant">Researcher</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
