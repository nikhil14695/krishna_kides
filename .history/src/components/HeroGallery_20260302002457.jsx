import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../data/herosectionimg";
import logo from "../assets/kids_logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

  const columnsRef = useRef([]);
  const gridRef = useRef(null);
  const sectionRef = useRef(null);
  const columnsDataRef = useRef([]);

  const [colCount, setColCount] = useState(5);
  const [ready, setReady] = useState(false);

  /* ---------------- Responsive Columns ---------------- */
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

  /* ---------------- Freeze images (VERY IMPORTANT) ---------------- */
  useEffect(() => {
    columnsDataRef.current = Array.from({ length: colCount }, (_, colIndex) =>
      Array.from({ length: 6 }, (_, imgIndex) =>
        images[(colIndex * 6 + imgIndex) % images.length]
      )
    );

    // allow render first
    setTimeout(() => setReady(true), 200);
  }, [colCount]);

  /* ---------------- Infinite Scroll Animation ---------------- */
  useEffect(() => {

    if (!ready) return;

    const ctx = gsap.context(() => {

      columnsRef.current.forEach((col, i) => {
        if (!col) return;

        gsap.killTweensOf(col);

        const height = col.scrollHeight / 2;

        gsap.fromTo(
          col,
          { y: 0 },
          {
            y: -height,
            duration: 70 + (i * 12),
            ease: "none",
            repeat: -1,
          }
        );
      });

    }, gridRef);

    return () => ctx.revert();

  }, [ready, colCount]);

  /* ---------------- Cinematic Scroll ---------------- */
  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    gsap.set(gridRef.current, {
      rotateX: 18,
      scale: 1.15,
      transformPerspective: 1200,
    });

    gsap.to(gridRef.current, {
      rotateX: 0,
      scale: 1,
      y: -250,
      opacity: 0.35,
      filter: "blur(6px)",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });

  }, []);

  /* Clear dead refs */
  columnsRef.current = [];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ perspective: "1200px" }}
    >

      {/* top fade */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-40 z-20 bg-gradient-to-b from-[#0a0903] to-transparent"/>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-48 z-20 bg-gradient-to-t from-[#0a0903] to-transparent"/>

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* center logo */}
      <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
        <img
          src={logo}
          alt="Krishna Kids Studio"
          className="w-[260px] md:w-[460px] drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* gallery */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid gap-3 p-3 hero-grid"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {columnsDataRef.current.map((imgs, colIndex) => (
          <div key={colIndex} className="overflow-hidden rounded-xl">
            <div
              ref={(el) => (columnsRef.current[colIndex] = el)}
              className="flex flex-col gap-3"
            >
              {[...imgs, ...imgs.slice(0,3)].map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
                  alt="gallery"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="w-full h-[220p] object-cover rounded-xl"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}