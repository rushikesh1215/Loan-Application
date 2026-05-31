import React from 'react';
import { FileEdit, Landmark } from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab }) {
  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-white flex items-center gap-2">
          <Landmark size={20} className="text-zinc-400" />
          <span>LoanSystem</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentTab('apply')}
            className={`px-3 py-1.5 rounded text-sm font-medium ${
              currentTab === 'apply' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Apply Form
          </button>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 rounded text-sm font-medium ${
              currentTab === 'dashboard' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Agent Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}