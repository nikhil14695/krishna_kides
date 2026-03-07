import { useMemo } from "react";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function GlobalParticles({
  count = 30,
  className = "",
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
  const points = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: randomBetween(leftMin, leftMax),
        y: randomBetween(topMin, topMax),
        size: randomBetween(minSize, maxSize),
        opacity: randomBetween(minOpacity, maxOpacity),
        duration: randomBetween(durationMin, durationMax),
        twinkleDuration: randomBetween(durationMin * 0.7, durationMax * 0.9),
        delay: randomBetween(-durationMax, 0),
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
    ]
  );

  return (
    <div className={`global-particles ${className}`.trim()} aria-hidden="true">
      {points.map((p, i) => (
        <span
          key={i}
          className="global-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            backgroundColor: color,
            boxShadow: glow,
            "--gp-float-duration": `${p.duration}s`,
            "--gp-twinkle-duration": `${p.twinkleDuration}s`,
            "--gp-delay": `${p.delay}s`,
            "--gp-drift-x": `${p.driftX}px`,
            "--gp-drift-y": `${p.driftY}px`,
          }}
        />
      ))}
    </div>
  );
}

