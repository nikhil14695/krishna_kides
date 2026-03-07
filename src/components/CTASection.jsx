// CTASection.jsx
export default function CTASection() {
  return (
    <section className="bg-transparent py-20 text-white md:py-24">
      <div className="creta-container text-center">
        <div className="mx-auto max-w-5xl rounded-[34px] border border-[#d4af6a]/30 bg-[linear-gradient(165deg,rgba(31,24,18,0.94),rgba(16,13,10,0.95))] px-8 py-14 shadow-[0_0_44px_rgba(212,175,106,0.14),0_22px_55px_rgba(0,0,0,0.4)] md:px-14">
          <h2 className="mb-8 text-4xl text-[#f2ebdb] md:text-6xl">
            Book Your Shoot Today
          </h2>

          <button className="rounded-full border border-[#d4af6a]/70 bg-[#120f0c] px-10 py-4 text-lg text-[#d4af6a] transition hover:scale-105 hover:bg-[#d4af6a] hover:text-black">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
