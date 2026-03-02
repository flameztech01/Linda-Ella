import { useEffect, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Personal details - you can update these
  const personalDetails = {
    age: "24",
    height: "5'7\" (170cm)",
    hair: "Brunette",
    eyes: "Hazel",
    ethnicity: "Caucasian",
    bust: "34C",
    dress: "4 (US)",
    shoe: "7 (US)"
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Discover</span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-2">
            About <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Linda Ella</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Left - Image Gallery */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            
            {/* Main Image */}
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 rounded-3xl transform rotate-2 scale-105"></div>
              <img
                src="/picture.jpeg"
                alt="Linda Ella - Portrait"
                className="relative rounded-3xl shadow-2xl w-full max-w-lg mx-auto object-cover aspect-[4/5] border-4 border-white"
              />
              
              {/* Verified Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-6 py-4 border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Verified Profile</p>
                    <p className="text-sm text-gray-500">ID & Age Verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-6 flex gap-3 justify-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform">
                  <img
                    src={`/linda-thumb-${i}.jpg`}
                    alt={`Linda Ella ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Personal Details */}
          <div className="space-y-8">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed">
                Allow me to introduce myself — I'm <span className="font-semibold text-purple-600">Linda Ella</span>, 
                an elite independent companion dedicated to creating unforgettable 
                experiences for discerning gentlemen.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(personalDetails).map(([key, value]) => (
                <div key={key} className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{key}</p>
                  <p className="font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                With a passion for elegance and genuine connection, I offer more than 
                just companionship — I provide an escape into a world of sophistication 
                and sensual pleasure. My approach is warm, attentive, and completely 
                focused on your desires.
              </p>
              <p>
                Whether you seek stimulating conversation, a glamorous dinner date, 
                or intimate private time, I ensure every moment together is exceptional. 
                Discretion is my promise, and your satisfaction is my priority.
              </p>
            </div>

            {/* Quick Info Tags */}
            <div className="flex flex-wrap gap-2">
              {['Discreet', 'Elegant', 'Well-Educated', 'World Traveler', 'Gourmet', 'Conversationalist'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  {tag}
                </span>
              ))}
            </div>

            {/* Location & Availability */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Location & Availability</h3>
                  <p className="text-gray-700">
                    <span className="font-semibold">Based in:</span> United States (traveling to select cities)<br />
                    <span className="font-semibold">Available:</span> Weekdays & Weekends by appointment<br />
                    <span className="font-semibold">Booking:</span> 24h advance notice preferred
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  const section = document.getElementById("booking");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30 w-full sm:w-auto"
              >
                Book Your Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;