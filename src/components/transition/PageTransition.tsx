"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { site } from "@/data/site";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";

type TransitionFn = (href: string) => void;

const PageTransitionContext = createContext<TransitionFn>(() => {});

/** Hook điều hướng kèm hiệu ứng "lướt sóng" trắng mượt khi đổi trang. */
export function usePageTransition() {
  return useContext(PageTransitionContext);
}

/* --- Hình dải sóng --------------------------------------------------- */
const WAVE_W = 130; // bề rộng vạt sóng ở mép (px)
const VH = 1000; // chiều cao viewBox (kéo giãn theo màn hình)
const HUMPS = 5; // số gợn sóng dọc mép

/** Tạo path cho một vạt trắng: cạnh phải thẳng, cạnh trái lượn sóng. */
function buildWavePath() {
  const seg = VH / HUMPS;
  const mid = WAVE_W * 0.5;
  let d = `M ${WAVE_W} 0 L ${WAVE_W} ${VH} L ${mid} ${VH}`;
  for (let i = 0; i < HUMPS; i++) {
    const yMid = VH - (i + 0.5) * seg;
    const yEnd = VH - (i + 1) * seg;
    const ctrlX = i % 2 === 0 ? WAVE_W * 1.5 : -WAVE_W * 0.5;
    d += ` Q ${ctrlX.toFixed(1)} ${yMid.toFixed(1)} ${mid} ${yEnd.toFixed(1)}`;
  }
  return `${d} Z`;
}
const WAVE_D = buildWavePath();

/** Khoảng dịch (px) để vạt sóng nằm trọn ngoài màn. */
function offRight() {
  return (typeof window !== "undefined" ? window.innerWidth : 1920) + 2 * WAVE_W + 80;
}
function offLeft() {
  return -offRight();
}

/**
 * Bao toàn bộ ứng dụng (đặt trong root layout). Một vạt trắng có mép gợn
 * sóng lướt từ phải qua trái: lướt tới đâu che tới đó để đổi route, rồi
 * lướt tiếp khỏi màn để lộ trang mới — một con sóng trắng mượt, liền mạch.
 *
 * Logic & routing không đổi: chỉ bọc thêm hoạt cảnh quanh router.push.
 */
export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef(false);

  const navigate = useCallback<TransitionFn>(
    (href) => {
      if (!href || href === pathname) return;

      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!overlay || !panel || reduce) {
        router.push(href);
        return;
      }

      pendingRef.current = true;
      gsap.killTweensOf([panel, innerRef.current]);
      gsap.set(overlay, { display: "block" });
      gsap.set(panel, { x: offRight() });
      gsap.set(innerRef.current, { autoAlpha: 0, scale: 0.94 });

      gsap
        .timeline()
        .to(panel, { x: 0, duration: 0.72, ease: "power2.inOut" })
        .to(
          innerRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.34, ease: "power2.out" },
          "-=0.4",
        )
        .add(() => router.push(href));
    },
    [pathname, router],
  );

  // Sau khi route mới gắn xong: vạt sóng lướt tiếp khỏi mép trái, lộ trang.
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    window.scrollTo(0, 0);
    gsap.set(overlay, { display: "block" });
    gsap.set(panel, { x: 0 });

    const tl = gsap
      .timeline()
      .to(innerRef.current, {
        autoAlpha: 0,
        duration: 0.28,
        ease: "power1.in",
      })
      .to(
        panel,
        { x: offLeft(), duration: 0.8, ease: "power2.inOut" },
        0.06,
      )
      .set(overlay, { display: "none" });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <PageTransitionContext.Provider value={navigate}>
      {children}

      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{ display: "none" }}
        className="pointer-events-none fixed inset-0 z-[100] hidden overflow-hidden"
      >
        {/* Vạt trắng có mép gợn sóng hai bên */}
        <div
          ref={panelRef}
          className="absolute top-0 h-full"
          style={{ left: -WAVE_W, width: `calc(100% + ${2 * WAVE_W}px)` }}
        >
          {/* Thân đặc ở giữa */}
          <div
            className="absolute inset-y-0 bg-white"
            style={{ left: WAVE_W, right: WAVE_W }}
          />
          {/* Mép sóng bên trái (đầu sóng khi che) */}
          <WaveEdge className="absolute inset-y-0 left-0" />
          {/* Mép sóng bên phải (đuôi sóng khi lộ trang) */}
          <WaveEdge
            className="absolute inset-y-0 right-0"
            style={{ transform: "scaleX(-1)" }}
          />

          {/* Dấu nhận diện mờ, lướt cùng con sóng — dùng đúng logo trên navbar */}
          <div
            ref={innerRef}
            className="absolute inset-y-0 flex flex-col items-center justify-center gap-4"
            style={{ left: WAVE_W, right: WAVE_W }}
          >
            <Image
              src={cloudinaryAssets.logo.transparent.src}
              alt={site.name}
              width={320}
              height={140}
              priority
              className="h-24 w-auto object-contain sm:h-28"
            />
            <p className="font-display text-2xl tracking-wide text-son">
              {site.name}
            </p>
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}

function WaveEdge({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={{ width: WAVE_W, ...style }}
      viewBox={`0 0 ${WAVE_W} ${VH}`}
      preserveAspectRatio="none"
      fill="#ffffff"
      aria-hidden="true"
    >
      <path d={WAVE_D} />
    </svg>
  );
}
