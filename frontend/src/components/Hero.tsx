import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Badge with her name */}
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-semibold uppercase tracking-wider border border-purple-500/30">
                ✦ Exclusive Private Bookings
              </span>
            </div>

            {/* Main Heading with her name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Linda Ella
              </span>
              <br />
              Premium Experience
            </h1>

            {/* Personal Description */}
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience an unforgettable encounter with Linda Ella. Discreet, 
              sophisticated, and tailored entirely to your desires. Every moment 
              is crafted for your ultimate pleasure and satisfaction.
            </p>

            {/* Personal Features */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              {['Discreet', 'Sophisticated', 'Exclusive', 'Memorable'].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection("booking")}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30"
              >
                Book Linda Ella
              </button>

              <button
                onClick={() => scrollToSection("gallery")}
                className="px-8 py-4 bg-transparent text-white rounded-full font-semibold text-lg border-2 border-purple-500/50 hover:border-purple-400 hover:bg-purple-600/10 transition-all duration-300"
              >
                View Gallery
              </button>
            </div>

            {/* Trust Indicators - Personal Stats */}
            <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-gray-900 flex items-center justify-center text-xs text-white font-bold">
                    {i === 0 ? '★' : ''}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-semibold">200+</span> satisfied gentlemen
              </p>
            </div>
          </div>

          {/* Right Side - Linda's Photo */}
          <div className={`relative transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
              
              {/* Image Frame with Linda's photo */}
              <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-3xl transform rotate-3 scale-105"></div>
                <img
                  src="/picture.jpeg"
                  alt="Linda Ella - Premium Companion"
                  className="relative rounded-3xl shadow-2xl w-full max-w-md mx-auto object-cover aspect-[4/5] border-4 border-white/10"
                />
                
                {/* Personal Badge */}
                <div className="absolute -bottom-6 -left-6 bg-gray-900/90 backdrop-blur-sm px-6 py-4 rounded-2xl border border-purple-500/30 shadow-xl">
                  <p className="text-white font-semibold">Linda Ella</p>
                  <p className="text-purple-400 text-sm">Independent Elite</p>
                </div>

                {/* Availability Badge */}
                <div className="absolute -top-6 -right-6 bg-purple-600 px-6 py-3 rounded-2xl shadow-xl">
                  <p className="text-white font-semibold">Available Now</p>
                  <p className="text-purple-200 text-sm">Select dates</p>
                </div>
              </div>
            </div>

            {/* Personal Qualities Strip */}
            <div className="mt-8 flex items-center justify-center gap-8">
              {['24 years', '5\'7"', 'Curvy', 'Luxury'].map((item) => (
                <div key={item} className="text-center">
                  <div className="text-purple-400 text-sm font-semibold uppercase tracking-wider">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => scrollToSection("about")}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <span className="text-sm uppercase tracking-wider">Meet Linda</span>
          <div className="w-5 h-9 border-2 border-gray-400 rounded-full flex justify-center group-hover:border-white transition-colors">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-scroll group-hover:bg-white transition-colors"></div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;