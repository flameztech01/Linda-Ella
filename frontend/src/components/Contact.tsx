import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      // Using Formspree as in your original code
      const response = await fetch("https://formspree.io/f/xdalrkbd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Your message has been sent successfully! Linda will respond within 24 hours."
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "There was an error sending your message. Please try again or contact directly via email."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick contact options
  const contactOptions = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "linda.ella@private.com",
      action: "mailto:linda.ella@private.com"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      label: "Telegram",
      value: "@LindaElla_Private",
      action: "https://t.me/LindaElla_Private"
    }
  ];

  // FAQ items
  const faqs = [
    {
      question: "How quickly do you respond?",
      answer: "I typically respond within 24 hours. For urgent inquiries, please mention 'URGENT' in your message subject."
    },
    {
      question: "Is my information kept private?",
      answer: "Absolutely. All communications are strictly confidential and never shared with third parties."
    },
    {
      question: "Do you offer video calls for screening?",
      answer: "Yes, initial video calls can be arranged for verification purposes upon request."
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-purple-50/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-2">
            Contact <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Linda Ella</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to arrange our time together? Reach out through any of the channels below.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactOptions.map((option, index) => (
            <a
              key={index}
              href={option.action}
              target={option.action.startsWith('http') ? '_blank' : undefined}
              rel={option.action.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                <div className="text-purple-600 group-hover:text-white transition-all duration-300">
                  {option.icon}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">{option.label}</p>
              <p className="font-semibold text-gray-900">{option.value}</p>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-3xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white flex items-center justify-center text-sm">✉</span>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name <span className="text-pink-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address <span className="text-pink-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                  >
                    <option value="">Select a subject</option>
                    <option value="Booking Inquiry">Booking Inquiry</option>
                    <option value="Availability Question">Availability Question</option>
                    <option value="Special Request">Special Request</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message <span className="text-pink-600">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    placeholder="Type your message here... (Please include preferred date and time if applicable)"
                    className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition resize-none"
                  ></textarea>
                </div>

                {/* Status Messages */}
                {formStatus.type && (
                  <div className={`rounded-xl border px-4 py-3 text-sm ${
                    formStatus.type === "success" 
                      ? "border-green-200 bg-green-50 text-green-700" 
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-600/30 transform hover:scale-105"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p className="text-xs text-center text-gray-500">
                  Your information is encrypted and confidential. I respect your privacy.
                </p>
              </form>
            </div>
          </div>

          {/* Right Side - FAQ & Additional Info */}
          <div className="space-y-6">
            {/* FAQ Section */}
            <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-3xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white flex items-center justify-center text-sm">?</span>
                Quick Answers
              </h3>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-purple-100 last:border-0 pb-4 last:pb-0">
                    <p className="font-semibold text-gray-900 mb-2">{faq.question}</p>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-xl p-8 text-white">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Response Time</h4>
              <p className="text-purple-100 mb-4">
                I typically respond within 24 hours. For faster responses, please include "URGENT" in your subject line.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 availability for booking inquiries</span>
              </div>
            </div>

            {/* Discretion Note */}
            <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-3xl shadow-xl p-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">100% Discreet</h4>
                  <p className="text-sm text-gray-600">
                    All communications are strictly confidential. Your privacy is my priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;