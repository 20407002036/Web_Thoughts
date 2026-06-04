import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { icon: 'menu_book', label: 'Journal', path: '/' },
  { icon: 'mic', label: 'Record', path: '/record' },
  { icon: 'bar_chart', label: 'Insights', path: '/insights' },
  { icon: 'inventory_2', label: 'Archives', path: '/archives' },
  { icon: 'settings', label: 'Settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-border/60 bg-card/80 px-4 py-6 backdrop-blur">
      <div className="mb-8 rounded-3xl border border-border/60 bg-background p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          </div>
          <div className="min-w-0">
            <h1 className="truncate font-h2 text-h3 text-on-surface">{profile?.display_name || 'Mindful'}</h1>
            <p className="label-eyebrow">Deep Reflection</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:bg-muted hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-3">
        <button
          onClick={() => navigate('/record')}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-soft transition-transform hover:scale-[1.01] active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Entry</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-border/70 bg-background px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
