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
const HALF = (STEP / 2) * SPREAD; // nửa góc mở của MỘT nan (độ)

/** Góc target của nan i (đo từ trục đáy–giữa, 0° = thẳng đứng lên, + sang phải). */
function bladeAngle(i: number) {
  return -ARC / 2 + (i + 0.5) * STEP;
}

type Dims = { w: number; h: number };

/**
 * Bao toàn bộ ứng dụng (đặt trong root layout). Khi đổi route, một chiếc quạt giấy gồm
 * nhiều nan XÒE ra từ trục đáy–giữa theo hình cung che kín màn hình, đổi trang, rồi GẬP
 * lại để lộ trang mới. Logo hiện ở giữa quạt.
 *
 * Mỗi nan là một <div> cắt hình nêm bằng clip-path và xoay bằng CSS transform quanh trục
 * đáy–giữa — transform trên DOM được GPU composite nên mượt trên điện thoại (bản cũ xoay
 * <path> SVG buộc trình duyệt raster lại cả màn mỗi frame → giật trên máy yếu).
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
  const bladesRef = useRef<HTMLDivElement[]>([]);
  const pendingRef = useRef(false);

  const [dims, setDims] = useState<Dims>({ w: 1920, h: 1080 });

  // Đo viewport (client) và dựng lại khi resize — kích thước nan phụ thuộc màn thật.
  useLayoutEffect(() => {
    const measure = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { radius, bladeW } = useMemo(() => {
    // Bán kính vượt góc xa nhất (góc trên) → nan luôn phủ tới mép màn; mép ngoài của
    // nêm là đường thẳng nên nhân dư để dây cung vẫn nằm ngoài màn.
    const r = 1.2 * Math.hypot(dims.w / 2, dims.h);
    return { radius: r, bladeW: 2 * r * Math.tan((HALF * Math.PI) / 180) };
  }, [dims]);

  const navigate = useCallback<TransitionFn>(
    (href) => {
      if (!href || href === pathname) return;

      const overlay = overlayRef.current;
      const blades = bladesRef.current.filter(Boolean);
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!overlay || blades.length === 0 || reduce) {
        router.push(href);
        return;
      }

      // Màn cảm ứng: nhịp ngắn hơn cho cảm giác gọn, đỡ chắn thao tác.
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const dur = coarse ? 0.48 : 0.62;
      const stag = coarse ? 0.02 : 0.028;

      pendingRef.current = true;
      gsap.killTweensOf(blades);
      gsap.killTweensOf(innerRef.current);

      gsap.set(overlay, { display: "block" });
      // Gập: mọi nan dồn chồng về biên trái.
      gsap.set(blades, { rotation: -ARC / 2 });
      gsap.set(innerRef.current, { autoAlpha: 0, scale: 0.9 });

      // router.push chỉ được gọi một lần dù timeline hay fallback chạy trước.
      let pushed = false;
      const push = () => {
        if (pushed) return;
        pushed = true;
        router.push(href);
      };

      const tl = gsap
        .timeline()
        // Xòe: từng nan mở ra tới góc target, stagger trái→phải.
        .to(blades, {
          rotation: (i: number) => bladeAngle(i),
          duration: dur,
          ease: "power3.out",
          stagger: stag,
        })
        .to(
          innerRef.current,
          { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" },
          "-=0.3",
        )
        .add(push);

      // GSAP chạy bằng requestAnimationFrame — bị trình duyệt throttle/dừng khi tab ẩn
      // hoặc máy tiết kiệm pin (hay gặp trên điện thoại) → timeline đứng im, quạt che màn
      // mà không bao giờ đổi trang. Fallback: quá hạn thì ép timeline về cuối và vẫn push.
      window.setTimeout(() => {
        tl.progress(1, false);
        push();
      }, 1200);
    },
    [pathname, router],
  );

  // Sau khi route mới gắn xong: gập quạt về biên trái để lộ trang mới.
  useEffect(() => {
    if (!pendingRef.current) return;
    pendingRef.current = false;

    const overlay = overlayRef.current;
    const blades = bladesRef.current.filter(Boolean);
    if (!overlay || blades.length === 0) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const dur = coarse ? 0.42 : 0.52;
    const stag = coarse ? 0.016 : 0.022;

    window.scrollTo(0, 0);
    gsap.set(overlay, { display: "block" });
    gsap.set(blades, { rotation: (i: number) => bladeAngle(i) });

    const tl = gsap
      .timeline()
      .to(innerRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power1.in",
      })
      .to(
        blades,
        {
          rotation: -ARC / 2,
          duration: dur,
          ease: "power3.in",
          stagger: stag,
        },
        0.04,
      )
      .set(overlay, { display: "none" });

    // Cùng lý do fallback ở navigate(): nếu rAF bị throttle thì ép gập quạt
    // ngay để không che màn hình vô hạn.
    const fallback = window.setTimeout(() => tl.progress(1, false), 1100);

    return () => {
      window.clearTimeout(fallback);
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
        className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      >
        {Array.from({ length: BLADES }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) bladesRef.current[i] = el;
            }}
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              height: radius,
              width: bladeW,
              marginLeft: -bladeW / 2,
              transformOrigin: "50% 100%",
              transform: `rotate(${-ARC / 2}deg)`,
              // Nêm nhọn về trục đáy–giữa; mép ngoài (trên) nằm ngoài màn nên thẳng cũng được.
              clipPath: "polygon(50% 100%, 0 0, 100% 0)",
              background:
                "linear-gradient(to bottom, var(--color-paper), var(--color-paper-2))",
              willChange: "transform",
            }}
          >
            {/* Gân quạt: đường viền vàng dọc hai mép nan (bị clip một nửa → nét mảnh) */}
            {[-HALF, HALF].map((a) => (
              <div
                key={a}
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: 0,
                  width: 2,
                  height: "100%",
                  marginLeft: -1,
                  transformOrigin: "50% 100%",
                  transform: `rotate(${a}deg)`,
                  background: "var(--color-gold)",
                  opacity: 0.55,
                }}
              />
            ))}
          </div>
        ))}

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
