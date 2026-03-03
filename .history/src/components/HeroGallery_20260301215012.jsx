import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../data/herosectionimg";

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
  const columnsData = useRef([]);

useEffect(() => {
  columnsData.current = Array.from({ length: colCount }, () =>
    Array.from({ length: 6 }, () =>
      images[Math.floor(Math.random() * images.length)]
    )
  );
}, [colCount]);
  /* ---------------- Wait for images load ---------------- */
  useEffect(() => {
    const imgs = document.images;
    let count = 0;

    const check = () => {
      count++;
      if (count === imgs.length) setLoaded(true);
    };

    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].complete) check();
      else imgs[i].addEventListener("load", check);
    }
  }, []);

  /* ---------------- Continuous Infinite Scroll ---------------- */
  useEffect(() => {

    if (!loaded) return;

    const ctx = gsap.context(() => {

      columnsRef.current.forEach((col, i) => {
        if (!col) return;

        const totalHeight = col.scrollHeight / 2;
        const speed = i % 2 === 0 ? 40 : 25;

        gsap.to(col, {
          y: `-=${totalHeight}`,
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
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out", delay: 0.8 }
    );

  }, []);

  /* ---------------- Create Columns ---------------- */
  const columns = Array.from({ length: colCount }, () =>
    Array.from({ length: 4 }, () =>
      images[Math.floor(Math.random() * images.length)]
    )
  );

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

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

            {/* center logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 9999 }}>
        <img
            src="/Kids_logo.png"
            alt="Krishna Kids Studio"
            className="hero-logo w-[240px] md:w-[460px] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]"
        />
        </div>

      {/* grid gallery */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid gap-3 p-3"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {columns.map((imgs, colIndex) => (
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