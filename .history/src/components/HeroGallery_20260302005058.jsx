import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../data/herosectionimg";
import logo from "../assets/kids_logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const columnsRef = useRef([]);
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  const [colCount, setColCount] = useState(5);
  const [ready, setReady] = useState(false);

  const columnsData = useMemo(
    () =>
      Array.from({ length: colCount }, (_, colIndex) =>
        Array.from(
          { length: 4 },
          (_, imgIndex) => images[(colIndex * 4 + imgIndex) % images.length]
        )
      ),
    [colCount]
  );

  /* ---------------- Responsive Columns ---------------- */
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;

      if (w < 640) setColCount(2);       // mobile
      else if (w < 768) setColCount(3);  // small tablets
      else if (w < 1024) setColCount(4); // tablets
      else setColCount(5);               // desktop
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  /* -------- Rebuild animation data when columns change -------- */
  useEffect(() => {
    setReady(false);
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [colCount]);

  /* ---------------- Infinite Scroll Animation ---------------- */
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      columnsRef.current.forEach((col, i) => {
        if (!col) return;

        gsap.killTweensOf(col);
        gsap.set(col, { willChange: "transform", force3D: true });
        gsap.ticker.lagSmoothing(1000, 16);
        gsap.ticker.fps(30);    
        const firstCard = col.children[0];
        const rowGap = parseFloat(getComputedStyle(col).rowGap || "0");
        const cardHeight = firstCard ? firstCard.offsetHeight : 220;
        const height = (col.children.length / 2) * (cardHeight + rowGap);
        const isEvenColumn = i % 2 === 0;
        const duration = isEvenColumn
          ? 10 + Math.floor(i / 2) * 6
          : 42 + Math.floor(i / 2) * 6;

        gsap.fromTo(
          col,
          { y: 0 },
          {
            y: -height,
            duration,
            ease: "none",
            repeat: -1,
            overwrite: "auto",
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, [ready, colCount]);

  /* ---------------- Cinematic Scroll Effect ---------------- */
  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(max-width: 767px)": () => {
          gsap.set(gridRef.current, {
            rotateX: 0,
            scale: 1.02,
            transformPerspective: 1200,
          });

          gsap.to(gridRef.current, {
            y: -120,
            opacity: 0.7,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "bottom bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        },
        "(min-width: 768px)": () => {
          gsap.set(gridRef.current, {
            rotateX: 18,
            scale: 1.15,
            transformPerspective: 1200,
          });

          gsap.to(gridRef.current, {
            rotateX: 0,
            scale: 1,
            y: -250,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "bottom bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* clear removed refs */
  columnsRef.current = [];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ perspective: "1200px" }}
    >

      {/* top gradient fade */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-40 z-20 bg-gradient-to-b from-[#0a0903] to-transparent"/>

      {/* bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-48 z-20 bg-gradient-to-t from-[#0a0903] to-transparent"/>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* center logo */}
      <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
        <img
          src={logo}
          alt="Krishna Kids Studio"
          className="w-[260px] md:w-[460px] drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* gallery grid */}
      <div
        ref={gridRef}
        className="hero-grid absolute inset-0 grid gap-3 p-3"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {columnsData.map((imgs, colIndex) => (
          <div key={colIndex} className="overflow-hidden rounded-xl">
            <div
              ref={(el) => (columnsRef.current[colIndex] = el)}
              className="flex flex-col gap-3"
            >
              {/* duplicate images for seamless loop */}
              {[...imgs, ...imgs].map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
                  alt="gallery"
                  loading={imgIndex < 4 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={imgIndex < 4 ? "high" : "low"}
                  className="w-full h-[220px] object-cover rounded-xl"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
