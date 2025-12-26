"use client";

import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="p-2 lg:hidden text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          <Menu size={24} />
        </button>

        {/* <div className="relative w-full max-w-sm hidden md:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <input
            type="text"
            placeholder="Search students, courses..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-100 transition-all"
          />
        </div> */}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-100 mx-1 md:mx-2"></div>

        <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2 cursor-pointer hover:bg-gray-50 p-1 rounded-xl transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800 leading-none">Prof. Ahmed</p>
            <p className="text-xs text-gray-500 mt-1">Registrar Office</p>
          </div>
          <div className="h-8 w-8 md:h-9 md:w-9 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
            PA
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
