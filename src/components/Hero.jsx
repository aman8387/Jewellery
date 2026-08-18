import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProducts, styleGallery, customPieces, testimonials } from '../data/Products.js';

export default function Hero({ onAddToCart }) {
  // Local state to track quantities for each product individually
  const [quantities, setQuantities] = useState({});

  // Local state for add-to-cart animations & toast notification
  const [addingId, setAddingId] = useState(null);
  const [toastItem, setToastItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      const newQty = currentQty + delta;
      return { ...prev, [id]: newQty > 1 ? newQty : 1 };
    });
  };

  const handleAdd = (item) => {
    const qty = quantities[item.id] || 1;
    
    // Trigger button active animation state
    setAddingId(item.id);

    // Call parent handler
    if (onAddToCart) {
      onAddToCart(item, qty);
    }

    // Trigger toast notification
    setToastItem({ ...item, qty });
    setShowToast(true);

    // Reset button animation state
    setTimeout(() => {
      setAddingId(null);
    }, 600);

    // Auto-dismiss toast after 3.5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-700 font-sans relative">

      {/* 1. HERO MAIN BANNER (Full Background Image Overlay) */}
      <section className="relative min-h-125 md:min-h-150 flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://picsum.photos/seed/resin-hero-banner/1600/900')`,
          }}
        >
          <div className="absolute inset-0 bg-white/30 md:bg-white/20" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-16 py-16">
          <div className="max-w-xl space-y-6">
            <h1 className="text-3xl md:text-5xl font-serif text-stone-800 leading-tight">
             Pure Elegance in Every Design <br /> & Backed by Purity
            </h1>
            <p className="text-stone-700 text-xs md:text-sm font-light tracking-wide">
              Manufactured to hold moments that <br /> last forever
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/shop/jewellery" 
                className="bg-[#868C79] hover:bg-[#747969] active:bg-[#636858] text-white text-[11px] font-semibold tracking-widest uppercase px-6 py-3.5 transition-all duration-150 ease-out transform active:scale-95 border border-[#868C79] inline-block select-none"
              >
                SHOP JEWELLERY
              </Link>
              <Link 
                to="/shop/custom" 
                className="bg-white/80 hover:bg-white active:bg-white text-stone-800 text-[11px] font-semibold tracking-widest uppercase px-6 py-3.5 border border-stone-800 active:scale-95 transition-all duration-150 ease-out inline-block select-none"
              >
                SEE CUSTOM JEWELLERY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT / STORY SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img 
            src="https://picsum.photos/seed/story-piece/600/500" 
            alt="Thoughtful pieces" 
            className="w-full h-80 object-cover rounded-sm shadow-sm"
          />
        </div>
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
            MADE WITH LOVE ♡
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800">
            Thoughtful Jewellery, <br /> made to be cherished
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Each piece is carefully made using suggested purity, preserving delicate details and creating something truly one of a kind.
          </p>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Inspired by nature, Idols, light, and sentiments. My designs are made to be worn, gifted, and treasured.
          </p>
          <p className="font-serif italic text-sm text-stone-700 pt-2">
            Made with love in India ♡
          </p>
        </div>
      </section>

      {/* 3. FEATURED PIECES */}
      <section className="bg-white py-16 px-6 md:px-12 border-y border-stone-200/60">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xs font-semibold tracking-[0.25em] text-stone-600 uppercase mb-10">
            FEATURED PIECES
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredProducts.map((item) => {
              const currentQty = quantities[item.id] || 1;
              const isThisAdding = addingId === item.id;

              return (
                <div key={item.id} className="group flex flex-col items-center border border-stone-100 p-3 rounded-sm bg-[#FAF8F5]">
                  {/* Product Image */}
                  <div className="w-full aspect-square bg-stone-100 overflow-hidden mb-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Name & Price */}
                  <span className="text-[11px] text-stone-700 font-medium tracking-wide truncate w-full">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-stone-500 mt-0.5">
                    £{item.price.toFixed(2)}
                  </span>

                  {/* Quantity Controller & Add to Cart Action */}
                  <div className="w-full mt-3 space-y-2">
                    {/* +/- Button Group */}
                    <div className="flex items-center justify-between border border-stone-200 bg-white rounded-sm text-xs select-none">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-[11px] font-semibold text-stone-800">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add To Cart Button with Click Animation & Text Swap */}
                    <button
                      onClick={() => handleAdd(item)}
                      className={`w-full bg-[#868C79] hover:bg-[#747969] active:bg-[#636858] text-white 
                        text-[9px] font-semibold tracking-widest uppercase py-2 
                        transition-all duration-150 ease-out transform active:scale-90 select-none rounded-sm
                        ${isThisAdding ? 'scale-90 bg-[#636858]' : 'scale-100'}`}
                    >
                      {isThisAdding ? 'Added ✓' : 'ADD TO CART'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link 
              to="/shop" 
              className="inline-block bg-[#868C79] hover:bg-[#747969] active:bg-[#636858] text-white text-[10px] font-semibold tracking-widest uppercase px-6 py-3 transition-all duration-150 ease-out transform active:scale-95"
            >
              VIEW FULL COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* 4. THREE BRAND VALUES / FEATURES */}
      <section className="py-12 border-b border-stone-200/60 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-stone-300/60">
          <div className="pt-4 md:pt-0 md:px-6 flex items-start gap-4">
            <span className="text-2xl">🌿</span>
            <div>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">HANDMADE</h4>
              <p className="text-[11px] text-stone-500 mt-1">Every item is individually created with care</p>
            </div>
          </div>

          <div className="pt-4 md:pt-0 md:px-6 flex items-start gap-4">
            <span className="text-2xl">✦</span>
            <div>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">UNIQUE</h4>
              <p className="text-[11px] text-stone-500 mt-1">No two pieces are ever the same</p>
            </div>
          </div>

          <div className="pt-4 md:pt-0 md:px-6 flex items-start gap-4">
            <span className="text-2xl">🎁</span>
            <div>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">PERFECT FOR GIFTING</h4>
              <p className="text-[11px] text-stone-500 mt-1">Thoughtful, personal and made to last</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSTAGRAM / STYLE GALLERY */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h3 className="text-xs font-semibold tracking-[0.25em] text-stone-600 uppercase mb-8">
          SEE HOW YOU STYLE YOUR PIECES
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {styleGallery.map((img, i) => (
            <div key={i} className="aspect-4/5 bg-stone-200 overflow-hidden">
              <img src={img} alt={`Style ${i+1}`} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
            </div>
          ))}
        </div>

        <p className="text-[10px] tracking-widest text-stone-500 uppercase mt-6">
          FOLLOW ME ON INSTAGRAM → <a href="https://instagram.com" target="_blank" rel="noreferrer" className="underline font-medium text-stone-700">@am.soni_83</a>
        </p>
      </section>

      {/* 6. CUSTOM ORDERS SECTION */}
      <section className="bg-[#EBE7DF] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif text-stone-800">
              Looking for something personal?
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              I offer custom jewellery — perfect for special memories or meaningful gifts.
            </p>
            <Link 
              to="/custom-orders" 
              className="inline-block bg-[#868C79] hover:bg-[#747969] active:bg-[#636858] text-white text-[10px] font-semibold tracking-widest uppercase px-6 py-3 transition-all duration-150 ease-out transform active:scale-95 mt-2"
            >
              REQUEST A CUSTOM ORDER
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {customPieces.map((img, idx) => (
              <div key={idx} className="aspect-square bg-stone-100 overflow-hidden rounded-sm">
                <img src={img} alt={`Custom piece ${idx+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h3 className="text-xs font-semibold tracking-[0.25em] text-stone-600 uppercase mb-8">
          KIND WORDS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white border border-stone-200/60 p-6 flex flex-col items-center justify-center space-y-3">
              <span className="text-stone-400 font-serif text-2xl">“</span>
              <p className="text-xs text-stone-600 font-serif italic max-w-xs">{t.quote}</p>
              <div className="text-amber-400 text-xs">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER METRICS BAR */}
      <section className="border-t border-stone-200/80 bg-white py-6 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-[10px] tracking-widest uppercase text-stone-600">
          <div>✈ ALL OVER INDIA SHIPPING</div>
          <div>✂ DESIGN TO ORDER (10-25 DAYS)</div>
          <div>🎁 PACKAGED WITH CARE</div>
          <div>🌿 ECO FRIENDLY PACKAGING</div>
        </div>
      </section>

      {/* 9. ADDED TO BAG NOTIFICATION POPUP CARD */}
      {showToast && toastItem && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-stone-200 shadow-2xl p-4 max-w-xs w-full flex items-center gap-3 transition-all duration-300">
          {toastItem.image && (
            <img 
              src={toastItem.image} 
              alt={toastItem.name} 
              className="w-12 h-12 object-cover shrink-0 rounded-sm"
            />
          )}
          <div className="grow min-w-0 text-left">
            <p className="text-[9px] uppercase font-semibold text-[#868C79] tracking-widest">
              Added to Bag ✓
            </p>
            <h4 className="text-xs font-semibold text-stone-800 truncate">
              {toastItem.name}
            </h4>
            <p className="text-[10px] text-stone-500">
              Qty: {toastItem.qty} • £{(toastItem.price * toastItem.qty).toFixed(2)}
            </p>
          </div>
          <button 
            onClick={() => setShowToast(false)}
            className="text-stone-400 hover:text-stone-700 text-xs font-bold px-1 focus:outline-none"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}