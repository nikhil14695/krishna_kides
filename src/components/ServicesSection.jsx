import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobalParticles from "./GlobalParticles";
import img1 from "../assets/studio_photos/10.webp";
import img2 from "../assets/studio_photos/7.webp";
import img3 from "../assets/studio_photos/2.webp";
import img4 from "../assets/studio_photos/6.webp";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "Newborn Photography", image: img1, tag: "01" },
  { title: "Birthday Shoots", image: img2, tag: "02" },
  { title: "Theme Studio Shoots", image: img3, tag: "03" },
  { title: "Family Portraits", image: img4, tag: "04" },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      gsap.fromTo(
        cards,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-24 text-white"
    >

      {/* GOLD AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0
      bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,106,0.25),transparent_45%),
      radial-gradient(circle_at_80%_70%,rgba(123,30,58,0.22),transparent_50%)]" />

      <GlobalParticles
        className="absolute inset-0"
        count={42}
        minSize={2}
        maxSize={4.5}
        minOpacity={0.16}
        maxOpacity={0.48}
        durationMin={2.2}
        durationMax={5.3}
        drift={18}
        color="#d4af6a"
        glow="0 0 11px rgba(212,175,106,0.66)"
      />

      <div className="creta-container relative">

        <h2 className="mx-auto mb-16 max-w-5xl text-center text-4xl leading-[1.1] text-[#efe7d6] md:text-[68px]">
          Services Designed for Timeless Childhood Memories
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {services.map((service, i) => (
            <article
              key={service.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative min-h-[380px] overflow-hidden rounded-[22px]
              border border-[#d4af6a]/40
              bg-[linear-gradient(180deg,rgba(26,20,15,0.85),rgba(10,8,6,0.95))]
              backdrop-blur
              shadow-[0_0_30px_rgba(212,175,106,0.25),0_20px_50px_rgba(0,0,0,0.4)]
              transition duration-500 hover:-translate-y-2 hover:shadow-[0_0_45px_rgba(212,175,106,0.35)]"
            >

              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-x-0 top-0 h-[60%] w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-t from-black/80 to-transparent" />

              <span className="absolute right-4 top-4 rounded-full border border-[#d4af6a]/40 bg-black/60 px-2 py-1 text-xs text-[#d4af6a]">
                {service.tag}
              </span>

              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(180deg,rgba(30,21,15,0.8),rgba(13,10,8,0.98))]" />

              <div className="absolute bottom-8 left-6 right-6">

                <div className="mb-3 h-[1px] w-full bg-gradient-to-r from-[#d4af6a]/50 to-transparent" />

                <h3 className="text-[30px] md:text-[36px] text-[#e8ddc8]">
                  {service.title}
                </h3>

              </div>

            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
