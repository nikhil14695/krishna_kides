import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../data/herosectionimg";
import logo from "../assets/kids_logo.png";
viteImagemin({
      mozjpeg: { quality: 70 },
      optipng: { optimizationLevel: 5 },

      // ⭐ THIS creates WEBP automatically
      webp: {
        quality: 70
      }
    }),

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

  const columnsRef = useRef([]);
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  const [colCount, setColCount] = useState(5);
  const [loaded, setLoaded] = useState(false);

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

  /* ---------------- Do not block render ---------------- */
  useEffect(() => {
    setLoaded(true);
  }, []);

  /* ---------------- Freeze column images ---------------- */
  const columnsData = useRef([]);

  useEffect(() => {
    columnsData.current = Array.from({ length: colCount }, (_, i) =>
      Array.from({ length: 5 }, (_, j) =>
        images[(i * 5 + j) % images.length]
      )
    );
  }, [colCount]);

  /* ---------------- Infinite Scroll Animation ---------------- */
  useEffect(() => {

    if (!loaded) return;

    const ctx = gsap.context(() => {

      columnsRef.current.forEach((col, i) => {
        if (!col) return;

        const totalHeight = col.offsetHeight / 2;
        const speed = i % 2 === 0 ? 90 : 70;

        gsap.to(col, {
          y: -totalHeight,
          duration: speed,
          ease: "none",
          repeat: -1,
          modifiers: {
            y: gsap.utils.unitize(y => parseFloat(y) % totalHeight)
          }
        });
      });

    });

    return () => ctx.revert();

  }, [loaded, colCount]);

  /* ---------------- Cinematic Scroll Perspective ---------------- */
  useEffect(() => {

    gsap.set(gridRef.current, {
      rotateX: 18,
      scale: 1.18,
      transformPerspective: 1200,
    });

    gsap.to(gridRef.current, {
      rotateX: 0,
      scale: 1,
      y: -250,
      opacity: 0.3,
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

  /* ---------------- Logo Animation ---------------- */
  useEffect(() => {

    gsap.fromTo(".hero-logo",
      { opacity: 0, scale: 0.6, filter: "blur(12px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out", delay: 0.5 }
    );

  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-bg"
      style={{ perspective: "1200px" }}
    >

      {/* top fade */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-40 z-20 bg-gradient-to-b from-bg to-transparent"/>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-48 z-20 bg-gradient-to-t from-bg to-transparent"/>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* center logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{zIndex:9999}}>
        <img
          src={logo}
          alt="Krishna Kids Studio"
          className="hero-logo w-[240px] md:w-[460px] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* gallery grid */}
      <div
        ref={gridRef}
        className="hero-grid absolute inset-0 grid gap-3 "
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0,1fr))` }}
      >
        {columnsData.current.map((imgs, colIndex) => (
          <div key={colIndex} className="overflow-hidden rounded-xl">
            <div
              ref={(el) => (columnsRef.current[colIndex] = el)}
              className="flex flex-col gap-3"
            >
              {[...imgs, ...imgs].map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
                  alt="gallery"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
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