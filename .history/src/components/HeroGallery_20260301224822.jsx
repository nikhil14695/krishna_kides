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

  const [visibleCols, setVisibleCols] = useState(4); // images per row
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const animationCols = 5; // always 5 moving columns

  /* ---------------- Responsive ---------------- */
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;

      if (w < 640) setVisibleCols(2);
      else if (w < 768) setVisibleCols(2);
      else if (w < 1024) setVisibleCols(3);
      else setVisibleCols(4);
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  /* ---------------- Create Columns ---------------- */
  const columnsData = Array.from({ length: animationCols }, (_, i) =>
    images.filter((_, index) => index % animationCols === i)
  );

  /* ---------------- Wait for Images Load ---------------- */
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
          if (loaded === imgs.length) setImagesLoaded(true);
        };
      }
    });

    if (loaded === imgs.length) setImagesLoaded(true);

  }, [visibleCols]);

  /* ---------------- Infinite Vertical Scroll ---------------- */
  useEffect(() => {

    if (!imagesLoaded) return;

    const ctx = gsap.context(() => {

      columnsRef.current.forEach((col, i) => {
        if (!col) return;

        const totalHeight = col.scrollHeight / 2;

        gsap.fromTo(
          col,
          { y: 0 },
          {
            y: -totalHeight,
            duration: i % 2 === 0 ? 90 : 70,
            ease: "none",
            repeat: -1
          }
        );
      });

    }, gridRef);

    return () => ctx.revert();

  }, [imagesLoaded, visibleCols]);

  /* ---------------- Cinematic Scroll Effect ---------------- */
  useEffect(() => {

    gsap.set(gridRef.current, {
      rotateX: 18,
      scale: 1.15,
      transformPerspective: 1200,
    });

    gsap.to(gridRef.current, {
      rotateX: 0,
      scale: 1,
      y: -200,
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

  /* IMPORTANT: reset refs */
  columnsRef.current = [];

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">

      {/* overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-10" />

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
        className="absolute inset-0 grid gap-4 p-4"
        style={{ gridTemplateColumns: `repeat(${visibleCols}, 1fr)` }}
      >
        {columnsData.map((imgs, colIndex) => (
          <div key={colIndex} className="overflow-hidden rounded-xl">
            <div
              ref={(el) => (columnsRef.current[colIndex] = el)}
              className="flex flex-col gap-4"
            >
              {[...imgs, ...imgs].map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
                  alt="studio"
                  className="w-full h-[260px] object-cover rounded-xl"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}