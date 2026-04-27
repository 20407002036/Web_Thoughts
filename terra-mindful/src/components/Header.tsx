import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-20 px-12 z-40 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200/30 dark:border-stone-800/30 flex items-center justify-between w-full">
      <div className="flex items-center bg-surface-container-low rounded-full px-4 py-2 w-96 border border-outline-variant/10">
        <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
        <input 
          className="bg-transparent border-none focus:ring-0 text-sm w-full font-body-md outline-none" 
          placeholder="Search your reflections..." 
          type="text"
        />
      </div>
      <div className="flex items-center gap-6">
        <button className="text-stone-500 hover:opacity-80 transition-opacity active:scale-98">
          <span className="material-symbols-outlined">mic</span>
        </button>
        <button className="text-stone-500 hover:opacity-80 transition-opacity active:scale-98 relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-container">
          <img 
            alt="User Profile" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwYFCgQWweyGO4FRxmrKN6f52IrJPz45hpXzXP5OYDEkEl2aVm9IkawfZ1w6YTaMI-xMfQ5zK29GGA0UxAXJvRr-CxccRWbqdTOwaxD_9kXsnA3G_8Sw2BlRSR3Bxa6Bf6OJ5JK1Ti3aUoZc0-Hq2LKWbmHNHhmSzw2sf2iTEg7gNlwZIQLngURy4c_RWT_WkASQxmSTjovxaGOFcKFkIiPp4OSGQiP9Y5_m5HjCAeXigZNIHOWE0gvW_8f6HrGHJef8eGNCIwO_o"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
