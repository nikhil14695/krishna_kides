// AboutSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".fade-up"),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0903] text-white py-28 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="fade-up text-4xl md:text-6xl font-light mb-8 text-[#7b1e3a]">
          About Krishna Kids Studio
        </h2>

        <p className="fade-up text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
          We capture magical childhood moments with cinematic lighting,
          creative themes and premium photo editing. Every child’s smile
          deserves a timeless memory.
        </p>
      </div>
    </section>
  );
}