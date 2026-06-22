"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { crafts } from "@/data/crafts";
import { site } from "@/data/site";
import { usePageTransition } from "@/components/transition/PageTransition";

gsap.registerPlugin(useGSAP);

/** Vị trí mỗi "ải" làng nghề trên bản đồ (theo % khung hero). */
const MAP_POINTS: Record<string, { x: number; y: number }> = {
  "nghe-quat": { x: 17, y: 68 },
  "nghe-moc": { x: 39, y: 49 },
  "nghe-son": { x: 61, y: 62 },
  "nghe-tre": { x: 83, y: 43 },
};

/** Đường mòn nối các ải — vẽ dần khi vào trang. */
const TRAIL_D =
  "M17,68 C26,58 31,49 39,49 C48,49 53,64 61,62 C71,60 75,45 83,43";

const points = crafts
  .filter((c) => MAP_POINTS[c.slug])
  .map((c) => ({ ...c, pos: MAP_POINTS[c.slug] }));

export function MapHero() {
  const root = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const navigate = usePageTransition();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduced = ctx.conditions?.reduced;
          const markers = gsap.utils.toArray<HTMLElement>("[data-marker]");

          if (reduced) {
            gsap.set(["[data-title]", ...markers], { autoAlpha: 1, y: 0 });
            return;
          }

          // Hoạt cảnh khi vào trang
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.from(bgRef.current, {
            scale: 1.14,
            autoAlpha: 0,
            duration: 1.3,
            ease: "power2.out",
          })
            .from(
              "[data-title]",
              { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.12 },
              "-=0.8",
            );

          // Vẽ dần đường mòn
          const trail = trailRef.current;
          if (trail) {
            const len = trail.getTotalLength();
            gsap.set(trail, { strokeDasharray: len, strokeDashoffset: len });
            tl.to(
              trail,
              { strokeDashoffset: 0, duration: 1.3, ease: "power1.inOut" },
              "-=0.4",
            );
          }

          tl.from(
            markers,
            {
              scale: 0,
              autoAlpha: 0,
              transformOrigin: "center bottom",
              duration: 0.7,
              ease: "back.out(1.9)",
              stagger: 0.14,
            },
            "-=0.9",
          );

          // Parallax theo con trỏ (chỉ thiết bị có chuột)
          const fine = window.matchMedia("(pointer: fine)").matches;
          if (!fine) return;

          const xBg = gsap.quickTo(bgRef.current, "xPercent", {
            duration: 0.8,
            ease: "power3.out",
          });
          const yBg = gsap.quickTo(bgRef.current, "yPercent", {
            duration: 0.8,
            ease: "power3.out",
          });
          const xLayer = gsap.quickTo(layerRef.current, "xPercent", {
            duration: 0.9,
            ease: "power3.out",
          });
          const yLayer = gsap.quickTo(layerRef.current, "yPercent", {
            duration: 0.9,
            ease: "power3.out",
          });

          const onMove = (e: PointerEvent) => {
            const r = root.current?.getBoundingClientRect();
            if (!r) return;
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            xBg(nx * -2.4);
            yBg(ny * -2.4);
            xLayer(nx * 1.6);
            yLayer(ny * 1.6);
          };
          root.current?.addEventListener("pointermove", onMove);
          ctx.add(() => root.current?.removeEventListener("pointermove", onMove));
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Bản đồ làng nghề Chàng Sơn — chọn một làng nghề để khám phá"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink"
    >
      {/* Nền bản đồ (parallax) */}
      <div ref={bgRef} className="absolute inset-0 scale-[1.06]">
        <Image
          src={cloudinaryAssets.banner.main.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Phủ sắc mực ấm để giống bản đồ cổ, tôn điểm sáng */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_18%,rgba(32,24,15,0.15)_0%,rgba(20,12,6,0.55)_58%,rgba(15,9,5,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,6,0.55)_0%,transparent_28%,transparent_55%,rgba(15,9,5,0.78)_100%)]" />
      </div>

      {/* Sương / lụa trôi nhẹ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-mist absolute -left-[10%] top-[18%] h-56 w-[55%] rounded-full bg-paper/10 blur-3xl" />
        <div
          className="animate-mist absolute right-[-8%] top-[55%] h-48 w-[45%] rounded-full bg-dat/10 blur-3xl"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      {/* Lớp nội dung có parallax ngược chiều */}
      <div ref={layerRef} className="absolute inset-0">
        {/* Đường mòn nối các ải */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={trailRef}
            d={TRAIL_D}
            fill="none"
            stroke="rgba(246,241,231,0.42)"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeDasharray="0.1 3.4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Các điểm chọn làng nghề */}
        {points.map((c) => (
          <MapMarker
            key={c.slug}
            x={c.pos.x}
            y={c.pos.y}
            order={c.order}
            name={c.name}
            accent={c.accent}
            onSelect={() => navigate(`/${c.slug}`)}
          />
        ))}
      </div>

      {/* Tiêu đề */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-6 pt-24 text-center sm:pt-28">
        <p
          data-title
          className="eyebrow mb-3"
          style={{ color: "rgba(246,241,231,0.82)" }}
        >
          {site.name} · Làng nghề Chàng Sơn
        </p>
        <h1
          data-title
          className="mx-auto max-w-3xl font-display text-3xl uppercase leading-[1.04] text-paper drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl"
        >
          Bản đồ làng nghề
        </h1>
        <p
          data-title
          className="mx-auto mt-4 max-w-md text-sm leading-7 text-paper/85 sm:text-base"
        >
          Chọn một làng nghề trên bản đồ để bắt đầu hành trình khám phá.
        </p>
      </div>

      {/* Gợi ý dưới đáy */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center">
        <span className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-paper/65">
          <span className="inline-block h-px w-6 bg-paper/40" />
          Chạm vào một ải để vượt
          <span className="inline-block h-px w-6 bg-paper/40" />
        </span>
      </div>
    </section>
  );
}

type MapMarkerProps = {
  x: number;
  y: number;
  order: string;
  name: string;
  accent: string;
  onSelect: () => void;
};

function MapMarker({ x, y, order, name, accent, onSelect }: MapMarkerProps) {
  return (
    <button
      type="button"
      data-marker
      onClick={onSelect}
      aria-label={`Khám phá ${name}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center outline-none"
    >
      {/* Cụm điểm sáng */}
      <span className="relative flex h-12 w-12 items-center justify-center">
        {/* Vòng pulse */}
        <span
          className="animate-marker-pulse absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 0 2px ${accent}` , background: `${accent}26` }}
        />
        {/* Quầng sáng hover */}
        <span
          className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80 group-focus-visible:opacity-80"
          style={{ background: accent }}
        />
        {/* Lõi */}
        <span
          className="animate-float-soft relative flex h-7 w-7 items-center justify-center rounded-full border border-paper/70 text-[0.62rem] font-semibold text-paper shadow-[0_6px_18px_-6px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125"
          style={{ background: accent }}
        >
          {order}
        </span>
      </span>

      {/* Nhãn tên làng */}
      <span className="mt-2 translate-y-0.5 rounded-full border border-paper/20 bg-ink/55 px-3 py-1 text-xs font-medium tracking-wide text-paper/90 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0 group-hover:border-paper/40 group-hover:bg-ink/75 group-hover:text-paper">
        Làng {name.toLowerCase()}
      </span>
    </button>
  );
}
