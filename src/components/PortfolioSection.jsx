// PortfolioSection.jsx
import GlobalParticles from "./GlobalParticles";
import img1 from "../assets/studio_photos/1.webp";
import img2 from "../assets/studio_photos/2.webp";
import img3 from "../assets/studio_photos/3.webp";
import img4 from "../assets/studio_photos/4.webp";
import img5 from "../assets/studio_photos/5.webp";
import img6 from "../assets/studio_photos/6.webp";
import img7 from "../assets/studio_photos/7.webp";
import img8 from "../assets/studio_photos/8.webp";

const portfolioImages = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function PortfolioSection() {
  return (
    <section className="section">
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
      <div className="creta-container relative z-10">
        <h2 className="mb-16 text-center text-4xl text-[#d3ad67] md:mb-20 md:text-5xl">
          Featured Works
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {portfolioImages.map((src, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl border border-[#d4af6a]/25 bg-[linear-gradient(160deg,rgba(26,20,15,0.95),rgba(14,11,9,0.94))] shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
            >
              <img
                src={src}
                alt={`Featured work ${index + 1}`}
                className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
