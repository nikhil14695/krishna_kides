import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skillImg1 from "../assets/studio_photos/3.webp";
import skillImg2 from "../assets/studio_photos/7.webp";
import skillImg3 from "../assets/studio_photos/10.webp";

gsap.registerPlugin(ScrollTrigger);

const skillCards = [
  {
    title: "Newborn Stories",
    description: "Soft, cozy setups designed for delicate first portraits.",
    image: skillImg1,
  },
  {
    title: "Birthday Magic",
    description: "Creative sets that celebrate milestones in style.",
    image: skillImg2,
  },
  {
    title: "Family Frames",
    description: "Warm cinematic portraits with premium retouching and color finishing.",
    image: skillImg3,
    wide: true,
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      gsap.fromTo(
        q(".about-reveal"),
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        q(".about-line"),
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.to(q(".about-bg-float-1"), {
        y: -40,
        x: 20,
        repeat: -1,
        yoyo: true,
        duration: 5.5,
        ease: "sine.inOut",
      });

      gsap.to(q(".about-bg-float-2"), {
        y: 30,
        x: -16,
        repeat: -1,
        yoyo: true,
        duration: 6.2,
        ease: "sine.inOut",
      });

      gsap.to(q(".about-parallax"), {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0a0903] py-24 text-white md:py-32"
    >
      <div className="about-bg-float-1 about-parallax pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#7b1e3a]/20 blur-3xl" />
      <div className="about-bg-float-2 about-parallax pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="creta-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="about-reveal mb-4 text-sm uppercase tracking-[0.28em] text-[#d4af37]">
              Timeless Memories
            </p>
            <h2 className="about-reveal text-4xl font-medium leading-tight text-[#f5f2eb] md:text-6xl">
              About Krishna Kids Studio
            </h2>
            <div className="about-line mt-5 h-[2px] w-94 bg-gradient-to-r from-[#d4af37] via-[#7b1e3a] to-transparent" />
            <p className="about-reveal mt-8 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
              We capture magical childhood moments with cinematic lighting,
              custom themes, and premium photo editing. Every child&apos;s
              smile deserves an unforgettable frame.
            </p>
            <div className="about-reveal mt-10 grid grid-cols-3 gap-4 md:gap-6">
              <div className="rounded-2xl border border-[#7b1e3a]/40 bg-[#16161d]/70 p-4 text-center backdrop-blur-sm">
                <p className="text-2xl font-semibold text-[#d4af37]">10+</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">Years</p>
              </div>
              <div className="rounded-2xl border border-[#7b1e3a]/40 bg-[#16161d]/70 p-4 text-center backdrop-blur-sm">
                <p className="text-2xl font-semibold text-[#d4af37]">5k+</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">Sessions</p>
              </div>
              <div className="rounded-2xl border border-[#7b1e3a]/40 bg-[#16161d]/70 p-4 text-center backdrop-blur-sm">
                <p className="text-2xl font-semibold text-[#d4af37]">100%</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-gray-400">Joy</p>
              </div>
            </div>
          </div>

          <div className="about-reveal relative">
            <div className="rounded-[28px] border border-[#7b1e3a]/40 bg-gradient-to-br from-[#130f0d] to-[#1a1512] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {skillCards.map((skill) => (
                  <div
                    key={skill.title}
                    className={`group overflow-hidden rounded-xl border border-[#d4af37]/20 bg-black/25 ${
                      skill.wide ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={skill.image}
                        alt={skill.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg text-[#d4af37]">{skill.title}</h3>
                      <p className="mt-2 text-sm text-gray-300">{skill.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
