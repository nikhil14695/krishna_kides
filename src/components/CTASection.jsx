// CTASection.jsx
import GlobalParticles from "./GlobalParticles";

export default function CTASection() {
  return (
    <section className="section relative overflow-hidden">
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
      {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,106,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#d4af6a]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[#f5e7c8]/10 blur-3xl" /> */}

      <div className="creta-container relative z-10 text-center">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-[#d4af6a]/30 bg-[linear-gradient(155deg,rgba(34,26,20,0.96),rgba(14,11,9,0.98))] px-8 py-16 shadow-[0_0_55px_rgba(212,175,106,0.18),0_28px_70px_rgba(0,0,0,0.45)] md:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,230,180,0.15),transparent_45%)]" />
          <p className="text-xs uppercase tracking-[0.4em] text-[#d4af6a]">
            Let’s Craft Your Story
          </p>
          <h2 className="mt-6 text-4xl text-[#f5f2eb] md:text-6xl">
            Book Your Wedding Shoot
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[#d1ccbf] md:text-lg">
            From intimate rituals to grand celebrations, we capture the moments
            that feel like you—warm, elegant, and timeless.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-full border border-[#d4af6a] bg-[#d4af6a] px-10 py-4 text-base font-semibold text-[#1a130c] transition hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(212,175,106,0.45)]">
              Contact Us
            </button>
            <button className="rounded-full border border-[#d4af6a]/60 bg-transparent px-10 py-4 text-base text-[#f5e7c8] transition hover:border-[#d4af6a] hover:text-white">
              View Packages
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
