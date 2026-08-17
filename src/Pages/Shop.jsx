import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton';
import ToastNotification from '../components/CartNotification';

// Jewelry catalog matched to your categories
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Botanical Gold Resin Ring',
    category: 'Rings',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    description: 'Hand-cast clear resin ring embedded with delicate golden leaf flakes and botanical flora.',
    isNew: true,
  },
  {
    id: 'prod-2',
    name: 'Pressed Wildflower Pendant',
    category: 'Necklaces',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    description: 'Oval brass frame featuring preserved baby’s breath and forgotten forget-me-nots encased in crystal resin.',
    isNew: false,
  },
  {
    id: 'prod-3',
    name: 'Ethereal Drop Earrings',
    category: 'Earrings',
    price: 28.50,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=600',
    description: 'Lightweight resin drops with pearlescent mica shimmer and 18k gold-plated hooks.',
    isNew: true,
  },
  {
    id: 'prod-4',
    name: 'Celestial Resin Cuff',
    category: 'Bracelets',
    price: 52.00,
    image: 'https://images.unsplash.com/photo-1611591475858-a5b29074094f?auto=format&fit=crop&q=80&w=600',
    description: 'Statement open cuff infused with subtle midnight blue pigments and starry gold leaf details.',
    isNew: false,
  },
  {
    id: 'prod-5',
    name: 'Custom Memorial Flower Pendant',
    category: 'Custom Pieces',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    description: 'Personalized keepsake creation crafted using your own wedding or memorial petals.',
    isNew: false,
  },
  {
    id: 'prod-6',
    name: 'Minimalist Stacking Band',
    category: 'Rings',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600',
    description: 'Ultra-slim resin band with micro-embedded floral specks. Ideal for stacking.',
    isNew: false,
  },
];

const CATEGORIES = [
  { name: 'All Jewelry', path: '/shop', categoryKey: 'all' },
  { name: 'Rings', path: '/shop/rings', categoryKey: 'rings' },
  { name: 'Necklaces', path: '/shop/necklaces', categoryKey: 'necklaces' },
  { name: 'Earrings', path: '/shop/earrings', categoryKey: 'earrings' },
  { name: 'Bracelets', path: '/shop/bracelets', categoryKey: 'bracelets' },
  { name: 'Custom Pieces', path: '/shop/custom', categoryKey: 'custom' },
];

export default function Shop({ setCartItems }) {
  const { category } = useParams(); // Reads dynamic route params like /shop/:category
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // States for quantity, adding feedback, and toast notifications
  const [quantities, setQuantities] = useState({});
  const [addingId, setAddingId] = useState(null);
  const [toastItem, setToastItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Map URL category slug to readable string
  const activeCategoryKey = category ? category.toLowerCase() : 'all';

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const productCatKey = product.category.toLowerCase().replace(/\s+/g, '');
      const activeKeyClean = activeCategoryKey.replace(/\s+/g, '');

      const matchesCategory =
        activeKeyClean === 'all' || productCatKey.includes(activeKeyClean);

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [activeCategoryKey, searchQuery, sortBy]);

  // Quantity Handler
  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      const newQty = currentQty + delta;
      return { ...prev, [id]: newQty > 1 ? newQty : 1 };
    });
  };

  // Handle Cart Add with Toast Notification
  const handleAddToCart = (product, customQty) => {
    const qty = customQty || quantities[product.id] || 1;

    if (setCartItems) {
      setCartItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += qty;
          return updated;
        }
        return [...prev, { ...product, quantity: qty }];
      });
    }

    setAddingId(product.id);
    setToastItem({ ...product, qty });
    setShowToast(true);

    setTimeout(() => {
      setAddingId(null);
    }, 400);

    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-700 font-sans min-h-screen">
      
      {/* HEADER BANNER */}
      <section className="bg-[#EBE7DF] py-14 px-6 text-center">
        <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
          Handcrafted Jewelry
        </span>
        <h1 className="text-3xl md:text-4xl font-serif text-stone-800 mt-2">
          {activeCategoryKey === 'all'
            ? 'All Jewelry'
            : CATEGORIES.find((c) => c.categoryKey === activeCategoryKey)?.name || 'Collection'}
        </h1>
        <p className="text-xs text-stone-600 max-w-md mx-auto mt-3 font-light leading-relaxed">
          Explore our handcrafted rings, necklaces, earrings, and custom keepsake pieces.
        </p>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        
        {/* CONTROL BAR: NAVIGATION, SEARCH & SORT */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-stone-200 pb-6">
          
          {/* CATEGORY NAV LINKS */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive =
                (cat.categoryKey === 'all' && activeCategoryKey === 'all') ||
                cat.categoryKey === activeCategoryKey;

              return (
                <Link
                  key={cat.name}
                  to={cat.path}
                  className={`text-xs px-4 py-2 rounded-full transition-all tracking-wider ${
                    isActive
                      ? 'bg-[#868C79] text-white font-medium shadow-sm'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* SEARCH & SORT */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 bg-white border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 rounded-sm"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-stone-200 text-xs text-stone-700 focus:outline-none focus:border-stone-400 rounded-sm"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200/80 space-y-3">
            <p className="text-sm text-stone-600">No jewelry items found in this section.</p>
            <Link
              to="/shop"
              className="inline-block text-xs text-[#868C79] font-semibold underline uppercase tracking-wider"
            >
              View All Jewelry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const currentQty = quantities[product.id] || 1;
              const isThisAdding = addingId === product.id;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-stone-200/80 group flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* PRODUCT IMAGE */}
                    <div className="relative aspect-square overflow-hidden bg-stone-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-stone-800 text-white text-[9px] uppercase tracking-widest px-2 py-1">
                          New
                        </span>
                      )}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] uppercase font-semibold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        Quick View
                      </button>
                    </div>

                    {/* DETAILS */}
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] tracking-widest text-stone-400 uppercase font-semibold">
                          {product.category}
                        </span>
                        <span className="text-xs font-semibold text-stone-800">
                          £{product.price.toFixed(2)}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-stone-800">{product.name}</h3>
                      <p className="text-xs text-stone-500 line-clamp-2 font-light">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY & ADD TO BAG */}
                  <div className="p-5 pt-0 space-y-2">
                    <div className="flex items-center justify-between border border-stone-200 bg-stone-50 rounded-sm text-xs select-none">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="px-3 py-1 text-stone-600 hover:bg-stone-200 active:bg-stone-300 transition-colors font-semibold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-[11px] font-semibold text-stone-800">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="px-3 py-1 text-stone-600 hover:bg-stone-200 active:bg-stone-300 transition-colors font-semibold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <AddToCartButton
                      onClick={() => handleAddToCart(product)}
                      isAdding={isThisAdding}
                      text="Add to Bag"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 space-y-6 relative border border-stone-200">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 text-lg font-bold"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-48 sm:h-full object-cover bg-stone-100"
              />
              <div className="space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[9px] tracking-widest text-stone-400 uppercase font-semibold">
                    {quickViewProduct.category}
                  </span>
                  <h2 className="text-base font-serif text-stone-800">{quickViewProduct.name}</h2>
                  <p className="text-sm font-semibold text-stone-800">
                    £{quickViewProduct.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>

                <AddToCartButton
                  onClick={() => {
                    handleAddToCart(quickViewProduct, 1);
                    setQuickViewProduct(null);
                  }}
                  isAdding={addingId === quickViewProduct.id}
                  text="Add to Bag"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <ToastNotification
        show={showToast}
        item={toastItem}
        onClose={() => setShowToast(false)}
      />

    </div>
  );
}