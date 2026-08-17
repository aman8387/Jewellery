import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connect your backend API or email service (e.g., EmailJS, Formspree) here
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
            GET IN TOUCH
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-stone-800">
            We’d Love to Hear From You
          </h1>
          <p className="text-xs md:text-sm text-stone-600 font-light max-w-lg mx-auto leading-relaxed pt-2">
            Have a question about an order, a custom piece, or care instructions? Send us a message and we’ll reply within 24–48 hours.
          </p>
        </div>
      </section>

      {/* 2. CONTACT CONTENT GRID */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Info Column (5 cols) */}
        <div className="md:col-span-5 space-y-8">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
              DIRECT CONTACT
            </span>
            <h2 className="text-2xl font-serif text-stone-800 mt-1 mb-4">
              Reach Out Directly
            </h2>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Whether you’re curious about our botanical preservation process or looking for special gift packaging, we’re always here to assist you.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            {/* Email */}
            <div className="flex items-start gap-4">
              <span className="text-xl">✉️</span>
              <div>
                <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                  Email Us
                </h4>
                <p className="text-xs text-stone-600 font-light">
                  amansoni8387@gmail.com
                </p>
              </div>
            </div>

            {/* Studio Hours */}
            <div className="flex items-start gap-4">
              <span className="text-xl">🌿</span>
              <div>
                <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                  Studio Hours
                </h4>
                <p className="text-xs text-stone-600 font-light">
                  Monday – Friday: 9am – 5pm GMT <br />
                  Weekends: Closed for foraging & crafting
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-start gap-4">
              <span className="text-xl">✨</span>
              <div>
                <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
                  Follow Our Journey
                </h4>
                <p className="text-xs text-stone-600 font-light">
                  @am.soni_83 on Instagram
                </p>
              </div>
            </div>
          </div>

          {/* Quick FAQ Card */}
          <div className="p-6 bg-[#EBE7DF]/60 border border-stone-200/80 rounded-sm space-y-2">
            <h4 className="text-[11px] font-semibold tracking-widest uppercase text-stone-800">
              Custom Order Note
            </h4>
            <p className="text-[11px] text-stone-600 font-light leading-relaxed">
              For custom wedding floral preservation or personalized pet memorial pieces, please allow 2–3 weeks for processing.
            </p>
          </div>
        </div>

        {/* Right Form Column (7 cols) */}
        <div className="md:col-span-7 bg-white p-8 md:p-12 border border-stone-200/80 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <span className="text-4xl">🌸</span>
              <h3 className="text-2xl font-serif text-stone-800">
                Thank You for Your Message!
              </h3>
              <p className="text-xs text-stone-600 font-light max-w-md mx-auto leading-relaxed">
                We’ve received your note and will get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 inline-block bg-[#868C79] hover:bg-[#747969] text-white text-[10px] font-semibold tracking-widest uppercase px-6 py-3 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-stone-200 pb-2 mb-6">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-stone-800 uppercase">
                  Send a Message
                </h3>
              </div>

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-stone-700 uppercase">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400 placeholder:text-stone-400"
                />
              </div>

              {/* Email Input */}
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
                  placeholder="e.g. eleanor@example.com"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400 placeholder:text-stone-400"
                />
              </div>

              {/* Subject Dropdown */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-stone-700 uppercase">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400 cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Custom Order Request">Custom Order Request</option>
                  <option value="Wholesale / Stockist">Wholesale / Stockist</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold tracking-wider text-stone-700 uppercase">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-stone-400 placeholder:text-stone-400 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#868C79] hover:bg-[#747969] text-white text-[11px] font-semibold tracking-widest uppercase py-4 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}