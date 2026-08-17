import React from 'react';
import { Link } from 'react-router-dom';

export default function Shipping() {
  return (
    <div className="bg-[#FAF8F5] text-stone-700 font-sans min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="bg-[#EBE7DF] py-16 px-6 md:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
            DELIVERY & PROCESSING
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-stone-800">
            Shipping Information
          </h1>
          <p className="text-xs md:text-sm text-stone-600 font-light max-w-lg mx-auto leading-relaxed pt-2">
            Every resin keepsake is crafted and packed with extreme care. Here is everything you need to know about processing times and delivery options.
          </p>
        </div>
      </section>

      {/* 2. PROCESSING TIMES SUMMARY */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-b border-stone-200/60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-6 bg-white border border-stone-200/60 space-y-2">
            <span className="text-2xl">📦</span>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-800">
              Ready-to-Ship Items
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Standard in-stock jewelry and accessories ship within <strong>2–4 business days</strong>.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200/60 space-y-2">
            <span className="text-2xl">🌿</span>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-800">
              Custom & Made-to-Order
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Preservation pieces requiring custom floral drying or personalized casting take <strong>2–3 weeks</strong> prior to dispatch.
            </p>
          </div>

        </div>
      </section>

      {/* 3. SHIPPING RATES TABLE */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
            RATES & TIMELINES
          </span>
          <h2 className="text-2xl font-serif text-stone-800 mt-1">
            Delivery Estimates
          </h2>
        </div>

        <div className="overflow-x-auto bg-white border border-stone-200/80 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EBE7DF]/50 border-b border-stone-200 text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                <th className="p-4">Destination</th>
                <th className="p-4">Shipping Method</th>
                <th className="p-4">Estimated Time</th>
                <th className="p-4">Cost</th>
              </tr>
            </thead>
            <tbody className="text-xs font-light text-stone-600 divide-y divide-stone-100">
              <tr>
                <td className="p-4 font-normal text-stone-800">Domestic (UK)</td>
                <td className="p-4">Standard Tracked</td>
                <td className="p-4">2–3 Business Days</td>
                <td className="p-4">£3.95 (Free over £50)</td>
              </tr>
              <tr>
                <td className="p-4 font-normal text-stone-800">Domestic (UK)</td>
                <td className="p-4">Express First Class</td>
                <td className="p-4">1–2 Business Days</td>
                <td className="p-4">£5.95</td>
              </tr>
              <tr>
                <td className="p-4 font-normal text-stone-800">Europe</td>
                <td className="p-4">International Tracked</td>
                <td className="p-4">5–10 Business Days</td>
                <td className="p-4">£9.50</td>
              </tr>
              <tr>
                <td className="p-4 font-normal text-stone-800">Rest of World (USA/CA/AUS)</td>
                <td className="p-4">International Tracked</td>
                <td className="p-4">7–14 Business Days</td>
                <td className="p-4">£12.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. IMPORTANT SHIPPING DETAILS */}
      <section className="bg-white py-16 px-6 border-y border-stone-200/60">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xs font-semibold tracking-[0.25em] text-stone-600 uppercase">
              GOOD TO KNOW
            </h3>
            <p className="text-2xl font-serif text-stone-800 mt-2">
              Packaging & Custom Fees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="space-y-2">
              <span className="text-xl">💌</span>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                Eco-Friendly Packaging
              </h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                All items are gift-wrapped in recyclable boxes using organic cotton pouches and acid-free tissue paper.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xl">🔍</span>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                Tracking Included
              </h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                A tracking code will be emailed to you as soon as your order has been dispatched from our studio.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xl">✈️</span>
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                Customs & Import Duties
              </h4>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                International buyers are responsible for any customs and import taxes that may apply upon arrival.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CONTACT CTA */}
      <section className="bg-[#EBE7DF] py-16 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="text-2xl font-serif text-stone-800">
            Have Questions About Your Delivery?
          </h3>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            If you need an order rushed for a special date or need to update your shipping address, feel free to contact us.
          </p>
          <div className="pt-2">
            <Link 
              to="/contact" 
              className="inline-block bg-[#868C79] hover:bg-[#747969] text-white text-[11px] font-semibold tracking-widest uppercase px-6 py-3 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}