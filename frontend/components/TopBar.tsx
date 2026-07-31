'use client';

import { Menu, Search, Bell, Settings, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-surface dark:bg-surface-container-lowest border-b border-outline-variant dark:border-outline sticky top-0 z-30 flex justify-between items-center h-16 px-6 shrink-0">
      <div className="flex items-center md:hidden gap-4">
        <button className="text-on-surface-variant hover:bg-surface-container-high transition-all p-2 rounded focus-within:ring-2 focus-within:ring-primary">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 max-w-md ml-4 md:ml-0 relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 pointer-events-none" />
        <input
          type="text"
          placeholder="Search knowledge base..."
          className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-[16px] rounded py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-on-surface-variant"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto md:ml-0">
        <button className="text-on-surface-variant hover:bg-surface-container-high transition-all p-2 rounded-full relative focus-within:ring-2 focus-within:ring-primary">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        {mounted && (
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-on-surface-variant hover:bg-surface-container-high transition-all p-2 rounded-full focus-within:ring-2 focus-within:ring-primary"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}

        <Link href="/settings" className="text-on-surface-variant hover:bg-surface-container-high transition-all p-2 rounded-full focus-within:ring-2 focus-within:ring-primary">
          <Settings className="w-5 h-5" />
        </Link>

        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-outline-variant md:hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByhhaY4g5pX2rY7yxIlqH6PQ8spxwUjWI0EUBdQLpFFhFqZJbCxecaCmh_UsJCEq_JKh_RpvfTrjzL2KKlG9N8gZEJbp-apjnSPeDgQv5O1XHhFiV4WqlOFcdXMJbm_yy2kz0UASkEtWFiEm2OyX1l6YzOghGcAUIu0YJSgh9n-RISXu9w6xEyROHtt17us6UBDrmIJ7vVLF0RCstcFR_gyUvK2v9M1GsflUQHVqVvaABK5WhkxU3rSgauQ5q2NaaIX8MH6A24dZ2v"
              alt="User Profile"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
        </div>
      </div>
    </header>
  );
}
