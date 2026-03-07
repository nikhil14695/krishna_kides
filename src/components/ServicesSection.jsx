// ServicesSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ServicesSection() {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2 }
    );
  }, []);

  const services = [
    "Newborn Photography",
    "Birthday Shoots",
    "Theme Studio Shoots",
    "Family Portraits"
  ];

  return (
    <section className="bg-black py-24 text-white md:py-28">
      <div className="creta-container">
        <h2 className="mb-16 text-center text-4xl text-[#7b1e3a] md:mb-20 md:text-5xl">
          Our Services
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="rounded-2xl border border-[#7b1e3a]/40 bg-[#14110f] p-8 transition duration-500 hover:scale-105"
            >
              <h3 className="text-xl font-medium">{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
