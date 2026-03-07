import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/HeroGallery";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import PortfolioSection from "../components/PortfolioSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Header from "../components/Header";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(headerRef);

      gsap.set(headerRef.current, { autoAlpha: 0, y: -26, pointerEvents: "none" });
      gsap.set(q(".header-item"), { y: -14, autoAlpha: 0 });
      gsap.set(q(".header-cta"), { y: -14, autoAlpha: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onStart: () => gsap.set(headerRef.current, { pointerEvents: "auto" }),
      });

      tl.to(headerRef.current, { autoAlpha: 1, y: 0, duration: 0.35 }, 0)
        .to(q(".header-item"), { y: 0, autoAlpha: 1, duration: 0.28, stagger: 0.06 }, 0.08)
        .to(q(".header-cta"), { y: 0, autoAlpha: 1, duration: 0.28 }, 0.16)
        .eventCallback("onReverseComplete", () =>
          gsap.set(headerRef.current, { pointerEvents: "none" })
        );

      ScrollTrigger.create({
        trigger: "#hero",
        start: "bottom top",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header headerRef={headerRef} />

      <Hero />

      <div id="about" className="relative z-20 bg-[#0a0903]">
        <AboutSection />
      </div>
      <div id="services" className="relative z-20">
        <ServicesSection />
      </div>
      <div id="portfolio" className="relative z-20">
        <PortfolioSection />
      </div>
      <div id="contact" className="relative z-20">
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}
