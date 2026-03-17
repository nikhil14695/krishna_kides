import { useState } from "react";
import GlobalParticles from "./GlobalParticles";
import img1 from "../assets/studio_photos/8.webp";
import img2 from "../assets/studio_photos/9.webp";
import img3 from "../assets/studio_photos/10.webp";
import img4 from "../assets/studio_photos/7.webp";
import img5 from "../assets/studio_photos/12.webp";
import img6 from "../assets/studio_photos/13.webp";

import video from "/videos/vids2.mp4";

const tiles = [
  { type: "image", category: "Traditional", src: img1 },
  { type: "image", category: "Traditional", src: img2 },
  { type: "image", category: "Regular", src: img3 },
  { type: "image", category: "Candid", src: img4 },
  { type: "image", category: "Traditional", src: img5 },

  { type: "video", category: "Candid", src: video }, // CENTER VIDEO

  { type: "image", category: "Candid", src: img6 },
  { type: "image", category: "Regular", src: img1 },
  { type: "image", category: "Traditional", src: img2 },
  { type: "image", category: "Regular", src: img3 },
  { type: "image", category: "Candid", src: img4 },
  { type: "image", category: "Traditional", src: img5 },
  { type: "image", category: "Candid", src: img6 },
];

export default function WeddingShowcaseSection() {
  const tabs = ["All", "Regular", "Candid", "Traditional"];
  const [activeTab, setActiveTab] = useState("All");

  return (
    <section className="section bg-[#ebe4db] py-20">
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

        {/* Title */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d2ac64]">
            Wedding Stories
          </p>
          <h2 className="mt-5 text-4xl leading-[1.1] text-[#f5f2eb] md:text-[58px]">
            A Wedding Gallery With Images And Short Films
          </h2>
          <p className="mt-6 text-lg text-[#d1ccbf]">
            Celebrate every ritual, candid smile, and cinematic frame with curated
            visuals crafted for timeless memories.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.28em] transition ${
                  isActive
                    ? "border-[#d4af6a] bg-[#d4af6a]/15 text-[#f5e7c8] shadow-[0_0_20px_rgba(212,175,106,0.25)]"
                    : "border-[#d4af6a]/35 text-[#d1ccbf] hover:border-[#d4af6a]/70 hover:text-[#f5e7c8]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Masonry Grid (dynamic image sizes) */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {tiles
            .filter(
              (tile) => activeTab === "All" || tile.category === activeTab
            )
            .map((tile, index) => (
            <div
              key={index}
              className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl"
            >
              {tile.type === "video" ? (
                <video
                  src={tile.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="block h-auto w-full object-cover"
                />
              ) : (
                <img
                  src={tile.src}
                  alt=""
                  loading="lazy"
                  className="block h-auto w-full object-cover transition duration-700 hover:scale-110"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
