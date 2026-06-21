"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Độ trễ khởi đầu (giây). */
  delay?: number;
  /** Khoảng dịch chuyển ban đầu theo trục y (px). */
  y?: number;
  /** Animation lần lượt cho các con trực tiếp. */
  stagger?: boolean;
  as?: React.ElementType;
};

/**
 * Bọc nội dung để hiện dần khi cuộn tới — dùng GSAP + ScrollTrigger.
 * Tôn trọng prefers-reduced-motion thông qua gsap.matchMedia.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  stagger = false,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const reduced = context.conditions?.reduced;
          const targets = stagger
            ? (ref.current?.children ?? [])
            : ref.current;

          if (reduced) {
            gsap.set(targets, { opacity: 1, y: 0 });
            return;
          }

          gsap.fromTo(
            targets,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              delay,
              stagger: stagger ? 0.12 : 0,
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                once: true,
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
