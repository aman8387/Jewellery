import React, { useState } from 'react';

export default function CustomOrders() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pieceType: 'Necklace',
    floralDetails: '',
    specialInclusions: '',
    targetDate: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-700 font-sans min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="bg-[#EBE7DF] py-16 px-6 md:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
            MADE JUST FOR YOU
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-stone-800">
            Request a Custom Piece
          </h1>
          <p className="text-xs md:text-sm text-stone-600 font-light max-w-lg mx-auto leading-relaxed pt-2">
            Turn your wedding bouquet, memorial flowers, or personal sentiment into an everlasting resin keepsake.
          </p>
        </div>
      </section>

      {/* 2. THE PROCESS (3 STEPS) */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-b border-stone-200/60">
        <div className="text-center mb-12">
          <h2 className="text-xs font-semibold tracking-[0.25em] text-stone-600 uppercase">
            HOW CUSTOM ORDERS WORK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white border border-stone-200/60 space-y-3">
            <span className="text-2xl font-serif text-stone-400">01</span>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-800">
              Submit Your Vision
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Fill out the form below with your desired jewelry piece, color palette, and special inclusions.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200/60 space-y-3">
            <span className="text-2xl font-serif text-stone-400">02</span>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-800">
              Send Your Florals
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              If sending dried flowers or sentimental items, we'll email you easy shipping instructions.
            </p>
          </div>

          <div className="p-6 bg-white border border-stone-200/60 space-y-3">
            <span className="text-2xl font-serif text-stone-400">03</span>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-800">
              Handcrafted with Care
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              We cast and polish your bespoke piece. Custom creation takes approximately 2–3 weeks.
            </p>
          </div>
        </div>
      </section>

      {/* 3. REQUEST FORM */}
      <section className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="bg-white p-8 md:p-12 border border-stone-200/80 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <span className="text-4xl">🌸</span>
              <h3 className="text-2xl font-serif text-stone-800">
                Custom Request Received!
              </h3>
              <p className="text-xs text-stone-600 font-light max-w-md mx-auto leading-relaxed">
                Thank you for sharing your ideas. We will review your request and get back to you within 24–48 hours with a quote and timeline.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 inline-block bg-[#868C79] hover:bg-[#747969] text-white text-[10px] font-semibold tracking-widest uppercase px-6 py-3 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-stone-200 pb-2 mb-6">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-stone-800 uppercase">
                  Custom Order Form
                </h3>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-stone-700 uppercase">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Clara Oswald"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400 placeholder:text-stone-400"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-stone-700 uppercase">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. clara@example.com"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400 placeholder:text-stone-400"
                />
              </div>

              {/* Piece Type */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-stone-700 uppercase">
                  Type of Piece *
                </label>
                <select
                  name="pieceType"
                  value={formData.pieceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400 cursor-pointer"
                >
                  <option value="Necklace">Pendant / Necklace</option>
                  <option value="Ring">Resin Ring</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Bracelet">Bracelet</option>
                  <option value="Coaster / Tray">Home Decor (Coaster/Tray)</option>
                  <option value="Keyring">Keyring / Accessory</option>
                </select>
              </div>

              {/* Inclusions / Florals Details */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-stone-700 uppercase">
                  Florals & Design Ideas *
                </label>
                <textarea
                  name="floralDetails"
                  rows="4"
                  value={formData.floralDetails}
                  onChange={handleChange}
                  required
                  placeholder="Describe your flower choices, preferred colors, or metallic flakes (gold, silver, copper)..."
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400 placeholder:text-stone-400 resize-none"
                ></textarea>
              </div>

              {/* Target Date */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-stone-700 uppercase">
                  Need by Specific Date? (Optional)
                </label>
                <input
                  type="date"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#868C79] hover:bg-[#747969] text-white text-[11px] font-semibold tracking-widest uppercase py-4 transition-colors"
              >
                Submit Custom Request
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}