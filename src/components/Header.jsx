import logo from "../assets/kids_logo.png";

export default function Header({ headerRef }) {
  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-[70] w-full py-4"
    >
      <div className="creta-container flex h-14 items-center justify-between rounded-2xl border border-[#d4af37]/20 bg-[#09070a]/65 px-4 backdrop-blur-xl md:px-6">
        <a href="#hero" className="flex w-36 items-center md:w-44">
          <img
            src={logo}
            alt="Krishna Kids Studio"
            className="h-9 w-auto object-contain brightness-0 invert md:h-10"
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          <a href="#about" className="header-item text-sm tracking-wide text-[#f5f2eb] transition hover:text-[#d4af37]">
            About
          </a>
          <a href="#services" className="header-item text-sm tracking-wide text-[#f5f2eb] transition hover:text-[#d4af37]">
            Services
          </a>
          <a href="#wedding" className="header-item text-sm tracking-wide text-[#f5f2eb] transition hover:text-[#d4af37]">
            Wedding
          </a>
          <a href="#contact" className="header-item text-sm tracking-wide text-[#f5f2eb] transition hover:text-[#d4af37]">
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="header-cta rounded-full border border-[#d4af37]/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black md:text-sm"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}
