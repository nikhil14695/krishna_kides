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
    const animationCols = 5; // always 5 moving column  

  /* responsive */
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;

      if (w < 640) setColCount(2);
      else if (w < 768) setColCount(2);
      else if (w < 1024) setColCount(3);
      else setColCount(4); // 👈 desktop 4 images per row
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  /* create columns */
  const columnsData = Array.from({ length: colCount }, (_, i) =>
    images.filter((_, index) => index % colCount === i)
  );

  /* infinite scroll */
  useEffect(() => {

    columnsRef.current.forEach((col, i) => {
      if (!col) return;

      const totalHeight = col.scrollHeight / 2;

      gsap.to(col, {
        y: -totalHeight,
        duration: i % 2 === 0 ? 80 : 60,
        ease: "none",
        repeat: -1
      });
    });

  }, [colCount]);

  /* cinematic scroll */
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

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* logo */}
      <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
        <img src={logo} className="w-[260px] md:w-[460px]" />
      </div>

      {/* gallery */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid gap-4 p-4"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {columnsData.map((imgs, colIndex) => (
          <div key={colIndex} className="overflow-hidden rounded-xl">
            <div ref={(el) => (columnsRef.current[colIndex] = el)} className="flex flex-col gap-4">
              {[...imgs, ...imgs].map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
                  className="w-full h-[260px] object-cover rounded-xl"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}