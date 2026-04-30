import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const mobileNavItems = [
  { path: '/', label: 'Journal', icon: 'menu_book' },
  { path: '/record', label: 'Record', icon: 'mic' },
  { path: '/insights', label: 'Insights', icon: 'bar_chart' },
  { path: '/archives', label: 'Archive', icon: 'inventory_2' },
];

const AppShell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground font-body-md">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:pl-72">
        <Header />
        <main className="pt-20 px-4 sm:px-6 lg:px-10 pb-28 lg:pb-12">
          <div className="mx-auto w-full max-w-container-max space-y-gutter">
            <Outlet />
          </div>
        </main>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-50 w-[min(92%,420px)] -translate-x-1/2 lg:hidden">
        <div className="rounded-full border border-border/60 bg-card/95 px-2 py-2 shadow-soft backdrop-blur-xl">
          <div className="flex items-center justify-between gap-1">
            {mobileNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex flex-1 flex-col items-center gap-1 rounded-full py-2 text-[10px] font-semibold uppercase tracking-wider transition-all ${
                    isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      <button
        onClick={() => navigate('/record')}
        className="fixed bottom-8 right-8 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105 active:scale-95 lg:flex"
        aria-label="New entry"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  );
};

export default AppShell;
