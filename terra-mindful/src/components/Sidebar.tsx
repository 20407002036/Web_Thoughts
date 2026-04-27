import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const navItems = [
    { icon: 'edit_note', label: 'Journal', path: '/' },
    { icon: 'psychology', label: 'Insights', path: '/insights' },
    { icon: 'inventory_2', label: 'Archives', path: '/archives' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="h-screen w-64 border-r fixed left-0 top-0 border-stone-200/50 dark:border-stone-800/50 shadow-[4px_0px_20px_rgba(74,68,63,0.03)] bg-stone-50 dark:bg-stone-950 flex flex-col py-8 z-50">
      <div className="px-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100 font-h1">{profile?.display_name || 'Thoughts'}</h1>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 font-label-caps">Deep Reflection</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-4 transition-all duration-200 ease-out active:scale-95 border-l-4 ${
                isActive
                  ? 'text-stone-900 dark:text-white font-semibold border-[#8A9A5B] bg-stone-100/50 dark:bg-stone-900/50'
                  : 'text-stone-500 dark:text-stone-400 border-transparent hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-800 dark:hover:text-stone-200'
              }`
            }
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: item.icon === 'edit_note' ? "'FILL' 1" : undefined }}>{item.icon}</span>
            <span className="font-['Plus_Jakarta_Sans'] text-sm tracking-tight">{item.label}</span>
          </NavLink>
        ))}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-stone-500 dark:text-stone-400 py-3 px-4 border-l-4 border-transparent hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-stone-800 dark:hover:text-stone-200 transition-all duration-200 ease-out active:scale-95"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-['Plus_Jakarta_Sans'] text-sm tracking-tight">Logout</span>
        </button>
      </nav>
      <div className="px-4 mt-auto">
        <button 
          onClick={() => navigate('/record')}
          className="w-full bg-primary py-4 rounded-full text-on-primary font-h3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          <span>New Entry</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
