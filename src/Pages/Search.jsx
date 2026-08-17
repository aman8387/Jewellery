import React, { useState } from 'react';

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {isOpen ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder='Search "Jewel"'
            autoFocus
            className="px-2 py-1 text-xs border border-stone-300 rounded focus:outline-none focus:border-stone-500 bg-white lowercase tracking-normal"
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-stone-500 hover:text-stone-900 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 hover:text-stone-900 cursor-pointer"
        >
          <span>SEARCH</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      )}
    </div>
  );
}