"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { heroSlides } from "@/data/heroSlides";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const AUTOPLAY_MS = 6000;

/** Nền cinematic placeholder theo màu nghề (thay bằng ảnh thật sau này). */
function bgStyle(accent: string): CSSProperties {
  return {
    backgroundColor: "#1a120b",
    backgroundImage: `radial-gradient(120% 90% at 50% 22%, ${accent}e6 0%, ${accent}80 38%, transparent 72%), linear-gradient(165deg, #2c1d12 0%, ${accent}b3 55%, #150e08 100%)`,
  };
}

export function HeroSlider() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const count = heroSlides.length;

  const goTo = useCallback((i: number) => setActive((i + count) % count), [count]);
  const next = useCallback(() => setActive((a) => (a + 1) % count), [count]);
  const prev = useCallback(() => setActive((a) => (a - 1 + count) % count), [count]);

  // Tự động chạy lần lượt (tắt nếu người dùng giảm chuyển động)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, next]);

  // Điều hướng bằng phím mũi tên
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Animation cho slide đang active: chữ hiện dần + Ken Burns
  useGSAP(
    () => {
      const slide = root.current?.querySelector<HTMLElement>(
        `[data-slide="${active}"]`,
      );
      if (!slide) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const items = slide.querySelectorAll("[data-anim]");

          if (ctx.conditions?.reduced) {
            gsap.set(items, { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            items,
            { y: 32, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              delay: 0.25,
            },
          );
        },
      );

      return () => mm.revert();
    },
    { dependencies: [active], scope: root },
  );

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="Giới thiệu làng nghề Chàng Sơn"
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink"
    >
      {heroSlides.map((slide, i) => {
        const isIntro = i === 0;

        return (
        <div
          key={slide.key}
          data-slide={i}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1100ms] ease-out",
            i === active
              ? "z-10 opacity-100"
              : "pointer-events-none z-0 opacity-0",
          )}
        >
          {/* Nền tĩnh (không tự phóng to) */}
          <div className="absolute inset-0" style={bgStyle(slide.accent)}>
            <Image
              src={cloudinaryAssets.banner.main.src}
              alt=""
              fill
              priority={isIntro}
              sizes="100vw"
              className={cn(
                "object-cover",
                isIntro ? "opacity-95" : "opacity-55 mix-blend-soft-light",
              )}
            />
          </div>

          {/* Hoa văn nan + quạt mờ */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(112deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 26px)",
            }}
          />
          {!isIntro && (
            <FanGraphic className="absolute left-1/2 top-[42%] h-[78%] -translate-x-1/2 -translate-y-1/2 opacity-80" />
          )}

          {/* Lớp tối tăng tương phản chữ */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,6,0.45)_0%,rgba(20,12,6,0.2)_42%,rgba(20,12,6,0.68)_100%)]" />

          {/* Nội dung */}
          <div className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-6 text-center">
            <div>
              <p
                data-anim
                className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-paper/85 sm:text-sm"
              >
                {slide.eyebrow}
              </p>
              <h1 className="font-display text-4xl uppercase leading-[1.02] text-paper drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl">
                <span data-anim className="block">
                  {slide.title}
                </span>
              </h1>
              <p
                data-anim
                className="mx-auto mt-6 max-w-2xl text-base leading-8 text-paper/90 sm:text-lg"
              >
                {slide.subtitle}
              </p>
              <div data-anim className="mt-9">
                <Link
                  href={slide.href}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-son px-8 text-sm font-medium text-paper shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] transition hover:bg-son-deep"
                >
                  {slide.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        );
      })}

      {/* Nút điều hướng trái / phải — wedge tam giác dán sát mép màn hình */}
      <button
        type="button"
        onClick={prev}
        aria-label="Slide trước"
        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
        className="absolute left-0 top-1/2 z-20 flex h-16 w-8 -translate-y-1/2 items-center justify-start bg-ink/45 pl-1.5 text-paper/85 backdrop-blur-sm transition-colors duration-300 hover:bg-son hover:text-paper sm:h-28 sm:w-12 sm:pl-2.5"
      >
        <ChevronIcon className="h-4 w-4 rotate-180 sm:h-5 sm:w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Slide kế tiếp"
        style={{ clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }}
        className="absolute right-0 top-1/2 z-20 flex h-16 w-8 -translate-y-1/2 items-center justify-end bg-ink/45 pr-1.5 text-paper/85 backdrop-blur-sm transition-colors duration-300 hover:bg-son hover:text-paper sm:h-28 sm:w-12 sm:pr-2.5"
      >
        <ChevronIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Chấm chỉ báo */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Tới slide ${i + 1}`}
            aria-current={i === active}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === active
                ? "w-9 bg-paper"
                : "w-3 bg-paper/40 hover:bg-paper/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Quạt cách điệu (nan tỏa) làm họa tiết mờ phía sau chữ. */
function FanGraphic({ className }: { className?: string }) {
  const blades = Array.from({ length: 21 });
  const cx = 200;
  const cy = 215;
  const r = 205;
  return (
    <svg
      viewBox="0 0 400 230"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g stroke="white" strokeOpacity="0.09" strokeWidth="1">
        {blades.map((_, i) => {
          const deg = 200 + (i * 140) / (blades.length - 1); // 200° → 340°
          const a = (deg * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + r * Math.cos(a)}
              y2={cy + r * Math.sin(a)}
            />
          );
        })}
      </g>
      <path
        d="M52 118 A 175 175 0 0 1 348 118"
        stroke="white"
        strokeOpacity="0.1"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx={cx} cy={cy} r="5" fill="white" fillOpacity="0.14" />
    </svg>
  );
}
