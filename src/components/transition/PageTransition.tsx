"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { site } from "@/data/site";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";

type TransitionFn = (href: string) => void;

const PageTransitionContext = createContext<TransitionFn>(() => {});

/** Hook điều hướng kèm hiệu ứng "quạt xòe" khi đổi trang. */
export function usePageTransition() {
  return useContext(PageTransitionContext);
}

/* --- Cấu hình chiếc quạt -------------------------------------------- */
const BLADES = 14; // số nan quạt
const ARC = 200; // tổng góc xòe (độ) — >180° để phủ kín hai góc trên
const STEP = ARC / BLADES; // bước góc giữa hai nan
const SPREAD = 1.85; // hệ số chồm mép nan (×½ bước) → các nan đè nhau, không hở khe

/** Góc target của nan i (đo từ trục đáy–giữa, 0° = thẳng đứng lên, + sang phải). */
function bladeAngle(i: number) {
  return -ARC / 2 + (i + 0.5) * STEP;
}

/**
 * Góc GẬP ban đầu của nan i: mọi nan dồn chồng về biên trái. Chỉ phụ thuộc chỉ số nan
 * (không phụ thuộc kích thước màn), nên dùng được cho cả pha che lẫn pha lộ.
 */
function foldRotation(i: number) {
  return -(i + 0.5) * STEP;
}

/** Path một nan quạt: sector mảnh từ trục (px,py) bán kính r, vẽ ở góc target của nó. */
function bladePath(px: number, py: number, r: number, angleDeg: number) {
  const half = (STEP / 2) * SPREAD;
  const a0 = ((angleDeg - half) * Math.PI) / 180;
  const a1 = ((angleDeg + half) * Math.PI) / 180;
  const x0 = px + r * Math.sin(a0);
  const y0 = py - r * Math.cos(a0);
  const x1 = px + r * Math.sin(a1);
  const y1 = py - r * Math.cos(a1);
  return `M ${px} ${py} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
}

type Dims = { w: number; h: number };

/**
 * Bao toàn bộ ứng dụng (đặt trong root layout). Khi đổi route, một chiếc quạt giấy gồm
 * nhiều nan XÒE ra từ trục đáy–giữa theo hình cung che kín màn hình, đổi trang, rồi GẬP
 * lại để lộ trang mới. Logo hiện ở giữa quạt. Logic & routing không đổi: chỉ bọc thêm
 * hoạt cảnh quanh router.push.
 */
export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const bladesRef = useRef<SVGPathElement[]>([]);
  const pendingRef = useRef(false);

  const [dims, setDims] = useState<Dims>({ w: 1920, h: 1080 });

  // Đo viewport (client) và dựng lại khi resize — path nan phụ thuộc kích thước thật.
  useLayoutEffect(() => {
    const measure = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { px, py, radius } = useMemo(() => {
    const cx = dims.w / 2;
    const cy = dims.h; // trục ở đáy–giữa
    // Bán kính vượt góc xa nhất (góc trên) → nan luôn phủ tới mép màn.
    const r = 1.15 * Math.hypot(dims.w / 2, dims.h);
    return { px: cx, py: cy, radius: r };
  }, [dims]);

  const svgOrigin = `${px} ${py}`;

  const blades = useMemo(
    () =>
      Array.from({ length: BLADES }, (_, i) =>
        bladePath(px, py, radius, bladeAngle(i)),
      ),
    [px, py, radius],
  );

  const navigate = useCallback<TransitionFn>(
    (href) => {
      if (!href || href === pathname) return;

      const overlay = overlayRef.current;
      const paths = bladesRef.current.filter(Boolean);
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!overlay || paths.length === 0 || reduce) {
        router.push(href);
        return;
      }

      pendingRef.current = true;
      gsap.killTweensOf(paths);
      gsap.killTweensOf(innerRef.current);

      gsap.set(overlay, { display: "block" });
      // Gập: mọi nan dồn về biên trái.
      gsap.set(paths, {
        rotation: (i: number) => foldRotation(i),
        svgOrigin,
      });
      gsap.set(innerRef.current, { autoAlpha: 0, scale: 0.9 });

      gsap
        .timeline()
        // Xòe: từng nan mở ra tới góc target (rotation 0), stagger trái→phải.
        .to(paths, {
          rotation: 0,
          svgOrigin,
          duration: 0.62,
          ease: "power3.out",
          stagger: 0.028,
        })
        .to(
          innerRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.32, ease: "power2.out" },
          "-=0.34",
        )
        .add(() => router.push(href));
    },
    [pathname, router, svgOrigin],
  );

  // Sau khi route mới gắn xong: gập quạt về biên trái để lộ trang mới.
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;

    const overlay = overlayRef.current;
    const paths = bladesRef.current.filter(Boolean);
    if (!overlay || paths.length === 0) return;

    window.scrollTo(0, 0);
    gsap.set(overlay, { display: "block" });
    gsap.set(paths, { rotation: 0, svgOrigin });

    const tl = gsap
      .timeline()
      .to(innerRef.current, {
        autoAlpha: 0,
        duration: 0.24,
        ease: "power1.in",
      })
      .to(
        paths,
        {
          rotation: (i: number) => foldRotation(i),
          svgOrigin,
          duration: 0.52,
          ease: "power3.in",
          stagger: 0.022,
        },
        0.04,
      )
      .set(overlay, { display: "none" });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="fan-paper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-paper)" />
              <stop offset="100%" stopColor="var(--color-paper-2)" />
            </linearGradient>
          </defs>
          {blades.map((d, i) => (
            <path
              key={i}
              ref={(el) => {
                if (el) bladesRef.current[i] = el;
              }}
              d={d}
              fill="url(#fan-paper)"
              stroke="var(--color-gold)"
              strokeWidth={Math.max(1, dims.w / 900)}
              strokeOpacity={0.55}
            />
          ))}
        </svg>

        {/* Dấu nhận diện ở giữa quạt — dùng đúng logo trên navbar */}
        <div
          ref={innerRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <Image
            src={cloudinaryAssets.logo.transparent.src}
            alt={site.name}
            width={800}
            height={350}
            priority
            className="h-36 w-auto object-contain sm:h-44"
          />
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}
