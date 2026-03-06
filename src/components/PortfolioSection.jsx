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
    <section className="bg-[#0a0903] py-28 px-6 md:px-20 text-white">
      <h2 className="text-center text-5xl mb-20 text-[#7b1e3a]">
        Featured Works
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {portfolioImages.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl group"
          >
            <img
              src={src}
              alt={`Featured work ${index + 1}`}
              className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
