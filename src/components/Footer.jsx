import logo from "../assets/kids_logo.png";
import GlobalParticles from "./GlobalParticles";

export default function Footer() {
  return (
    <footer className="section relative overflow-hidden border-t border-[#d4af37]/20 bg-[#090704]">
      {/* <GlobalParticles
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
      /> */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(212,175,103,0.14),transparent_46%),radial-gradient(circle_at_88%_75%,rgba(123,30,58,0.18),transparent_44%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(214,176,106,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(214,176,106,0.05)_1px,transparent_1px)] [background-size:6px_6px,6px_6px]" />

      <div className="creta-container relative z-10 grid gap-10 py-0 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <img
            src={logo}
            alt="Krishna Kids Studio"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#d1ccbf]">
            Krishna Kids Studio crafts timeless wedding stories with a warm,
            elegant, and cinematic touch for families who value authentic
            moments.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-[#d4af37]">
            <span className="rounded-full border border-[#d4af37]/40 px-4 py-2">
              Premium Shoots
            </span>
            <span className="rounded-full border border-[#d4af37]/40 px-4 py-2">
              Trusted Team
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#d4af37]">
            Quick Links
          </p>
          <nav className="mt-5 grid gap-3 text-sm text-[#f5f2eb]">
            <a className="transition hover:text-[#d4af37]" href="#about">
              About
            </a>
            <a className="transition hover:text-[#d4af37]" href="#services">
              Services
            </a>
            <a className="transition hover:text-[#d4af37]" href="#wedding">
              Wedding
            </a>
            <a className="transition hover:text-[#d4af37]" href="#contact">
              Contact
            </a>
          </nav>
        </div>

        <div className="md:justify-self-end md:text-right">
          <p className="text-xs uppercase tracking-[0.32em] text-[#d4af37]">
            Let’s Talk
          </p>
          <p className="mt-5 text-sm text-[#f5f2eb]">
            Call: +91 90000 00000
          </p>
          <p className="mt-2 text-sm text-[#f5f2eb]">
            Email: hello@krishnakidsstudio.com
          </p>
          <p className="mt-2 text-sm text-[#d1ccbf]">
            Hyderabad, Telangana
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-[#d4af37]/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#fdf7ea] transition hover:border-[#d4af37] hover:text-white"
          >
            Book Consultation
          </a>
        </div>
      </div>

      <div className="relative z-10 border-t border-[#d4af37]/15">
        <div className="creta-container flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-[#bdb6a8]">
          <p>© 2026 Krishna Kids Studio. All rights reserved.</p>
          <p>Crafted with care for timeless stories.</p>
        </div>
      </div>
    </footer>
  );
}
