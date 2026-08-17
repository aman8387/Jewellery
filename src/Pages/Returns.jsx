import React from 'react';
import { Link } from 'react-router-dom';

export default function Returns() {
  return (
    <div className="bg-[#FAF8F5] text-stone-700 font-sans min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="bg-[#EBE7DF] py-16 px-6 md:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
            CUSTOMER SATISFACTION
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-stone-800">
            Returns & Exchanges
          </h1>
          <p className="text-xs md:text-sm text-stone-600 font-light max-w-lg mx-auto leading-relaxed pt-2">
            We want you to love your handcrafted piece. If something isn't quite right, we are here to help guide you through the process.
          </p>
        </div>
      </section>

      {/* 2. POLICY HIGHLIGHTS */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-b border-stone-200/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-white border border-stone-200/60 space-y-2 text-center">
            <span className="text-2xl">⏳</span>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-800">
              14-Day Return Window
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Standard non-custom items can be returned or exchanged within 14 days of delivery.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200/60 space-y-2 text-center">
            <span className="text-2xl">🌿</span>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-800">
              Condition & Packaging
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Items must be unworn, in original condition, and returned inside their original box.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200/60 space-y-2 text-center">
            <span className="text-2xl">💌</span>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-800">
              Easy Support
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Simply email us with your order number to initiate a return label or exchange request.
            </p>
          </div>

        </div>
      </section>

      {/* 3. RETURN EXCEPTIONS & DETAILS */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
            PLEASE NOTE
          </span>
          <h2 className="text-2xl font-serif text-stone-800 mt-1">
            Exceptions & Guidelines
          </h2>
        </div>

        <div className="bg-white p-8 border border-stone-200/80 shadow-sm space-y-6 text-xs font-light text-stone-600 leading-relaxed">
          
          <div className="space-y-1">
            <h4 className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
              Custom & Preservation Orders
            </h4>
            <p>
              Due to the unique nature of custom botanical resin pieces (e.g., wedding bouquet preservation, personalized text, or pet memorials), <strong>custom orders are non-refundable</strong> unless damaged during transit.
            </p>
          </div>

          <hr className="border-stone-100" />

          <div className="space-y-1">
            <h4 className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
              Earrings (Hygiene Policy)
            </h4>
            <p>
              For health and hygiene reasons, earrings cannot be returned or exchanged unless they arrive defective or damaged.
            </p>
          </div>

          <hr className="border-stone-100" />

          <div className="space-y-1">
            <h4 className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
              Damaged or Defective Items
            </h4>
            <p>
              If your item arrives damaged or broken during shipping, please contact us within <strong>48 hours</strong> of receipt with photo evidence so we can arrange a replacement or full refund immediately.
            </p>
          </div>

          <hr className="border-stone-100" />

          <div className="space-y-1">
            <h4 className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
              Return Postage Costs
            </h4>
            <p>
              Buyers are responsible for return shipping fees unless the item is faulty or damaged. We recommend using a tracked shipping service as we cannot accept responsibility for lost return packages.
            </p>
          </div>

        </div>
      </section>

      {/* 4. CONTACT CTA */}
      <section className="bg-[#EBE7DF] py-16 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h3 className="text-2xl font-serif text-stone-800">
            Need to Start a Return?
          </h3>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            Please reach out with your order number and detail the issue—our team will guide you through the next steps.
          </p>
          <div className="pt-2">
            <Link 
              to="/contact" 
              className="inline-block bg-[#868C79] hover:bg-[#747969] text-white text-[11px] font-semibold tracking-widest uppercase px-6 py-3 transition-colors"
            >
              Contact Us for Returns
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}