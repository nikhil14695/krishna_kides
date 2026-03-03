import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "../data/herosectionimg";
import logo from "../assets/kids_logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const columnsRef = useRef([]);
    const [colCount, setColCount] = useState(7);

    // 📱 Responsive column count
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

    // Create columns dynamically
    // const columns = Array.from({ length: colCount }, () =>
    //     Array.from({ length: 4 }, () =>
    //         images[Math.floor(Math.random() * images.length)]
    //     )
    // );

    // const columns = Array.from({ length: colCount }, (_, colIndex) =>
    //   Array.from({ length: 4 }, (_, imgIndex) =>
    //     `https://picsum.photos/600/800?random=${colIndex * 10 + imgIndex}`
    //   )
    // );


    // 🎞 Auto-scroll animation
    useEffect(() => {
        columnsRef.current.forEach((col, i) => {
            if (!col) return;

            const height = col.scrollHeight / 2;
            const isEven = i % 2 === 0;

            gsap.to(col, {
                y: -height,
                duration: isEven ? 50 : 20,
                repeat: -1,
                ease: "none",
            });
        });
    }, [colCount]); // re-run when column count changes
    const gridRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!gridRef.current) return;

        gsap.fromTo(
            gridRef.current,
            {
                rotateX: 18.9884,
                scaleX: 1.2,
                scaleY: 1.1804,
                filter: "blur(0px)",
                opacity: 1,
                transformPerspective: 1200,
            },
            {
                rotateX: 0,
                scaleX: 1,
                scaleY: 1,
                filter: "blur(20px)",
                opacity: 0.2,
                ease: "none",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
    }, []);
    useEffect(() => {
        if (!gridRef.current || !sectionRef.current) return;

        // Initial cinematic state
        gsap.set(gridRef.current, {
            rotateX: 18,
            scaleX: 1.2,
            scaleY: 1.18,
            y: 0,
        });

        // Scroll out animation (flatten + slide up + fade + blur)
        gsap.to(gridRef.current, {
            rotateX: 0,
            scaleX: 1,
            scaleY: 1,
            y: -250,                // 👈 SLIDE UP
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

    const columnsDataRef = useRef([]);

    useEffect(() => {
    columnsDataRef.current = Array.from({ length: colCount }, (_, colIndex) =>
        Array.from({ length: 5 }, (_, imgIndex) =>
        images[(colIndex * 5 + imgIndex) % images.length]
        )
    );
    }, [colCount]);
    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-black"
            style={{ perspective: "1200px" }}
        >

            {/* TOP FADE */}
            <div
                className="pointer-events-none absolute top-0 left-0 w-full h-40 z-20"
                style={{
                    background: "linear-gradient(to bottom, #0a0903 10%, transparent 100%)"
                }}
            />

            {/* BOTTOM FADE */}
            <div
                className="pointer-events-none absolute bottom-0 left-0 w-full h-48 z-20"
                style={{
                    background: "linear-gradient(to top, #0a0903 10%, transparent 100%)"
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Center Text */}
            {/* LOGO CENTER */}
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                <img
                    src={logo}
                    alt="Krishna Kids Studio"
                    className="w-[260px] md:w-[460px] drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
                />
            </div>


            {/* Columns */}
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
                            {[...imgs, ...imgs.slice(0, 3)].map((src, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={src}
                                    alt="gallery"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                    decoding="async"
                                    fetchPriority="low"

                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src =
                                            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='220'><rect fill='%230a0903' width='100%' height='100%'/><text x='50%' y='50%' fill='%23ffffff' font-size='20' dominant-baseline='middle' text-anchor='middle'>Image unavailable</text></svg>";
                                    }}
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
