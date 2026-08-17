import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Pages/Logo';
import Search from '../Pages/Search';

export default function Header({
  cartItems = [],
  onUpdateQuantity,
  onRemoveFromCart,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  const shopRef = useRef(null);
  const cartRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns & mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopRef.current && !shopRef.current.contains(event.target)) {
        setShopOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const categories = [
    { name: 'All Jewelry', path: '/shop' },
    { name: 'Rings', path: '/shop/rings' },
    { name: 'Necklaces', path: '/shop/necklaces' },
    { name: 'Earrings', path: '/shop/earrings' },
    { name: 'Bracelets', path: '/shop/bracelets' },
    { name: 'Custom Pieces', path: '/shop/custom' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F7F4EF] text-stone-700 px-4 md:px-8 py-4 text-xs font-semibold tracking-widest uppercase border-b border-stone-200/50 shadow-sm backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <div className="relative" ref={shopRef}>
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="hover:text-stone-900 transition-colors flex items-center gap-1 py-2 focus:outline-none"
            >
              <span>SHOP</span>
              <span className="text-[9px]">{shopOpen ? '▲' : '▼'}</span>
            </button>

            {shopOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-[#F7F4EF] border border-stone-200 shadow-md py-2 z-50">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      navigate(cat.path);
                      setShopOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-stone-100/50 transition-colors text-[11px] font-medium tracking-wider text-stone-600 hover:text-stone-900"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-stone-900 transition-colors">
            About
          </Link>
        </div>

        {/* Mobile Menu Toggle & Drawer Container */}
        <div className="md:hidden relative" ref={mobileMenuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-stone-700 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <span className="text-xl font-bold">✕</span>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Navigation Dropdown Menu */}
          {menuOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#F7F4EF] border border-stone-200 shadow-lg py-4 px-4 z-50 rounded-sm">
              <div className="space-y-3 normal-case tracking-normal">
                {/* Mobile Shop Collapsible */}
                <div>
                  <button
                    onClick={() => setMobileShopOpen(!mobileShopOpen)}
                    className="flex items-center justify-between w-full text-left font-semibold uppercase text-xs text-stone-800 tracking-widest py-2 border-b border-stone-200/60"
                  >
                    <span>SHOP</span>
                    <span className="text-[10px]">{mobileShopOpen ? '▲' : '▼'}</span>
                  </button>

                  {mobileShopOpen && (
                    <div className="pl-3 pt-2 space-y-2 border-l border-stone-300 ml-1 mt-1">
                      {categories.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => {
                            navigate(cat.path);
                            setMenuOpen(false);
                          }}
                          className="block w-full text-left text-xs text-stone-600 hover:text-stone-900 py-1"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="block font-semibold uppercase text-xs text-stone-800 tracking-widest py-2 border-b border-stone-200/60"
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Center Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Right Action Menu */}
        <div className="flex items-center gap-6 md:gap-8">
          <Search />

          {/* Cart Dropdown Container */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="flex items-center gap-2 hover:text-stone-900 transition-colors focus:outline-none"
            >
              <span>CART</span>
              <span className="bg-[#868C79] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold lowercase tracking-normal">
                {totalItemsCount}
              </span>
            </button>

            {/* Expanded Cart Preview */}
            {cartOpen && (
              <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-stone-200/80 shadow-xl p-4 normal-case font-normal text-stone-700 z-50 rounded-sm">
                <div className="flex justify-between items-center border-b border-stone-100 pb-2 mb-3">
                  <span className="text-xs font-semibold tracking-widest uppercase text-stone-800">
                    Your Cart ({totalItemsCount})
                  </span>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="text-stone-400 hover:text-stone-700 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-xs text-stone-500 font-light">
                    Your cart is currently empty.
                  </div>
                ) : (
                  <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 items-center text-xs border-b border-stone-100 pb-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-sm bg-stone-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-stone-800 truncate">{item.name}</p>
                          <p className="text-stone-500 text-[11px] mt-0.5">
                            £{item.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-stone-200 bg-stone-50 rounded-sm">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 transition-colors font-bold text-[10px]"
                              >
                                -
                              </button>
                              <span className="px-2 text-[11px] font-semibold text-stone-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 transition-colors font-bold text-[10px]"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-[10px] text-red-500 hover:underline uppercase tracking-wider ml-auto"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <span className="font-semibold text-stone-800 text-xs self-start">
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {cartItems.length > 0 && (
                  <div className="border-t border-stone-100 pt-3 mt-3 space-y-3">
                    <div className="flex justify-between text-xs font-semibold text-stone-800">
                      <span>Subtotal:</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>

                    <Link
                      to="/cart"
                      onClick={() => setCartOpen(false)}
                      className="block w-full text-center bg-[#868C79] hover:bg-[#747969] text-white text-[10px] font-semibold tracking-widest uppercase py-2.5 transition-colors"
                    >
                      View Cart & Checkout
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}