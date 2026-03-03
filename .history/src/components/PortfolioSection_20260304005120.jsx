// PortfolioSection.jsx
export default function PortfolioSection() {
  return (
    <section className="bg-[#0a0903] py-28 px-6 md:px-20 text-white">
      <h2 className="text-center text-5xl mb-20 text-[#7b1e3a]">
        Featured Works
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1,2,3,4,5,6,7,8].map((num) => (
          <div
            key={num}
            className="overflow-hidden rounded-2xl group"
          >
            <img
              src={`/studio_photos/${num}.webp`}
              className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
}