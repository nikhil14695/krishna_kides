import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../data/herosectionimg";
import logo from "../assets/kids_logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  // DOM refs used by GSAP and dynamic column management.
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const columnsRef = useRef([]);
  // Current number of grid columns based on viewport width.
  const [colCount, setColCount] = useState(5);

  // Split images into N columns, each with 4 items, then loop safely with modulo.
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

  useEffect(() => {
    // Map viewport sizes to column counts for responsive layout.
    const updateCols = () => {
      const w = window.innerWidth;
      if (w < 480) setColCount(1);
      else if (w < 640) setColCount(2);
      else if (w < 768) setColCount(3);
      else if (w < 1024) setColCount(4);
      else if (w < 1280) setColCount(5);
      else if (w < 1536) setColCount(6);
      else setColCount(6);
    };

    // Run once on mount, then update on resize.
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  useEffect(() => {
    // Keep refs array in sync when column count decreases.
    columnsRef.current = columnsRef.current.slice(0, colCount);
  }, [colCount]);

  useEffect(() => {
    // Infinite vertical marquee per column with alternating speeds.
    const ctx = gsap.context(() => {
      columnsRef.current.forEach((col, i) => {
        if (!col) return;

        // Clear any previous tween before creating a new one.
        gsap.killTweensOf(col);

        // Compute travel distance using rendered card height + row gap.
        const firstCard = col.children[0];
        const rowGap = parseFloat(getComputedStyle(col).rowGap || "0");
        const cardHeight = firstCard ? firstCard.offsetHeight : 220;
        const height = (col.children.length / 2) * (cardHeight + rowGap);

        gsap.to(col, {
          y: -height,
          duration: i % 2 === 0 ? 50 : 20,
          repeat: -1,
          ease: "none",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [colCount]);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    // 3D-to-flat transform while the user scrolls past the hero.
    const ctx = gsap.context(() => {
      gsap.set(gridRef.current, {
        rotateX: 18,
        scaleX: 1.15,
        scaleY: 1.18,
        y: 0,
        transformPerspective: 1200,
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
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#120d08]"
      style={{ perspective: "1200px" }}
    >
      {/* Top and bottom fade overlays for depth and readability. */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-40 w-full bg-gradient-to-b from-[#0a0903] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-48 w-full bg-gradient-to-t from-[#0a0903] to-transparent" />

      {/* Global dark gradient tint over the gallery. */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/30 to-black/45" />

      {/* Centered brand logo above animated tiles. */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        <img
          src={logo}
          alt="Krishna Kids Studio"
          className="w-[240px] md:w-[420px] brightness-0 invert drop-shadow-[0_0_36px_rgba(0,0,0,0.78)]"
        />
      </div>

      <div
        ref={gridRef}
        className="hero-grid absolute inset-0 grid gap-3"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {/* Each column duplicates its images to create a seamless infinite loop. */}
        {columnsData.map((imgs, colIndex) => (
          <div key={colIndex} className="overflow-hidden rounded-xl">
            <div
              ref={(el) => {
                columnsRef.current[colIndex] = el;
              }}
              className="flex flex-col gap-3"
            >
              {[...imgs, ...imgs].map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
                  alt="gallery"
                  loading={imgIndex < 4 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={imgIndex < 4 ? "high" : "low"}
                  className="h-[220px] w-full rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
