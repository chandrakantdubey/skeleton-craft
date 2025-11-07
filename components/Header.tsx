
import React from 'react';
import { CodeIcon } from '../constants';

interface HeaderProps {
    onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ onExport }) => {
  return (
    <header className="flex-shrink-0 bg-slate-900/70 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between p-4 z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-slate-900 rounded-sm animate-pulse"></div>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-200">Skeleton Craft</h1>
      </div>
      <button 
        onClick={onExport}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
      >
        <CodeIcon />
        Export
      </button>
    </header>
  );
};

export default Header;
