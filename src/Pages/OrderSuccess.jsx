import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // Safeguard: Redirect home if accessed directly without order data
  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[#FAF8F5] text-stone-700 min-h-screen py-12 px-6 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* SUCCESS HEADER */}
        <div className="bg-white p-8 border border-stone-200/80 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-[#868C79]/10 text-[#868C79] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            ✓
          </div>

          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.2em] text-stone-400 uppercase font-semibold">
              Thank You For Your Order
            </span>
            <h1 className="text-2xl font-serif text-stone-800">
              Order #{order._id || order.orderId} Confirmed
            </h1>
            <p className="text-xs text-stone-500 font-light max-w-md mx-auto">
              We’ve received your order and are getting it ready. A confirmation email has been sent to{' '}
              <span className="font-medium text-stone-700">{order.address?.email}</span>.
            </p>
          </div>

          {/* QUICK TRACKING BANNER */}
          <div className="bg-[#FAF8F5] p-3 border border-stone-200/60 text-xs text-stone-600 flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
            <span>Want to review this order later?</span>
            <Link
              to="/track-order"
              className="text-[#868C79] font-semibold underline text-[11px] hover:text-[#747969]"
            >
              Track Order via ID & Email ➔
            </Link>
          </div>
        </div>

        {/* ORDER RECEIPT CARD */}
        <div className="bg-white p-8 border border-stone-200/80 shadow-sm space-y-6">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-stone-800 uppercase border-b border-stone-200 pb-3">
            Order Summary
          </h2>

          {/* SHIPPING & DATE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-stone-100 pb-6">
            <div>
              <h3 className="font-semibold text-stone-800 uppercase tracking-wider text-[10px] mb-1">
                Shipping Address
              </h3>
              <p className="font-medium text-stone-800">{order.address?.fullName}</p>
              <p className="text-stone-500">
                {order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.pincode}
              </p>
              <p className="text-stone-500">Phone: {order.address?.phone}</p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 uppercase tracking-wider text-[10px] mb-1">
                Order Details
              </h3>
              <p className="text-stone-500">
                Date: <span className="text-stone-700 font-medium">{order.date}</span>
              </p>
              <p className="text-stone-500">
                Status:{' '}
                <span className="inline-block bg-[#868C79]/15 text-[#868C79] px-2 py-0.5 rounded text-[10px] font-semibold uppercase">
                  {order.status || 'Processing'}
                </span>
              </p>
            </div>
          </div>

          {/* PURCHASED ITEMS */}
          <div className="space-y-3">
            <h3 className="font-semibold text-stone-800 uppercase tracking-wider text-[10px]">
              Items Ordered ({order.items?.length || 0})
            </h3>
            <div className="space-y-3">
              {order.items?.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs border-b border-stone-100 pb-3">
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

          {/* TOTAL BREAKDOWN */}
          <div className="space-y-2 text-xs text-stone-600 border-t border-stone-200 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>£{order.subtotal?.toFixed(2) || order.grandTotal?.toFixed(2)}</span>
            </div>
            {order.shippingFee !== undefined && (
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingFee === 0 ? 'FREE' : `£${order.shippingFee.toFixed(2)}`}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold text-stone-800 pt-2 border-t border-stone-100">
              <span>Total Paid</span>
              <span>£{order.grandTotal?.toFixed(2)}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="pt-4 text-center">
            <Link
              to="/shop"
              className="inline-block bg-[#868C79] hover:bg-[#747969] text-white text-[10px] font-semibold tracking-widest uppercase px-8 py-3.5 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}