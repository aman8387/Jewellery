import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const categories = [
    { name: 'All Jewelry', path: '/shop' },
    { name: 'Rings', path: '/shop/rings' },
    { name: 'Necklaces', path: '/shop/necklaces' },
    { name: 'Earrings', path: '/shop/earrings' },
    { name: 'Bracelets', path: '/shop/bracelets' },
    { name: 'Custom Pieces', path: '/shop/custom' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    // Trigger button click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);

    // Save email to localStorage
    const existingList = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
    localStorage.setItem('newsletter_emails', JSON.stringify([...existingList, email]));

    // Clear input field and show success state
    setEmail('');
    setSubscribed(true);

    // Reset success message after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#EFECE6] text-stone-600 pt-16 pb-8 px-6 md:px-12 border-t border-stone-300/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 mb-16 text-xs tracking-wider">
        
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-serif text-stone-800 leading-none capitalize">
              Aman
            </h2>
            <p className="text-[10px] tracking-[0.3em] text-stone-500 font-light mt-1 uppercase">
              Jewellers
            </p>
          </Link>
          <p className="text-[11px] leading-relaxed text-stone-500 tracking-widest uppercase">
            Pure Elegance in Every Design <br /> & Backed by Purity
          </p>
        </div>

        {/* Dynamic Shop Column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-stone-800 uppercase tracking-widest text-[11px]">
            SHOP
          </h3>
          <ul className="space-y-2 text-stone-600 text-[11px]">
            {categories.map((cat, index) => (
              <li key={index}>
                <Link to={cat.path} className="hover:text-stone-900 transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info Column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-stone-800 uppercase tracking-widest text-[11px]">
            INFO
          </h3>
          <ul className="space-y-2 text-stone-600 text-[11px]">
            <li><Link to="/about" className="hover:text-stone-900 transition-colors">About</Link></li>
            <li><Link to="/track-order" className="hover:text-stone-900 transition-colors">Track Order</Link></li>
            <li><Link to="/custom-orders" className="hover:text-stone-900 transition-colors">Custom Orders</Link></li>
            <li><Link to="/shipping" className="hover:text-stone-900 transition-colors">Shipping</Link></li>
            <li><Link to="/returns" className="hover:text-stone-900 transition-colors">Returns</Link></li>
          </ul>
        </div>

        {/* Connect Column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-stone-800 uppercase tracking-widest text-[11px]">
            CONNECT
          </h3>
          <ul className="space-y-2 text-stone-600 text-[11px]">
            <li>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-stone-900 transition-colors"
              >
                Instagram
              </a>
            </li>
            <li><Link to="/contact" className="hover:text-stone-900 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Interactive Newsletter Column */}
        <div className="space-y-3 md:col-span-1">
          <h3 className="font-semibold text-stone-800 uppercase tracking-widest text-[11px]">
            JOIN THE LIST
          </h3>
          <p className="text-[11px] leading-relaxed text-stone-500">
            Be the first to hear about new pieces and special offers!
          </p>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-3 py-2 bg-white text-stone-800 text-xs focus:outline-none placeholder:text-stone-400 border border-stone-200 transition-all duration-200 focus:border-stone-400"
              required
            />
            
            <button
              type="submit"
              className={`bg-[#8A8477] hover:bg-[#787266] active:bg-[#666156] text-white p-2 
                transition-all duration-150 ease-out transform active:scale-90 focus:outline-none 
                flex items-center justify-center min-w-9 h-8.25
                ${isClicked ? 'scale-90 bg-[#666156]' : 'scale-100'}`}
              aria-label="Subscribe"
            >
              <svg 
                className={`w-4 h-4 fill-current transition-transform duration-200 ${isClicked ? 'scale-125' : 'scale-100'}`} 
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </form>

          {/* SUCCESS MESSAGE */}
          {subscribed && (
            <p className="text-[10px] text-[#868C79] font-semibold tracking-wider uppercase pt-1">
              ✓ Thank you for subscribing!
            </p>
          )}
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-stone-300/40 pt-6 text-center text-[10px] text-stone-500 tracking-wider">
        © {new Date().getFullYear()} Gold, Silver and Diamond. All rights reserved.
      </div>
    </footer>
  );
}