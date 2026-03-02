import { useState } from "react";

interface NavbarProps {
  onBookNow?: () => void;
}

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleBookNow = () => {
    scrollToSection("booking");
    if (onBookNow) onBookNow();
  };

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "pricing", label: "Pricing" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 shadow-lg border-b border-purple-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/Brand */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-light tracking-wider text-white hover:text-purple-300 transition-colors duration-300"
          >
            <span className="font-semibold text-purple-400">Linda</span> Ella
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
              >
                {link.label}
              </button>
            ))}

            {/* Book Now Button - Premium styling */}
            <button
              onClick={handleBookNow}
              className="ml-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-sm uppercase tracking-wider hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-600/30"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-purple-800/30">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-purple-400 hover:bg-purple-900/30 rounded-lg transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
              >
                {link.label}
              </button>
            ))}
            
            {/* Mobile Book Now Button */}
            <button
              onClick={handleBookNow}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-sm uppercase tracking-wider hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;