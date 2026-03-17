// LoveStoriesSection.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlobalParticles from "./GlobalParticles";

import img1 from "../assets/studio_photos/1.webp";
import img2 from "../assets/studio_photos/2.webp";
import img3 from "../assets/studio_photos/3.webp";
import img4 from "../assets/studio_photos/4.webp";
import img5 from "../assets/studio_photos/5.webp";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
    "Cinematic lighting for magical moments",
    "Custom themes and creative setups",
    "Premium retouching and color grading",
];

export default function LoveStoriesSection() {

    const sectionRef = useRef(null);
    const imagesRef = useRef([]);
    const highlightRef = useRef([]);

    // useEffect(() => {

    //     const ctx = gsap.context(() => {

    //         const items = imagesRef.current.filter(Boolean);

    //         /* IMAGE REVEAL */
    //         gsap.fromTo(
    //         items,
    //         { opacity: 0, scale: 0.9 },
    //         {
    //             opacity: 1,
    //             scale: 1,
    //             duration: 0.9,
    //             stagger: 0.15,
    //             ease: "power3.out",
    //             scrollTrigger: {
    //             trigger: sectionRef.current,
    //             start: "top 80%",
    //             }
    //         }
    //         );

    //         /* PARALLAX (animate inner image only) */
    //         items.forEach((item, i) => {

    //         const img = item.querySelector("img");

    //         gsap.to(img, {
    //             y: i % 2 === 0 ? -20 : -35,
    //             ease: "none",
    //             scrollTrigger: {
    //             trigger: sectionRef.current,
    //             scrub: true
    //             }
    //         });

    //         });

    //         /* HIGHLIGHTS */
    //         gsap.fromTo(
    //         highlightRef.current,
    //         { y: 50, opacity: 0 },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             duration: 0.8,
    //             stagger: 0.15,
    //             ease: "power3.out",
    //             scrollTrigger: {
    //             trigger: sectionRef.current,
    //             start: "top 75%",
    //             }
    //         }
    //         );

    //     }, sectionRef);

    //     return () => ctx.revert();

    //     }, []);

    return (
        <section ref={sectionRef} className="section relative overflow-hidden">
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
                <div className="text-center mb-20">

                    <p className="text-sm uppercase tracking-[0.35em] text-[#d2ac64] mb-6">
                        Love Stories
                    </p>

                    <h2 className="text-4xl md:text-[58px] text-[#f5f2eb] leading-[1.1] max-w-4xl mx-auto">
                        Capturing Beautiful Moments Before The Big Day
                    </h2>

                    <p className="max-w-2xl mx-auto mt-8 text-[#d1ccbf] text-lg">
                        Elegant pre-wedding photography that tells your unique story
                        with cinematic lighting and artistic composition.
                    </p>

                </div>

                {/* IMAGE SHOWCASE */}
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[260px] gap-6 mb-24">

                    {/* BIG IMAGE */}
                    <div
                        ref={el => imagesRef.current[0] = el}
                        className="col-span-2 row-span-2 group relative overflow-hidden rounded-3xl
    border border-[#d4af6a]/30 shadow-[0_0_50px_rgba(212,175,106,.25)]"
                    >

                        <img
                            src={img1}
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-2xl font-serif text-[#f5e7c8]">
                                Romantic Frames
                            </h3>
                        </div>

                    </div>


                    {[img2, img3, img4, img5].map((img, i) => (

                        <div
                            key={i}
                            ref={el => imagesRef.current[i + 1] = el}
                            className="group relative overflow-hidden rounded-3xl
      border border-[#d4af6a]/30 shadow-[0_0_35px_rgba(212,175,106,.2)]
      transition duration-500"
                        >

                            <img
                                src={img}
                                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
      -translate-x-full group-hover:translate-x-full transition duration-1000"/>

                        </div>

                    ))}

                </div>


                {/* HIGHLIGHTS */}
                {/* <div className="grid md:grid-cols-3 gap-8">

                    {highlights.map((text, i) => (
                        <div
                            key={i}
                            ref={el => highlightRef.current[i] = el}
                            className="relative p-10 text-center rounded-3xl
              border border-[#d4af6a]/35
              bg-[linear-gradient(145deg,rgba(47,44,41,.85),rgba(26,24,21,.9))]
              shadow-[0_0_40px_rgba(202,152,72,.3)]
              hover:-translate-y-1 transition duration-500"
                        >
                            <p className="text-[#e6dcc7] text-lg leading-relaxed">
                                {text}
                            </p>

                        </div>
                    ))}

                </div> */}

            </div>

        </section>
    );
}
