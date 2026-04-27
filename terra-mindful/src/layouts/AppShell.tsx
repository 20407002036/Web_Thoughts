import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const AppShell: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="pt-20 p-margin">
          <div className="max-w-container-max mx-auto space-y-gutter">
            <Outlet />
          </div>
        </main>
      </div>
      {/* FAB for New Entry (Global) */}
      <button 
        onClick={() => navigate('/record')}
        className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-transform z-50"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
};

export default AppShell;
