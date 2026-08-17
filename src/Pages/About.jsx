import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-[#FAF8F5] text-stone-700 font-sans min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="bg-[#EBE7DF] py-16 px-6 md:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
            OUR STORY
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-stone-800">
            Behind the Botanicals
          </h1>
          <p className="text-xs md:text-sm text-stone-600 font-light max-w-lg mx-auto leading-relaxed pt-2">
            Preserving nature’s fleeting moments into wearable keepsakes made to be cherished forever.
          </p>
        </div>
      </section>

      {/* 2. MAIN STORY SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img 
            src="https://picsum.photos/seed/about-crafting/600/700" 
            alt="Handcrafting resin jewelry" 
            className="w-full h-100 object-cover rounded-sm shadow-sm"
          />
        </div>

        <div className="space-y-5">
          <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
            HANDMADE WITH LOVE
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800">
            Preserving Nature, <br /> One Piece at a Time
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Welcome to my creative studio! What started as a passion for foraging wildflowers in the countryside quickly turned into a dedicated craft of making unique resin jewelry and home keepsakes.
          </p>
          <p className="text-xs text-stone-600 leading-relaxed font-light">
            Every petal, leaf, and gold flake is individually selected, carefully dried, and cast by hand in high-quality UV and epoxy resin. Because natural florals vary in shape and shade, no two pieces are ever identical.
          </p>
          <p className="font-serif italic text-sm text-stone-800 pt-2">
            "Made with love in the UK, crafted for memories around the world."
          </p>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="bg-white py-16 px-6 border-y border-stone-200/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-xs font-semibold tracking-[0.25em] text-stone-600 uppercase">
              WHY CHOOSE OUR KEEPSAKES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="p-6 bg-[#FAF8F5] border border-stone-200/50 space-y-3">
              <span className="text-3xl">🌿</span>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                Sustainably Sourced
              </h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Florals are carefully gathered or sourced from local growers with conscious harvesting in mind.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-stone-200/50 space-y-3">
              <span className="text-3xl">✨</span>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                Crystal Clear Resin
              </h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                We use premium, UV-resistant resin designed to remain vibrant and brilliant over time.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-stone-200/50 space-y-3">
              <span className="text-3xl">💌</span>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                Thoughtfully Packaged
              </h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Every item arrives in eco-friendly, gift-ready packaging with a personalized handwritten note.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="bg-[#EBE7DF] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800">
            Looking for something uniquely yours?
          </h2>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            Whether you want to encapsulate bouquet flowers from a wedding or create a custom-tinted initial keychain, we love bringing your custom ideas to life.
          </p>
          <div className="pt-2">
            <Link 
              to="/shop/custom" 
              className="inline-block bg-[#868C79] hover:bg-[#747969] text-white text-[11px] font-semibold tracking-widest uppercase px-6 py-3 transition-colors"
            >
              EXPLORE CUSTOM ORDERS
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}