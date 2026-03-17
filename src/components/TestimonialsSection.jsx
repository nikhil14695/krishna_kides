import { useState } from "react";
import { loveStories } from "../data/PreWedding";
import GlobalParticles from "./GlobalParticles";

export default function LoveStoriesSlider() {
  const [storyIndex, setStoryIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);

  const story = loveStories[storyIndex];
  const media = story.media;

  const prevIndex = mediaIndex === 0 ? media.length - 1 : mediaIndex - 1;
  const nextIndex = mediaIndex === media.length - 1 ? 0 : mediaIndex + 1;
  const prevStoryIndex =
    storyIndex === 0 ? loveStories.length - 1 : storyIndex - 1;
  const nextStoryIndex =
    storyIndex === loveStories.length - 1 ? 0 : storyIndex + 1;

  const prevSlide = () => setMediaIndex(prevIndex);
  const nextSlide = () => setMediaIndex(nextIndex);
  const prevStory = () => {
    setStoryIndex((prev) => (prev === 0 ? loveStories.length - 1 : prev - 1));
    setMediaIndex(0);
  };
  const nextStory = () => {
    setStoryIndex((prev) => (prev + 1) % loveStories.length);
    setMediaIndex(0);
  };

  return (
    <section className="section font-serif">
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
        {/* TITLE */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d2ac64]">
            Love Stories
          </p>
          <h2 className="mt-5 text-4xl leading-[1.1] text-[#f5f2eb] md:text-[58px]">
            Pre-Wedding Highlights That Feel Cinematic
          </h2>
          <p className="mt-6 text-lg text-[#d1ccbf]">
            Relive their journey with curated frames and short films designed for
            timeless memories.
          </p>
        </div>

        {/* MAIN SLIDER */}
        <div className="relative">
          {/* STORY PREV */}
          <button
            onClick={prevStory}
            className="absolute left-0 top-1/2 z-30 -translate-y-1/2 rounded bg-black/80 px-3 py-2 text-sm text-white shadow md:px-4"
          >
            ◀ Story
          </button>

          {/* STORY NEXT */}
          <button
            onClick={nextStory}
            className="absolute right-0 top-1/2 z-30 -translate-y-1/2 rounded bg-black/80 px-3 py-2 text-sm text-white shadow md:px-4"
          >
            Story ▶
          </button>

          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)_minmax(0,220px)] lg:gap-10 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)_minmax(0,260px)] xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,300px)]">
            {/* LEFT PREVIEW */}
            <div className="hidden md:block">
              <img
                src={loveStories[prevStoryIndex].media[0].thumbnail}
                className="h-[260px] w-full rounded-xl object-cover opacity-60 lg:h-[320px] xl:h-[360px]"
              />
            </div>

            {/* CENTER ACTIVE */}
            <div className="relative z-10 w-full">
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded bg-black/70 px-3 py-2 text-sm text-white md:left-4"
              >
                Prev
              </button>

              <div className="relative">
                {media[mediaIndex].type === "video" ? (
                  <iframe
                    src={`${media[mediaIndex].src}?autoplay=1&mute=1&loop=1&playlist=${media[mediaIndex].videoId}&controls=0&showinfo=0&rel=0`}
                    className="h-[260px] w-full rounded-xl sm:h-[320px] md:h-[420px] lg:h-[450px]"
                    allow="autoplay"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={media[mediaIndex].src}
                    className="h-[260px] w-full rounded-xl object-cover sm:h-[320px] md:h-[420px] lg:h-[450px]"
                  />
                )}

                {/* OVERLAY */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 sm:p-6">
                  <h3 className="text-2xl font-semibold text-white">
                    {media[mediaIndex].title}
                  </h3>

                  <button className="mt-3 rounded-full border border-yellow-400 px-4 py-2 text-sm text-yellow-400 transition hover:bg-yellow-400 hover:text-black">
                    View Story →
                  </button>
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-black/70 px-3 py-2 text-sm text-white md:right-4"
              >
                Next
              </button>
            </div>

            {/* RIGHT PREVIEW */}
            <div className="hidden md:block">
              <img
                src={loveStories[nextStoryIndex].media[0].thumbnail}
                className="h-[260px] w-full rounded-xl object-cover opacity-60 lg:h-[320px] xl:h-[360px]"
              />
            </div>
          </div>
        </div>

        {/* THUMBNAILS */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex min-w-max justify-center gap-4 pb-2">
          {media.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setMediaIndex(index)}
              className={`cursor-pointer overflow-hidden rounded border-2 transition ${
                mediaIndex === index
                  ? "border-yellow-400 scale-110"
                  : "border-transparent"
              }`}
            >
              <img
                src={item.thumbnail}
                loading="lazy"
                className="h-20 w-28 object-cover sm:h-24 sm:w-36"
              />
            </div>
          ))}
          </div>
        </div>

        {/* SLIDE COUNT */}
        <p className="mt-4 text-center text-gray-400">
          Story {storyIndex + 1} / {loveStories.length} • Media {mediaIndex + 1}{" "}
          / {media.length}
        </p>
      </div>
    </section>
  );
}
