import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Views
import About from './Pages/About';
import Contact from './Pages/Contact';
import CustomOrders from './Pages/CustomOrders';
import Shipping from './Pages/Shipping';
import Returns from './Pages/Returns';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import TrackOrder from './Pages/TrackOrder';
import OrderSuccess from './Pages/OrderSuccess';
import NotFound from './Pages/NotFound';

export default function App() {
  // Load initial cart state from localStorage (persists across refreshes)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('nds_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });

  // Automatically save cart changes to localStorage
  useEffect(() => {
    localStorage.setItem('nds_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handler: Add to cart
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  // Handler: Update product quantity
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handler: Remove item completely
  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF9F6]">
      <ScrollToTop />

      {/* Header receives state & modifier handlers */}
      <Header
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />

      <main className="grow">
        <Routes>
          <Route path="/" element={<Hero onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/custom-orders" element={<CustomOrders />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/shop" element={<Shop setCartItems={setCartItems} />} />
          <Route path="/shop/:category" element={<Shop setCartItems={setCartItems} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}