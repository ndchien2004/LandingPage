"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { crafts } from "@/data/crafts";
import { site } from "@/data/site";
import { AnimatedBackground } from "./AnimatedBackground";
import { LevelCard } from "./LevelCard";

gsap.registerPlugin(useGSAP);

export function HeroLevelSelection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduced) {
            gsap.set("[data-hero] > *, [data-gate], [data-hint]", {
              autoAlpha: 1,
              y: 0,
            });
            return;
          }

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.fromTo(
            "[data-hero] > *",
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.12 },
            0.15,
          )
            .fromTo(
              "[data-windpath]",
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.6 },
              "-=0.5",
            )
            .fromTo(
              "[data-gate]",
              { y: 64, autoAlpha: 0, rotate: -2.5 },
              {
                y: 0,
                autoAlpha: 1,
                rotate: 0,
                duration: 1,
                stagger: 0.13,
                ease: "power4.out",
              },
              "-=0.35",
            )
            .fromTo(
              "[data-hint]",
              { y: 10, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6 },
              "-=0.5",
            );
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-8">
        {/* Đệm cho header cố định */}
        <div className="h-20 shrink-0 sm:h-24" />

        {/* Khối tiêu đề */}
        <div data-hero className="mx-auto max-w-3xl pt-4 text-center sm:pt-6">
          <p className="gsap-prep eyebrow mb-4 flex items-center justify-center gap-3">
            <span className="inline-block h-px w-8 bg-son/50" />
            Hành trình khám phá làng nghề Chàng Sơn
            <span className="inline-block h-px w-8 bg-son/50" />
          </p>
          <h1 className="gsap-prep font-display text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
            {site.name}
          </h1>
          <p className="gsap-prep mx-auto mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Mỗi nghề là một “ải” để bước vào — quạt, mộc, sơn và tre. Chọn một
            cánh cổng, và để gió dẫn bạn về với làng.
          </p>
          <div className="gsap-prep mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/du-an"
              className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-paper/70 px-6 text-sm font-medium text-ink backdrop-blur-sm transition hover:border-son hover:text-son"
            >
              Tìm hiểu dự án
            </Link>
            <span className="text-sm text-muted">
              hoặc chọn một ải bên dưới để bắt đầu
            </span>
          </div>
        </div>

        {/* Sân khấu 4 ải */}
        <div className="relative flex-1 py-8 sm:py-10">
          {/* Luồng gió nối các ải (desktop) */}
          <svg
            data-windpath
            className="gsap-prep pointer-events-none absolute left-0 top-1/2 hidden w-full -translate-y-[60%] lg:block"
            viewBox="0 0 1200 60"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M20 40 C 220 5, 380 5, 600 35 S 980 5, 1180 30"
              stroke="#b23a2e"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              strokeDasharray="2 10"
              strokeLinecap="round"
              className="animate-drift"
            />
          </svg>

          <div className="grid h-full grid-cols-2 items-stretch gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {crafts.map((craft) => (
              <LevelCard key={craft.slug} craft={craft} />
            ))}
          </div>
        </div>

        {/* Gợi ý cuộn */}
        <div
          data-hint
          className="gsap-prep flex shrink-0 items-center justify-center gap-2 pb-6 text-xs uppercase tracking-[0.22em] text-muted"
        >
          <span>Chàng Sơn — Thạch Thất, Hà Nội</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>{site.tagline}</span>
        </div>
      </div>
    </section>
  );
}
