import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ cartItems = [], setCartItems }) {
  const navigate = useNavigate();
  const [step, setStep] = useState('cart'); // 'cart' | 'address' | 'review'

  const [address, setAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 50 || subtotal === 0 ? 0 : 4.99;
  const grandTotal = subtotal + shippingFee;

  // HANDLE ORDER PLACEMENT
  const handlePlaceOrder = () => {
    // 1. Create order object structured for future MongoDB backend
    const newOrder = {
      _id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cartItems,
      address,
      grandTotal,
      subtotal,
      shippingFee,
      date: new Date().toLocaleDateString(),
      status: 'Processing',
    };

    // 2. Persist order in local storage for the Track Order page
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

    // 3. Clear shopping bag
    setCartItems([]);

    // 4. Redirect to confirmation page with state
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-700 font-sans min-h-screen">
      
      {/* HEADER BANNER */}
      <section className="bg-[#EBE7DF] py-12 px-6 text-center">
        <h1 className="text-3xl font-serif text-stone-800">
          {step === 'cart' && 'Your Shopping Bag'}
          {step === 'address' && 'Shipping Details'}
          {step === 'review' && 'Order Review'}
        </h1>

        <div className="flex justify-center items-center gap-2 md:gap-6 mt-6 text-xs uppercase tracking-widest font-semibold text-stone-500">
          <button
            onClick={() => setStep('cart')}
            className={`pb-1 border-b-2 transition-colors ${
              step === 'cart' ? 'border-stone-800 text-stone-800' : 'border-transparent hover:text-stone-800'
            }`}
          >
            1. Bag ({cartItems.reduce((a, c) => a + c.quantity, 0)})
          </button>
          <span>&rarr;</span>
          <button
            onClick={() => cartItems.length > 0 && setStep('address')}
            disabled={cartItems.length === 0}
            className={`pb-1 border-b-2 transition-colors ${
              step === 'address' ? 'border-stone-800 text-stone-800' : 'border-transparent hover:text-stone-800'
            }`}
          >
            2. Address
          </button>
          <span>&rarr;</span>
          <button
            onClick={() => cartItems.length > 0 && address.fullName && setStep('review')}
            disabled={!address.fullName}
            className={`pb-1 border-b-2 transition-colors ${
              step === 'review' ? 'border-stone-800 text-stone-800' : 'border-transparent hover:text-stone-800'
            }`}
          >
            3. Review & Pay
          </button>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7">
          
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <div>
              {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-white border border-stone-200/80 space-y-4">
                  <span className="text-4xl">🌸</span>
                  <p className="text-sm text-stone-600 font-light">Your bag is currently empty.</p>
                  <Link
                    to="/shop"
                    className="inline-block bg-[#868C79] hover:bg-[#747969] text-white text-[10px] font-semibold tracking-widest uppercase px-6 py-3 transition-colors"
                  >
                    Explore Collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 sm:gap-6 bg-white p-4 border border-stone-200/80 items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover bg-stone-100 rounded-sm"
                      />
                      
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] tracking-widest text-stone-400 uppercase font-semibold">
                          {item.category || 'Resin Item'}
                        </span>
                        <h3 className="text-xs font-semibold text-stone-800">{item.name}</h3>
                        <p className="text-xs text-stone-600">£{item.price.toFixed(2)}</p>

                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center border border-stone-200 text-xs">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 hover:bg-stone-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-0.5 text-stone-800">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 hover:bg-stone-100"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[10px] text-stone-400 hover:text-red-500 underline uppercase tracking-wider"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="text-right text-xs font-semibold text-stone-800">
                        £{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 flex justify-between items-center">
                    <Link
                      to="/shop"
                      className="text-[11px] font-semibold tracking-widest uppercase text-stone-600 hover:text-stone-900"
                    >
                      &larr; Continue Shopping
                    </Link>
                    <button
                      onClick={() => setStep('address')}
                      className="bg-[#868C79] hover:bg-[#747969] text-white text-[11px] font-semibold tracking-widest uppercase px-6 py-3.5 transition-colors"
                    >
                      Proceed to Shipping &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: ADDRESS FORM */}
          {step === 'address' && (
            <div className="bg-white p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-xs font-semibold tracking-[0.2em] text-stone-800 uppercase">
                  Shipping Address
                </h2>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep('review'); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold tracking-wider text-stone-600 uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleAddressChange}
                      required
                      placeholder="e.g. Clara Oswald"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold tracking-wider text-stone-600 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={address.email}
                      onChange={handleAddressChange}
                      required
                      placeholder="clara@example.com"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold tracking-wider text-stone-600 uppercase">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    required
                    placeholder="House/Flat No., Building, Street Name"
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold tracking-wider text-stone-600 uppercase">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      required
                      placeholder="e.g. London / Jaipur"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold tracking-wider text-stone-600 uppercase">
                      State / Region *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      required
                      placeholder="State"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold tracking-wider text-stone-600 uppercase">
                      Postal / Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleAddressChange}
                      required
                      placeholder="Postal Code"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold tracking-wider text-stone-600 uppercase">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                  />
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="text-[11px] font-semibold tracking-widest uppercase text-stone-600 hover:text-stone-900"
                  >
                    &larr; Back to Bag
                  </button>
                  <button
                    type="submit"
                    disabled={!address.fullName || !address.email || !address.street || !address.pincode}
                    className="bg-[#868C79] hover:bg-[#747969] disabled:opacity-50 text-white text-[11px] font-semibold tracking-widest uppercase px-6 py-3.5 transition-colors"
                  >
                    Review Order &rarr;
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 'review' && (
            <div className="bg-white p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-xs font-semibold tracking-[0.2em] text-stone-800 uppercase">
                  Confirm Order & Address
                </h2>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-stone-200/60 rounded-sm space-y-1 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-stone-800 uppercase tracking-wider text-[10px]">
                    Deliver To:
                  </span>
                  <button
                    onClick={() => setStep('address')}
                    className="text-[#868C79] font-semibold underline text-[10px]"
                  >
                    Edit
                  </button>
                </div>
                <p className="font-medium text-stone-800">{address.fullName}</p>
                <p className="text-stone-600">{address.street}, {address.city}, {address.state} - {address.pincode}</p>
                <p className="text-stone-600">Phone: {address.phone}</p>
              </div>

              <div className="space-y-3">
                <span className="font-semibold text-stone-800 uppercase tracking-wider text-[10px]">
                  Order Items ({cartItems.length}):
                </span>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs border-b border-stone-100 pb-2">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover" />
                      <div>
                        <p className="font-medium text-stone-800">{item.name}</p>
                        <p className="text-stone-400 text-[10px]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-stone-800">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setStep('address')}
                  className="text-[11px] font-semibold tracking-widest uppercase text-stone-600 hover:text-stone-900"
                >
                  &larr; Back to Address
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="bg-[#868C79] hover:bg-[#747969] text-white text-[11px] font-semibold tracking-widest uppercase px-8 py-4 transition-colors"
                >
                  Place Order (£{grandTotal.toFixed(2)})
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 border border-stone-200/80 shadow-sm space-y-6 sticky top-24">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-stone-800 uppercase border-b border-stone-200 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800">£{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-stone-800">
                  {shippingFee === 0 ? 'FREE' : `£${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <hr className="border-stone-100" />

              <div className="flex justify-between text-sm font-semibold text-stone-800 pt-1">
                <span>Total Amount</span>
                <span>£{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}