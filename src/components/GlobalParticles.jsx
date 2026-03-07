import { useMemo, useRef, useEffect } from "react";
import gsap from "gsap";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function GlobalParticles({
  count = 30,
  className = "",
  animate = true,
  float = true,
  twinkle = true,
  pulse = false,
  speed = 1,
  minSize = 2,
  maxSize = 5,
  minOpacity = 0.12,
  maxOpacity = 0.42,
  durationMin = 2.5,
  durationMax = 5.4,
  drift = 14,
  color = "#d4af6a",
  glow = "0 0 12px rgba(212,175,106,0.55)",
  leftMin = 0,
  leftMax = 100,
  topMin = 0,
  topMax = 100,
}) {
  const particlesRef = useRef([]);

  const points = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: randomBetween(leftMin, leftMax),
        y: randomBetween(topMin, topMax),
        size: randomBetween(minSize, maxSize),
        opacity: randomBetween(minOpacity, maxOpacity),
        duration: randomBetween(durationMin, durationMax) / speed,
        driftX: randomBetween(-drift, drift),
        driftY: randomBetween(-drift, drift),
      })),
    [
      count,
      leftMin,
      leftMax,
      topMin,
      topMax,
      minSize,
      maxSize,
      minOpacity,
      maxOpacity,
      durationMin,
      durationMax,
      drift,
      speed,
    ]
  );

  useEffect(() => {
    if (!animate) return;

    particlesRef.current.forEach((dot, i) => {
      const p = points[i];

      if (!dot) return;

      if (float) {
        gsap.to(dot, {
          x: p.driftX,
          y: p.driftY,
          duration: p.duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (twinkle) {
        gsap.to(dot, {
          opacity: randomBetween(minOpacity, maxOpacity),
          duration: randomBetween(1.2, 2.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (pulse) {
        gsap.to(dot, {
          scale: randomBetween(1.1, 1.4),
          duration: randomBetween(1.6, 2.8),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
  }, [points, animate, float, twinkle, pulse, minOpacity, maxOpacity]);

  return (
    <div className={`pointer-events-none ${className}`}>
      {points.map((p, i) => (
        <span
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            opacity: p.opacity,
            backgroundColor: color,
            boxShadow: glow,
          }}
        />
      ))}
    </div>
  );
}