import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../data/herosectionimg";
import logo from "../assets/kids_logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

  /* ---------------- REFS ---------------- */
  const gridRef = useRef(null);
  const sectionRef = useRef(null);
  const columnsRef = useRef([]);
  const columnsDataRef = useRef([]);

  /* ---------------- STATE ---------------- */
  const [colCount, setColCount] = useState(5);
  const [imagesReady, setImagesReady] = useState(false);

  /* ---------------- RESPONSIVE COLUMNS ---------------- */
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

  /* ---------------- FREEZE IMAGE DATA ---------------- */
  useEffect(() => {
    columnsDataRef.current = Array.from({ length: colCount }, (_, colIndex) =>
      Array.from({ length: 5 }, (_, imgIndex) =>
        images[(colIndex * 5 + imgIndex) % images.length]
      )
    );
  }, [colCount]);

  /* ---------------- WAIT FOR IMAGE LOAD ---------------- */
  useEffect(() => {
    const imgs = gridRef.current?.querySelectorAll("img");
    if (!imgs || imgs.length === 0) return;

    let loaded = 0;

    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.onload = () => {
          loaded++;
          if (loaded === imgs.length) setImagesReady(true);
        };
      }
    });

    if (loaded === imgs.length) setImagesReady(true);

  }, [colCount]);

  /* ---------------- INFINITE COLUMN SCROLL ---------------- */
  useEffect(() => {

    if (!imagesReady) return;

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
            duration: 70 + (i * 10),
            ease: "none",
            repeat: -1
          }
        );
      });

    }, gridRef);

    return () => ctx.revert();

  }, [imagesReady, colCount]);

  /* ---------------- CINEMATIC SCROLL EFFECT ---------------- */
  useEffect(() => {

    if (!sectionRef.current || !gridRef.current) return;

    gsap.set(gridRef.current, {
      rotateX: 18,
      scaleX: 1.2,
      scaleY: 1.18,
      transformPerspective: 1200
    });

    gsap.to(gridRef.current, {
      rotateX: 0,
      scaleX: 1,
      scaleY: 1,
      y: -250,
      opacity: 0.3,
      filter: "blur(6px)",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, []);

  /* IMPORTANT: clear dead refs */
  columnsRef.current = [];

  /* ---------------- UI ---------------- */
  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ perspective: "1200px" }}
    >

      {/* Top fade */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-40 z-20"
        style={{ background: "linear-gradient(to bottom, #0a0903 10%, transparent 100%)" }}
      />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-48 z-20"
        style={{ background: "linear-gradient(to top, #0a0903 10%, transparent 100%)" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-10" />

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
        <img
          src={logo}
          alt="Krishna Kids Studio"
          className="hero-logo w-[260px] md:w-[460px] drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* Gallery Grid */}
      <div
        ref={gridRef}
        className="hero-grid absolute inset-0 grid gap-3 p-3"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {columnsDataRef.current.map((imgs, colIndex) => (
          <div key={colIndex} className="overflow-hidden rounded-xl">
            <div
              ref={(el) => (columnsRef.current[colIndex] = el)}
              className="flex flex-col gap-3"
            >
              {[...imgs, ...imgs.slice(0,2)].map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
                  alt="gallery"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="w-full aspect-[3/4] object-cover rounded-xl"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}