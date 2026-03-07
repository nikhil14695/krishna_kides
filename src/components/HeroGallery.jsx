import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../data/herosectionimg";
import logo from "../assets/kids_logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const columnsRef = useRef([]);
  const [colCount, setColCount] = useState(5);

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

  useEffect(() => {
    columnsRef.current = columnsRef.current.slice(0, colCount);
  }, [colCount]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      columnsRef.current.forEach((col, i) => {
        if (!col) return;

        gsap.killTweensOf(col);

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

    const ctx = gsap.context(() => {
      gsap.set(gridRef.current, {
        rotateX: 18,
        scaleX: 1.2,
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
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-40 w-full bg-gradient-to-b from-[#0a0903] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-48 w-full bg-gradient-to-t from-[#0a0903] to-transparent" />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/30 to-black/45" />

      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        <img
          src={logo}
          alt="Krishna Kids Studio"
          className="w-[240px] md:w-[420px] drop-shadow-[0_0_36px_rgba(0,0,0,0.78)]"
        />
      </div>

      <div
        ref={gridRef}
        className="hero-grid absolute inset-0 grid gap-3"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
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
