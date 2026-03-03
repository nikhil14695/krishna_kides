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
    <section className="bg-black py-28 px-6 md:px-20 text-white">
      <h2 className="text-center text-5xl mb-20 text-[#7b1e3a]">
        Our Services
      </h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((service, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-[#14110f] border border-[#7b1e3a]/40 p-8 rounded-2xl hover:scale-105 transition duration-500"
          >
            <h3 className="text-xl font-medium">{service}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}