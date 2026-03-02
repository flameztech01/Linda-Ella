import { useState } from "react";

// Mock database of gallery images
// Easy to add or remove pictures by editing this array
const galleryImages = [
  {
    id: 1,
    src: "/picture1.jpeg",
    alt: "Linda Ella - Portrait 1",
    category: "portrait",
    featured: true
  },
  {
    id: 2,
    src: "/picture2.jpeg",
    alt: "Linda Ella - Elegant Style",
    category: "elegant",
    featured: false
  },
  {
    id: 3,
    src: "/picture3.jpeg",
    alt: "Linda Ella - Evening Gown",
    category: "evening",
    featured: false
  },
  {
    id: 4,
    src: "/picture5.jpeg",
    alt: "Linda Ella - Casual Chic",
    category: "casual",
    featured: false
  },
  {
    id: 5,
    src: "/picture6.jpeg",
    alt: "Linda Ella - Lingerie",
    category: "intimate",
    featured: false
  },
  {
    id: 6,
    src: "/picture10.jpeg",
    alt: "Linda Ella - Swimwear",
    category: "beach",
    featured: false
  },
  {
    id: 7,
    src: "/picture8.jpeg",
    alt: "Linda Ella - Professional",
    category: "professional",
    featured: false
  },
  {
    id: 8,
    src: "/picture9.jpeg",
    alt: "Linda Ella - Glamour",
    category: "glamour",
    featured: true
  }
];

// Extract unique categories for filtering
const categories = ["all", ...new Set(galleryImages.map(img => img.category))];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [, setIsLoading] = useState(true);

  // Filter images based on selected category
  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Find current image index for navigation
  const currentIndex = selectedImage !== null 
    ? filteredImages.findIndex(img => img.id === selectedImage) 
    : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1].id);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-white to-purple-50/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Visual Experience</span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mt-2">
            Linda Ella <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Gallery</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            A glimpse into the elegance and beauty that awaits you.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30"
                  : "bg-white text-gray-700 hover:bg-purple-50 border border-purple-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              onClick={() => setSelectedImage(image.id)}
            >
              {/* Image Container */}
              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onLoad={() => setIsLoading(false)}
                />
              </div>

              {/* Overlay with category */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white text-sm font-semibold uppercase tracking-wider">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* Featured Badge */}
              {image.featured && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Featured
                </div>
              )}

              {/* Image Number */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No images in this category</h3>
            <p className="text-gray-600">Please check back later or select another category.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {currentIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image Container */}
            <div 
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages.find(img => img.id === selectedImage)?.src}
                alt={filteredImages.find(img => img.id === selectedImage)?.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="text-lg font-semibold">
                      {filteredImages.find(img => img.id === selectedImage)?.alt}
                    </p>
                    <p className="text-sm text-white/70">
                      Category: {filteredImages.find(img => img.id === selectedImage)?.category}
                    </p>
                  </div>
                  <p className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {filteredImages.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-purple-200 shadow-sm">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">
              <span className="font-semibold text-purple-600">{galleryImages.length}</span> exclusive photos
            </span>
          </div>
        </div>

        {/* Discreet Note */}
        <p className="text-xs text-center text-gray-500 mt-8">
          All images are property of Linda Ella. Please respect privacy and do not share or distribute.
        </p>
      </div>
    </section>
  );
};

export default Gallery;