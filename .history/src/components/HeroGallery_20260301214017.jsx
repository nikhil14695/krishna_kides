import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import img1 from "/studio_photos/1.jpg";
import img2 from "/studio_photos/2.jpg";
import img3 from "/studio_photos/3.jpg";
import img4 from "/studio_photos/4.jpg";
import img5 from "/studio_photos/5.jpg";
import img6 from "/studio_photos/6.jpg";
import img7 from "/studio_photos/7.jpg";
import img8 from "/studio_photos/8.jpg";
import img9 from "/studio_photos/9.jpg";
import img10 from "/studio_photos/10.jpg";
import img11 from "/studio_photos/11.jpg";
import img12 from "/studio_photos/12.jpg";
// import img13 from "/studio_photos/13.jpg";

const images = [
  img1,img2,img3,img4,img5,img6,
  img7,img8,img9,img10,img11,img12
];

export default function HeroGallery() {

  const containerRef = useRef(null);
  const [colCount, setColCount] = useState(5);

  /* -------- Responsive Columns -------- */
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;

      if (w < 640) setColCount(2);
      else if (w < 768) setColCount(3);
      else if (w < 1024) setColCount(4);
      else setColCount(5);
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  /* -------- GSAP Entrance -------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-card", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  useEffect(() => {
    gsap.to(containerRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
        }
    });
    }, []);
  return (
    <section className="relative h-screen overflow-hidden bg-bg">

      {/* Title Center */}
      <div className="absolute z-30 w-full h-full flex flex-col items-center justify-center text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-semibold text-cream drop-shadow-lg">
          Krishna Kids Studio
        </h1>

        <p className="mt-4 text-lg md:text-2xl text-gold">
          Capturing Childhood Forever
        </p>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55 z-20"></div>

      {/* Gallery */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex gap-6 px-6 py-12 rotate-[-8deg] scale-110"
      >
        {[...Array(colCount)].map((_, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-6">

            {images
              .filter((_, i) => i % colCount === colIndex)
              .map((src, i) => (
                <div
                  key={i}
                  className="hero-card relative rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover transition duration-700 hover:scale-110"
                  />
                </div>
              ))}

          </div>
        ))}
      </div>

    </section>
  );
}