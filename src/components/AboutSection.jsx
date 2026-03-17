import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobalParticles from "./GlobalParticles";
import skillImg1 from "../assets/studio_photos/1.webp";
import skillImg2 from "../assets/studio_photos/7.webp";
import skillImg3 from "../assets/studio_photos/10.webp";

gsap.registerPlugin(ScrollTrigger);

const skillCards = [
  {
    title: "Newborn Stories",
    description: "Soft, cozy setups designed for delicate first portraits.",
    image: skillImg1,
    className: "min-h-[240px] lg:min-h-[265px]",
  },
  {
    title: "Birthday Magic",
    description: "Creative sets that celebrate milestones in style.",
    image: skillImg2,
    className: "min-h-[240px] lg:min-h-[265px]",
  },
  {
    title: "Family Frames",
    description: "Warm cinematic portraits with premium retouching and color finishing.",
    image: skillImg3,
    className: "min-h-[305px] lg:min-h-[360px] sm:col-span-2",
  },
];

const stats = [
  { label: "Years", value: "10+", icon: "calendar" },
  { label: "Sessions", value: "5k+", icon: "camera" },
  { label: "Joy", value: "100%", icon: "smile" },
];

function StatIcon({ icon }) {
  if (icon === "camera") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#d4af67]">
        <path
          d="M8.5 7.5L10 5.5H14L15.5 7.5H18.5C19.6 7.5 20.5 8.4 20.5 9.5V17.5C20.5 18.6 19.6 19.5 18.5 19.5H5.5C4.4 19.5 3.5 18.6 3.5 17.5V9.5C3.5 8.4 4.4 7.5 5.5 7.5H8.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="13.5" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "smile") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#d4af67]">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="9.3" cy="10" r="0.9" fill="currentColor" />
        <circle cx="14.7" cy="10" r="0.9" fill="currentColor" />
        <path d="M8.4 14C9.3 15.3 10.4 16 12 16C13.6 16 14.7 15.3 15.6 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#d4af67]">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 3.5V7.2M17 3.5V7.2M3.5 10.2H20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

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
      className="section"
    >
      <GlobalParticles
        className="absolute -inset-6"
        count={200}
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
      {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(212,175,103,0.14),transparent_46%),radial-gradient(circle_at_82%_72%,rgba(191,128,56,0.14),transparent_42%),linear-gradient(180deg,rgba(9,7,4,0.94),rgba(8,6,4,1))]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(214,176,106,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(214,176,106,0.06)_1px,transparent_1px)] [background-size:6px_6px,6px_6px]" />
      <div className="about-bg-float-1 about-parallax pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#7b1e3a]/16 blur-3xl" />
      <div className="about-bg-float-2 about-parallax pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#d4af37]/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,232,176,0.55)_1px,transparent_1.2px)] [background-size:180px_180px] opacity-20" /> */}

      <div className="creta-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="about-reveal mb-4 text-sm uppercase tracking-[0.34em] text-[#d2ac64]">
              Timeless Memories
            </p>
            <h2 className="about-reveal max-w-2xl text-4xl font-medium leading-tight text-[#f5f2eb] md:text-[66px] md:leading-[1.08]">
              About Krishna Kids Studio
            </h2>
            <div className="about-line mt-7 h-[2px] w-full max-w-[540px] bg-gradient-to-r from-[#d6b06a] via-[#7c4e25] to-transparent" />
            <p className="about-reveal mt-8 max-w-[650px] text-base leading-relaxed text-[#d1ccbf] md:text-[20px] md:leading-[1.58]">
              We capture magical childhood moments with cinematic lighting,
              custom themes, and premium photo editing. Every child&apos;s
              smile deserves an unforgettable frame.
            </p>
            <div className="about-reveal mt-10 grid gap-4 sm:grid-cols-3 md:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-[#bc9450]/35 bg-[linear-gradient(145deg,rgba(47,44,41,0.86),rgba(26,24,21,0.9))] px-5 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_0_30px_rgba(202,152,72,0.24),0_10px_34px_rgba(0,0,0,0.35)] backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#bc9450]/30 bg-black/20">
                      <StatIcon icon={stat.icon} />
                    </div>
                    <div>
                      <p className="text-3xl leading-none font-semibold tracking-wide text-[#d9b469] md:text-[44px]">{stat.value}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[#969185] md:text-xs">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-reveal relative overflow-visible">
            {/* <GlobalParticles
              className="absolute -inset-6"
              count={120}
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
            /> */}

            {/* Glow background */}
            <div className="pointer-events-none absolute -inset-4 rounded-[38px] 
  bg-[radial-gradient(circle_at_20%_30%,rgba(224,179,102,0.24),transparent_50%),radial-gradient(circle_at_74%_70%,rgba(157,95,40,0.28),transparent_46%)] blur-xl" />

            <div className="relative rounded-[34px] border border-[#be9553]/52 
  bg-[linear-gradient(165deg,rgba(30,23,16,0.96),rgba(18,14,10,0.94))] 
  p-4 shadow-[0_0_38px_rgba(220,170,88,0.22),0_24px_80px_rgba(0,0,0,0.48),inset_0_0_0_1px_rgba(255,224,170,0.08)] md:p-6">

              <div className="grid gap-4 sm:grid-cols-2">

                {skillCards.map((skill) => (
                  <div
                    key={skill.title}
                    className={`group relative overflow-hidden rounded-2xl border border-[#d3ab6b]/30 bg-black/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] ${skill.className}`}
                  >
                    <img
                      src={skill.image}
                      alt={skill.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#080706]/95 via-[#080706]/42 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <h3 className="text-[24px] leading-tight text-[#dab066] md:text-[30px]">
                        {skill.title}
                      </h3>

                      {/* <p className="mt-2 max-w-[95%] text-sm leading-relaxed text-[#dbd4c4] md:text-[18px]">
                        {skill.description}
                      </p> */}
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
