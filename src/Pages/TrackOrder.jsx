import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    setError('');

    // Fetch orders stored locally
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Find matching order (checking both _id/orderId and email)
    const foundOrder = savedOrders.find((o) => {
      const matchId = (o._id || o.orderId || '').toString().toLowerCase();
      const searchId = orderId.trim().toLowerCase();
      const matchEmail = (o.address?.email || '').toLowerCase();
      const searchEmail = email.trim().toLowerCase();

      return matchId.includes(searchId) && matchEmail === searchEmail;
    });

    if (foundOrder) {
      setOrderDetails(foundOrder);
    } else {
      setError('No order found matching those details. Please check your Order ID and Email.');
      setOrderDetails(null);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-700 min-h-screen py-12 px-6 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* TRACK FORM CARD */}
        <div className="bg-white p-8 border border-stone-200/80 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-[0.2em] text-stone-400 uppercase font-semibold">
              Order Status
            </span>
            <h1 className="text-2xl font-serif text-stone-800">Track Your Order</h1>
            <p className="text-xs text-stone-500 font-light max-w-sm mx-auto">
              Enter the Order ID you received on your confirmation screen along with your email address.
            </p>
          </div>

          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
                Order ID *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ORD-849201"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-stone-600 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#868C79] hover:bg-[#747969] text-white text-[10px] font-semibold tracking-widest uppercase py-3.5 transition-colors"
            >
              Find Order Details
            </button>
          </form>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs text-center">
              {error}
            </div>
          )}
        </div>

        {/* ORDER RESULT DETAILS */}
        {orderDetails && (
          <div className="bg-white p-8 border border-stone-200/80 shadow-sm space-y-6">
            
            {/* Header Status */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#FAF8F5] p-4 border border-stone-200/60">
              <div>
                <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                  Order Reference
                </span>
                <span className="font-serif text-lg text-stone-800 font-semibold">
                  #{orderDetails._id || orderDetails.orderId}
                </span>
              </div>

              <div className="flex gap-6 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                    Date Placed
                  </span>
                  <span className="text-stone-700 font-medium">{orderDetails.date}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                    Current Status
                  </span>
                  <span className="inline-block bg-[#868C79]/15 text-[#868C79] px-2 py-0.5 rounded text-[11px] font-semibold">
                    {orderDetails.status || 'Processing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="text-xs space-y-1 border-b border-stone-100 pb-4">
              <h3 className="font-semibold text-stone-800 uppercase tracking-wider text-[10px] mb-2">
                Shipping Details
              </h3>
              <p className="font-medium text-stone-800">{orderDetails.address?.fullName}</p>
              <p className="text-stone-500">
                {orderDetails.address?.street}, {orderDetails.address?.city}, {orderDetails.address?.state} - {orderDetails.address?.pincode}
              </p>
              <p className="text-stone-500">Phone: {orderDetails.address?.phone}</p>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-800 uppercase tracking-wider text-[10px]">
                Items in this Order ({orderDetails.items?.length || 0})
              </h3>
              <div className="space-y-2">
                {orderDetails.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs border-b border-stone-100 pb-2">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-sm bg-stone-100" />
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
            </div>

            {/* Total Paid */}
            <div className="flex justify-between items-center pt-2 text-sm font-semibold text-stone-800 border-t border-stone-200">
              <span>Total Paid Amount:</span>
              <span>£{orderDetails.grandTotal?.toFixed(2)}</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}