// PortfolioSection.jsx
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
    <section className="bg-transparent py-24 text-white md:py-28">
      <div className="creta-container">
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
