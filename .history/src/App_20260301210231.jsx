import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const studioRef = useRef(null);

  useEffect(() => {
    // 1. Hero Section Animation (Fades in on load)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.3, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-img",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );
    }, heroRef);

    // 2. Gallery Section Animation (Triggers on scroll)
    gsap.fromTo(
      ".gallery-item",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 75%", // Starts animation when the top of the gallery hits 75% down the viewport
          toggleActions: "play none none reverse",
        },
      }
    );

    // 3. Studio Section Animation
    gsap.fromTo(
      ".studio-content",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: studioRef.current,
          start: "top 80%",
        },
      }
    );

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-zinc-950 text-zinc-50 font-sans min-h-screen selection:bg-amber-700 selection:text-white">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-zinc-950/80 backdrop-blur-md">
        <h1 className="text-xl tracking-[0.2em] font-light uppercase">Krishna Kids</h1>
        <ul className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-zinc-400">
          <li className="hover:text-amber-500 cursor-pointer transition-colors">Portfolio</li>
          <li className="hover:text-amber-500 cursor-pointer transition-colors">Studio</li>
          <li className="hover:text-amber-500 cursor-pointer transition-colors">Contact</li>
        </ul>
      </nav>

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0 hero-img">
          {/* Replace with a high-res, moody/luxury kid portrait */}
          <img 
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Kids Photography" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 to-zinc-950"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h2 className="hero-text text-5xl md:text-8xl font-serif font-light mb-4">Timeless Innocence</h2>
          <p className="hero-text text-lg md:text-xl tracking-widest uppercase text-amber-500/80 mb-8">
            Graphics & Fine Art Studio
          </p>
          <button className="hero-text border border-amber-500/50 px-8 py-3 tracking-widest uppercase text-sm hover:bg-amber-500/10 transition-colors">
            View Gallery
          </button>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section ref={galleryRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-serif font-light mb-2">Featured Work</h3>
          <div className="w-12 h-[1px] bg-amber-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gallery Items */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="gallery-item group relative aspect-[4/5] overflow-hidden bg-zinc-900">
              <img 
                src={`https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop&sig=${item}`} 
                alt={`Portfolio ${item}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-sm tracking-widest uppercase border-b border-amber-500 pb-1">View Project</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- STUDIO EXPERIENCE SECTION --- */}
      <section ref={studioRef} className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 h-[600px] studio-content">
             <img 
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop" 
                alt="Studio Environment"
                className="w-full h-full object-cover rounded-sm"
              />
          </div>
          <div className="w-full md:w-1/2 studio-content">
            <h3 className="text-4xl font-serif font-light mb-6">The Studio Experience</h3>
            <p className="text-zinc-400 leading-relaxed mb-8 font-light">
              We create a calm, luxurious environment where children feel completely at ease. Our studio is equipped with top-tier lighting and bespoke props, ensuring every graphic and photograph captures the pure, unscripted magic of childhood.
            </p>
            <button className="border-b border-amber-500 pb-1 tracking-widest uppercase text-sm hover:text-amber-500 transition-colors">
              Book a Session
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center border-t border-zinc-900">
        <h2 className="text-2xl tracking-[0.2em] font-light uppercase mb-6">Krishna Kids</h2>
        <p className="text-zinc-500 text-sm tracking-widest">© 2026 KRISHNA KIDS STUDIO. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}