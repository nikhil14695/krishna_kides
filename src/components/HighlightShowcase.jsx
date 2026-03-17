import React, { useState, useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';

// Updated Mock data now including videos and temporary links
const preWeddingShowcaseData = [
  {
    id: 1,
    couple: 'Maya & Liam',
    date: 'October 2023',
    location: 'Sunset Bliss at Malibu Beach',
    type: 'video', // Added media type
    // Temporary YouTube embed link
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ', 
    thumbnails: [
      { id: '1a', label: 'Beach Sunset', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=200&auto=format&fit=crop' },
      { id: '1b', label: 'Mountain Hike', image: 'https://images.unsplash.com/photo-1591604466107-dd9b9533d318?q=80&w=200&auto=format&fit=crop' },
      { id: '1c', label: 'City Lights', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=200&auto=format&fit=crop' },
      { id: '1d', label: 'Forest Walk', image: 'https://images.unsplash.com/photo-1475724603429-f19757f28b03?q=80&w=200&auto=format&fit=crop' },
    ],
  },
   {
    id: 2,
    couple: 'Sarah & David',
    date: 'August 2023',
    location: 'Mountain Serenity',
    type: 'image', // Added media type
    // Temporary high-res image link
    mediaUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1600&auto=format&fit=crop', 
    thumbnails: [
      { id: '2a', label: 'Mountain Hike', image: 'https://images.unsplash.com/photo-1591604466107-dd9b9533d318?q=80&w=200&auto=format&fit=crop' },
    ],
  },
    {
    id: 3,
    couple: 'Chloe & James',
    date: 'November 2023',
    location: 'City Lights',
    type: 'video', // Added media type
    // Another temporary YouTube embed link
    mediaUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&mute=1&loop=1&playlist=jNQXAC9IVRw', 
    thumbnails: [
      { id: '3a', label: 'City Lights', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=200&auto=format&fit=crop' },
    ],
  },
    {
    id: 4,
    couple: 'Aisha & Ben',
    date: 'September 2023',
    location: 'Forest Walk',
    type: 'image', // Added media type
    // Temporary high-res image link
    mediaUrl: 'https://images.unsplash.com/photo-1475724603429-f19757f28b03?q=80&w=1600&auto=format&fit=crop', 
    thumbnails: [
      { id: '4a', label: 'Forest Walk', image: 'https://images.unsplash.com/photo-1475724603429-f19757f28b03?q=80&w=200&auto=format&fit=crop' },
    ],
  },
];

const PreWeddingSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const mainMediaRef = useRef(null);
  const captionRef = useRef(null);

  // GSAP animation for slide transitions
  useEffect(() => {
    // Fade in the new media and caption when the currentSlideIndex changes
    gsap.fromTo(
      [mainMediaRef.current, captionRef.current],
      { opacity: 0, y: 10 }, // Start state
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' } // End state
    );
  }, [currentSlideIndex]);

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? preWeddingShowcaseData.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === preWeddingShowcaseData.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = useMemo(() => preWeddingShowcaseData[currentSlideIndex], [currentSlideIndex]);

  return (
    <section className="section  font-serif">
       <div className="creta-container text-gold-200 dvh-container">
          {/* Header Section - Height controlled */}
          <div className="text-center showcase-header">
            <h2 className="responsive-title font-bold uppercase tracking-wider text-gold-300">
              LOVE STORIES: PRE-WEDDING HIGHLIGHTS
            </h2>
            <p className="responsive-subtitle text-gold-100">
              Relive the Magic of Their Journey
            </p>
          </div>

          {/* Main Slider Area - Flex grow to fill remaining space */}
          <div className="relative group slider-main-area mx-auto rounded-3xl border-2 border-gold-400 p-4 md:p-8 shadow-2xl bg-gray-900 overflow-hidden">
            
            {/* Previous Button - Scaled down */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full border border-gold-400 text-gold-200 text-xs hover:bg-gold-500 hover:text-black transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
            >
              &lt;
            </button>

            {/* Main Media Container (Image or Video) */}
            <div ref={mainMediaRef} className="media-display-container w-full h-full rounded-2xl overflow-hidden relative shadow-lg">
              
              {/* Conditional Rendering for Media Type */}
              {currentSlide.type === 'video' ? (
                <iframe
                    src={currentSlide.mediaUrl}
                    title={`${currentSlide.couple} Pre-Wedding Video`}
                    className="w-full h-full object-cover"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
              ) : (
                <img
                    src={currentSlide.mediaUrl}
                    alt={`${currentSlide.couple} Pre-Wedding`}
                    className="w-full h-full object-contain" // Contain ensures full img visibility
                />
              )}

              {/* Couple Caption - Scaled and moved */}
              <div
                ref={captionRef}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-xs md:text-sm border border-gold-400 whitespace-nowrap"
              >
                {`${currentSlide.couple} | ${currentSlide.date}`}
              </div>
            </div>

            {/* Next Button - Scaled down */}
            <button
              onClick={goToNextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full border border-gold-400 text-gold-200 text-xs hover:bg-gold-500 hover:text-black transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
            >
              &gt;
            </button>
          </div>

          {/* Thumbnail & Status Area - height controlled */}
          <div className="thumbnail-status-area mt-4">
            {/* Thumbnail Navigation - scaled gap */}
            <div className="flex justify-center gap-2 md:gap-4">
              {currentSlide.thumbnails.map((thumb) => (
                <div key={thumb.id} className="text-center w-1/4 max-w-[120px]">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden border-2 border-gold-400 hover:border-gold-200 transition-colors shadow-md">
                    <img src={thumb.image} alt={thumb.label} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] md:text-xs text-gold-100 mt-1">{thumb.label}</p>
                </div>
              ))}
            </div>

            {/* Slider Pagination Status - scaled */}
            <div className="text-center text-gold-300 mt-4 text-xs md:text-sm">
              Slider {currentSlideIndex + 1} / {preWeddingShowcaseData.length}
            </div>
          </div>
       </div>
    </section>
  );
};

export default PreWeddingSlider;