import { useEffect, useState } from "react";

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToBooking = () => {
    const section = document.getElementById("booking");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const packages = [
    {
      name: "Standard Session",
      duration: "5 Hours",
      price: "$100",
      description: "Perfect for a relaxed, unhurried encounter",
      features: [
        "5 hours of private companionship",
        "Dinner or drinks included",
        "Intimate conversation",
        "Full GFE experience",
        "Shower together",
        "Mutual pleasure guaranteed"
      ],
      popular: false,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      name: "Premium Session",
      duration: "10 Hours",
      price: "$250",
      description: "Extended time for a deeper connection",
      features: [
        "10 hours of exclusive time",
        "Fine dining experience",
        "Extended intimacy",
        "Overnight stay option",
        "Breakfast together",
        "Spa or massage add-on available",
        "Priority booking"
      ],
      popular: true,
      gradient: "from-purple-600 to-pink-600",
      savings: "Best Value"
    },
    {
      name: "Overnight",
      duration: "12+ Hours",
      price: "$500",
      description: "The ultimate luxury experience",
      features: [
        "Evening until next morning",
        "Multi-course dinner",
        "Full night of intimacy",
        "Breakfast in bed",
        "Morning cuddles & conversation",
        "Late checkout available",
        "VIP treatment throughout"
      ],
      popular: false,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Investment</span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-2">
            Exclusive <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Pricing</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect duration for our time together. Each package is crafted for your ultimate pleasure and satisfaction.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Pricing Cards */}
        <div className={`grid lg:grid-cols-3 gap-8 items-stretch transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative group ${
                pkg.popular ? 'lg:-mt-4 lg:mb-[-1rem]' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${
                  pkg.popular ? 'border-2 border-purple-400' : 'border border-gray-200'
                }`}
              >
                {/* Card Header with Gradient */}
                <div className={`bg-gradient-to-r ${pkg.gradient} p-8 text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-purple-100 mb-4">{pkg.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{pkg.price}</span>
                    <span className="text-purple-200">/ {pkg.duration}</span>
                  </div>
                  {pkg.savings && (
                    <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
                      {pkg.savings}
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="p-8">
                  <ul className="space-y-4">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={scrollToBooking}
                    className={`mt-8 w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-600/30'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Book This Package
                  </button>

                  {/* Note */}
                  <p className="text-xs text-center text-gray-500 mt-4">
                    * All bookings are discreet and confidential
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods - Updated */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 px-6 py-3 rounded-full border border-purple-200 mb-8">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">
              Longer bookings available upon request • <span className="font-semibold text-purple-600">24/7 availability</span>
            </span>
          </div>

          {/* Payment Methods - Updated to Gift Card & Crypto only */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Accepted Payment Methods</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Gift Cards */}
              <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-purple-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Gift Cards</p>
                  <p className="text-sm text-gray-500">Any major brand</p>
                </div>
              </div>

              {/* Crypto - BNB Smart Chain */}
              <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-purple-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.5 0-5 1.5-5 4s2.5 4 5 4 5-1.5 5-4-2.5-4-5-4zm0 6c-2.2 0-4-1.3-4-3s1.8-3 4-3 4 1.3 4 3-1.8 3-4 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Cryptocurrency</p>
                  <p className="text-sm text-gray-500">BNB Smart Chain (BEP-20)</p>
                </div>
              </div>
            </div>

            {/* Note about payment details */}
            <p className="text-sm text-gray-500 mt-6 border-t border-purple-200 pt-4">
              Payment instructions and wallet address will be provided after booking confirmation.
              All transactions are secure and anonymous.
            </p>
          </div>
        </div>

        {/* Discreet Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-2xl mx-auto border-t border-gray-200 pt-8">
            All interactions are strictly confidential. Your privacy and discretion are my priority.
            References may be requested for first-time bookings.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;