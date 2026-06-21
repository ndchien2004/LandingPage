"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Craft } from "@/data/crafts";

gsap.registerPlugin(useGSAP);

export function LevelCard({ craft }: { craft: Craft }) {
  const root = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const card = root.current;
      if (!card) return;

      const image = card.querySelector<HTMLElement>("[data-img]");
      const reveal = card.querySelector<HTMLElement>("[data-reveal]");
      const glow = card.querySelector<HTMLElement>("[data-glow]");
      const inner = card.querySelector<HTMLElement>("[data-inner]");

      const mm = gsap.matchMedia();

      // Chỉ bật hiệu ứng hover trên thiết bị có con trỏ và không tắt chuyển động
      mm.add(
        "(hover: hover) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(reveal, { autoAlpha: 0, y: 10 });

          const xTo = gsap.quickTo(inner, "rotationY", {
            duration: 0.6,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(inner, "rotationX", {
            duration: 0.6,
            ease: "power3.out",
          });

          const enter = () => {
            gsap.to(card, { y: -10, duration: 0.5, ease: "power3.out" });
            gsap.to(image, { scale: 1.08, duration: 0.8, ease: "power3.out" });
            gsap.to(glow, { autoAlpha: 1, duration: 0.5 });
            gsap.to(reveal, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
          };

          const leave = () => {
            gsap.to(card, { y: 0, duration: 0.5, ease: "power3.out" });
            gsap.to(image, { scale: 1, duration: 0.8, ease: "power3.out" });
            gsap.to(glow, { autoAlpha: 0, duration: 0.5 });
            gsap.to(reveal, { autoAlpha: 0, y: 10, duration: 0.4 });
            xTo(0);
            yTo(0);
          };

          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            xTo(px * 8);
            yTo(py * -8);
          };

          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointerleave", leave);
          card.addEventListener("pointermove", move);
          return () => {
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointerleave", leave);
            card.removeEventListener("pointermove", move);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Link
      ref={root}
      href={`/${craft.slug}`}
      data-gate
      aria-label={`Khám phá ${craft.name}`}
      className="gsap-prep group relative flex flex-1 [perspective:1200px]"
    >
      <div
        data-inner
        className="relative flex w-full flex-col overflow-hidden rounded-[1.4rem] border border-line bg-paper/70 shadow-[var(--shadow-soft)] backdrop-blur-sm [transform-style:preserve-3d]"
      >
        {/* Glow viền theo màu nghề */}
        <div
          data-glow
          className="pointer-events-none absolute inset-0 rounded-[1.4rem] opacity-0"
          style={{ boxShadow: `inset 0 0 0 1.5px ${craft.accent}, 0 28px 60px -30px ${craft.accent}` }}
        />

        {/* Khu ảnh placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:flex-1">
          <div
            data-img
            className="absolute inset-0"
            style={{
              backgroundColor: "var(--color-paper-3)",
              backgroundImage: `radial-gradient(120% 120% at 70% 10%, ${craft.accent}33 0%, transparent 55%), repeating-linear-gradient(118deg, ${craft.accent}1f 0 1px, transparent 1px 18px)`,
            }}
          />
          {/* Số ải */}
          <span
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper/85 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.2em]"
            style={{ color: craft.accent }}
          >
            Ải {craft.order}
          </span>
          {/* Dấu mở rộng */}
          <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-paper/85 text-ink-soft transition group-hover:bg-son group-hover:text-paper">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Nội dung */}
        <div className="relative flex flex-col gap-2 p-5">
          <p
            className="text-[0.72rem] uppercase tracking-[0.2em]"
            style={{ color: craft.accent }}
          >
            {craft.kicker}
          </p>
          <h3 className="font-display text-2xl leading-tight text-ink">
            {craft.name}
          </h3>

          {/* Mô tả hiện khi hover (desktop) / luôn hiện (mobile) */}
          <div data-reveal>
            <p className="text-sm leading-6 text-muted">{craft.cardDescription}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: craft.accent }}>
              Bắt đầu khám phá
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
