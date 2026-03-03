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

  const [colCount, setColCount] = useState(5);
  const [ready, setReady] = useState(false);

  /* wait until images exist */
  useEffect(() => {
    if (images && images.length > 0) {
      setReady(true);
    }
  }, []);

  /* responsive columns */
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

  /* create columns AFTER images ready */
  const columnsData = useRef([]);

  useEffect(() => {
    if (!ready) return;

    columnsData.current = Array.from({ length: colCount }, (_, i) =>
      Array.from({ length: 6 }, (_, j) =>
        images[(i * 6 + j) % images.length]
      )
    );
  }, [colCount, ready]);

  /* infinite animation */
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {

      columnsRef.current.forEach((col, i) => {
        if (!col) return;

        const totalHeight = col.scrollHeight / 2;
        const speed = i % 2 === 0 ? 90 : 70;

        gsap.to(col, {
          y: -totalHeight,
          duration: speed,
          ease: "none",
          repeat: -1
        });
      });

    });

    return () => ctx.revert();

  }, [ready, colCount]);

  /* cinematic scroll */
  useEffect(() => {
    if (!ready) return;

    gsap.set(gridRef.current, {
      rotateX: 18,
      scale: 1.18,
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

  }, [ready]);

  /* logo animation */
  useEffect(() => {
    gsap.fromTo(".hero-logo",
      { opacity: 0, scale: 0.6, filter: "blur(12px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" }
    );
  }, []);

  /* prevent black screen */
  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading Studio...
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* logo */}
      <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
        <img src={logo} className="hero-logo w-[260px] md:w-[460px]" />
      </div>

      {/* gallery */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid gap-3 p-3"
        style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
      >
        {columnsData.current.map((imgs, colIndex) => (
          <div key={colIndex} className="overflow-hidden rounded-xl">
            <div ref={(el) => (columnsRef.current[colIndex] = el)} className="flex flex-col gap-3">
              {[...imgs, ...imgs].map((src, imgIndex) => (
                <img
                  key={imgIndex}
                  src={src}
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