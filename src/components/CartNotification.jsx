import React from 'react';

export default function CartNotification({ isOpen, item, onClose }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white border border-stone-200 shadow-xl p-4 flex items-center gap-4 transition-all duration-300">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 object-cover shrink-0"
        />
      )}

      <div className="grow min-w-0">
        <p className="text-[10px] uppercase font-semibold text-[#868C79] tracking-wider">
          Added to Bag ✓
        </p>
        <h4 className="text-xs font-semibold text-stone-800 truncate">
          {item.name}
        </h4>
        <p className="text-xs text-stone-500">{item.price}</p>
      </div>

      <button
        onClick={onClose}
        className="text-stone-400 hover:text-stone-700 text-sm font-bold px-2 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
}