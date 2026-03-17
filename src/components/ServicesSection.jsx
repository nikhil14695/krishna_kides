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
  { title: "Family Portraits", image: img1, tag: "05" },
  { title: "Birthday Shoots", image: img2, tag: "02" },
  { title: "Theme Studio Shoots", image: img3, tag: "03" },
  { title: "Family Portraits", image: img4, tag: "04" },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const cards = cardsRef.current.filter(Boolean);

      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - section.offsetWidth);

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
      });

      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top top",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
    >

      {/* GOLD AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0
      bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,106,0.25),transparent_45%),
      radial-gradient(circle_at_80%_70%,rgba(123,30,58,0.22),transparent_50%)]" />

      <GlobalParticles
        className="absolute -inset-6 z-0"
        count={300}
        animate
        float
        twinkle
        pulse
        speed={1.25}
        minSize={1.5}
        maxSize={3.6}
        minOpacity={0.1}
        maxOpacity={0.45}
        durationMin={1.8}
        durationMax={4}
        drift={20}
        color="#d4af67"
        glow="0 0 10px rgba(212,175,103,0.62)"
        leftMin={-5}
        leftMax={105}
        topMin={-5}
        topMax={105}
      />

      {/* <GlobalParticles
        className="absolute inset-0"
        count={22}
        animate
        float
        twinkle
        pulse={false}
        speed={0.85}
        minSize={1.5}
        maxSize={3}
        minOpacity={0.08}
        maxOpacity={0.22}
        durationMin={5}
        durationMax={8}
        drift={10}
        color="#f0d49d"
        glow="0 0 8px rgba(240,212,157,0.35)"
      /> */}

      <div className="creta-container relative z-10">

        <h2 className="mx-auto mb-16 max-w-5xl text-center text-4xl leading-[1.1] text-[#efe7d6] md:text-[68px]">
          Services Designed for Timeless Childhood Memories
        </h2>

      </div>

      <div className="relative z-10 overflow-hidden">
        <div className="creta-container">
          <div ref={trackRef} className="flex w-max gap-6 pb-8">
          {services.map((service, i) => (
            <article
              key={`${service.title}-${i}`}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative min-h-[390px] min-w-[260px] overflow-hidden rounded-[24px]
                border border-[#d4af6a]/40
                bg-[linear-gradient(180deg,rgba(28,22,17,0.92),rgba(10,8,6,0.98))]
                shadow-[0_0_40px_rgba(212,175,106,0.22),0_30px_70px_rgba(0,0,0,0.55)]
                backdrop-blur-xl
                transition duration-500 hover:-translate-y-2
                hover:shadow-[0_0_55px_rgba(212,175,106,0.35),0_40px_80px_rgba(0,0,0,0.65)]
                sm:min-w-[300px] lg:min-w-[340px] xl:min-w-[380px]"
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* <span className="absolute right-4 top-4 rounded-full border border-[#d4af6a]/40 bg-black/70 px-2 py-1 text-xs tracking-wider text-[#d4af6a] backdrop-blur">
                {service.tag}
              </span> */}

              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {service.title}
                </h3>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
