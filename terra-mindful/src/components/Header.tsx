import React from 'react';
import { useLocation } from 'react-router-dom';

const titleMap: Record<string, string> = {
  '/': 'Mindful Moments',
  '/record': 'Record Reflection',
  '/review': 'Review Reflection',
  '/insights': 'Insights',
  '/archives': 'Archives',
  '/settings': 'Settings',
};

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const title = titleMap[pathname] || 'Mindful Moments';

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border/50 bg-background/85 px-4 backdrop-blur-lg sm:px-6 lg:left-72 lg:px-10">
      <div className="mx-auto flex h-20 w-full max-w-container-max items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <span className="material-symbols-outlined text-base text-primary">spa</span>
          </div>
          <div className="min-w-0">
            <p className="truncate font-h2 text-h3 text-on-surface">{title}</p>
            <p className="label-eyebrow hidden sm:block">Journal Sanctuary</p>
          </div>
        </div>

        <div className="hidden items-center rounded-full border border-border/70 bg-card px-4 py-2 lg:flex lg:w-[28rem]">
          <span className="material-symbols-outlined mr-2 text-sm text-muted-foreground">search</span>
          <input
            className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-muted-foreground"
            placeholder="Search your reflections"
            type="text"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-on-surface">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-2 ring-card">
            M
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
