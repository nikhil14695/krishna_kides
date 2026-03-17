import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/HeroGallery";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import PortfolioSection from "../components/PortfolioSection";
import PreWeddingShotsSection from "../components/PreWeddingShotsSection";
import HighlightShowcase from "../components/HighlightShowcase.jsx";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Header from "../components/Header";
import WeddingShowcaseSection from "../components/WeddingShowcaseSection";
import Footer from "../components/Footer";

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

      <div className="relative overflow-hidden bg-[#090704]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_22%,rgba(212,175,103,0.13),transparent_46%),radial-gradient(circle_at_84%_78%,rgba(123,30,58,0.17),transparent_44%),linear-gradient(180deg,rgba(9,7,4,0.98),rgba(8,6,4,1))]" />
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(214,176,106,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(214,176,106,0.06)_1px,transparent_1px)] [background-size:6px_6px,6px_6px]" />

        <div id="about" className="relative z-20 scroll-mt-28 md:scroll-mt-32">
          <AboutSection />
        </div>
        <div id="services" className="relative z-20 scroll-mt-28 md:scroll-mt-32">
          <ServicesSection />
        </div>
        
        {/* <div id="portfolio" className="relative z-20 scroll-mt-28 md:scroll-mt-32">
          <PortfolioSection />
        </div> */}
        {/* <div id="prewedding" className="relative z-20 scroll-mt-28 md:scroll-mt-32">
          <PreWeddingShotsSection />
        </div> */}
        <div id="highlights" className="relative z-20 scroll-mt-28 md:scroll-mt-32">
          {/* <HighlightShowcase /> */}
          <TestimonialsSection />
        </div>
        <div id="wedding" className="relative z-20 scroll-mt-28 md:scroll-mt-32">
          <WeddingShowcaseSection />
        </div>
        <div id="contact" className="relative z-20 scroll-mt-28 md:scroll-mt-32">
          <CTASection />
        </div>
        <Footer />
      </div>
    </>
  );
}
