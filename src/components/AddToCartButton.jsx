import React, { useState } from 'react';

export default function AddToCartButton({ product, onAddToCart }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    setIsAdding(true);

    if (onAddToCart) {
      onAddToCart(product);
    }

    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full bg-[#868C79] hover:bg-[#747969] active:bg-[#636858] text-white 
        text-[11px] font-semibold tracking-widest uppercase py-3 px-6 
        transition-all duration-50 ease-in-out transform active:scale-95 select-none
        flex items-center justify-center gap-2 border border-[#868C79]
        ${isAdding ? 'scale-95 bg-[#636858]' : 'scale-100'}`}
    >
      <span>{isAdding ? 'Added ✓' : 'Add to Cart'}</span>
    </button>
  );
}