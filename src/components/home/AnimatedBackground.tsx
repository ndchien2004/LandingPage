"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Hạt bụi giấy / phấn gió bay nhẹ — vị trí cố định để tránh lệch hydrate. */
const PARTICLES = [
  { left: "8%", top: "22%", size: 7, delay: 0, dur: 11 },
  { left: "18%", top: "65%", size: 5, delay: 1.5, dur: 13 },
  { left: "30%", top: "38%", size: 9, delay: 0.8, dur: 10 },
  { left: "44%", top: "72%", size: 4, delay: 2.2, dur: 14 },
  { left: "57%", top: "28%", size: 6, delay: 1.1, dur: 12 },
  { left: "68%", top: "58%", size: 8, delay: 0.4, dur: 9.5 },
  { left: "79%", top: "34%", size: 5, delay: 2.8, dur: 13.5 },
  { left: "88%", top: "68%", size: 7, delay: 1.9, dur: 11.5 },
  { left: "50%", top: "48%", size: 4, delay: 3.2, dur: 15 },
  { left: "25%", top: "84%", size: 6, delay: 0.6, dur: 12.5 },
];

export function AnimatedBackground() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-parallax]");
        // Hàm di chuyển mượt theo con trỏ
        const movers = layers.map((layer) => {
          const depth = Number(layer.dataset.parallax) || 0;
          return {
            x: gsap.quickTo(layer, "x", { duration: 1.1, ease: "power3.out" }),
            y: gsap.quickTo(layer, "y", { duration: 1.1, ease: "power3.out" }),
            depth,
          };
        });

        const onMove = (e: PointerEvent) => {
          const cx = window.innerWidth / 2;
          const cy = window.innerHeight / 2;
          const dx = (e.clientX - cx) / cx;
          const dy = (e.clientY - cy) / cy;
          movers.forEach((m) => {
            m.x(dx * m.depth * -22);
            m.y(dy * m.depth * -14);
          });
        };

        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Nền giấy chuyển sắc */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8f3e9_0%,#f4ecdc_52%,#efe2cb_100%)]" />

      {/* Vầng sáng ấm phía trên */}
      <div
        data-parallax="0.6"
        className="absolute left-1/2 top-[-18%] h-[55vh] w-[55vh] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,75,0.30) 0%, rgba(194,112,61,0.12) 45%, transparent 70%)",
        }}
      />

      {/* Núi xa */}
      <svg
        data-parallax="1.2"
        className="absolute bottom-0 left-1/2 w-[130%] -translate-x-1/2"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 220 L210 130 L380 210 L560 90 L760 200 L980 120 L1180 205 L1440 140 L1440 320 L0 320 Z"
          fill="#7a3b2e"
          opacity="0.10"
        />
      </svg>

      {/* Mái làng gần */}
      <svg
        data-parallax="2.2"
        className="absolute bottom-0 left-1/2 w-[140%] -translate-x-1/2"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 200 L120 200 L160 168 L220 200 L360 200 L410 160 L470 200 L640 200 L690 168 L760 200 L920 200 L975 156 L1040 200 L1220 200 L1275 168 L1340 200 L1440 200 L1440 240 L0 240 Z"
          fill="#7a3b2e"
          opacity="0.16"
        />
      </svg>

      {/* Hạt bụi giấy bay */}
      <div className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animate-drift absolute rounded-full bg-dat/40"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Lớp hạt giấy mịn + vignette */}
      <div className="absolute inset-0 bg-paper-grain opacity-40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,transparent_55%,rgba(60,38,18,0.16)_100%)]" />
    </div>
  );
}
