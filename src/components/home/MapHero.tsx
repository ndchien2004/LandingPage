"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { getCraft } from "@/data/crafts";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { usePageTransition } from "@/components/transition/PageTransition";

gsap.registerPlugin(useGSAP);

/**
 * KỸ THUẬT: Image Hotspotting bằng SVG viewBox.
 *
 * Ảnh bản đồ và các vùng click (hotspot) nằm trong CÙNG một <svg viewBox>. viewBox =
 * đúng kích thước pixel của ảnh gốc, nên toạ độ hotspot được khai báo trong chính hệ toạ
 * độ của ảnh. `preserveAspectRatio="...slice"` (cover) scale ảnh VÀ hotspot bằng cùng một
 * phép biến đổi → chúng không bao giờ trôi khỏi nhau, trên mọi kích thước màn hình, mà vẫn
 * phủ kín khung (không hở dải nền trên/dưới). Không còn object-fill, STRETCH, CROP_TOP.
 *
 * 👉 Khi đổi ảnh: cập nhật src trong cloudinaryAssets + đổi VB_* cho khớp pixel ảnh mới.
 */
const BANNER_SRC = cloudinaryAssets.map.banner.src;
const BANNER_MOBILE_SRC = cloudinaryAssets.map.bannerMobile.src;

/** Kích thước pixel ảnh gốc = viewBox. Desktop ngang, mobile dọc. */
const VB_DESKTOP = { w: 2560, h: 1086 };
const VB_MOBILE = { w: 1429, h: 2561 };

/**
 * Vùng chọn từng làng nghề — toạ độ theo % khung ảnh (cx,cy: tâm; d: đường kính theo %
 * CHIỀU RỘNG). Chuyển sang pixel viewBox lúc render. Emblem trên ảnh là hình TRÒN thật
 * (ảnh không còn bị kéo méo) nên vòng highlight là circle 1:1.
 * 👉 Căn tay các số này cho khớp vòng tròn emblem trên ảnh thật.
 */
const ZONES = [
  { slug: "nghe-moc", cx: 23.9, cy: 33, d: 13 }, // Mộc (trái – trên)
  { slug: "nghe-son", cx: 21.9, cy: 72.0, d: 11.5 }, // Sơn (trái – dưới)
  { slug: "nghe-quat", cx: 50.1, cy: 53.2, d: 15 }, // Quạt (vòng vàng giữa)
  { slug: "nghe-tre", cx: 76.6, cy: 35.0, d: 13 }, // Tre (phải)
];

/** Bản dọc cho điện thoại (ảnh 1429×2561). Toạ độ ước lượng — căn tay lại cho khớp. */
const ZONES_MOBILE = [
  { slug: "nghe-quat", cx: 32, cy: 21, d: 40 }, // Quạt (vòng vàng, trên cùng)
  { slug: "nghe-moc", cx: 73, cy: 46, d: 32 }, // Mộc (phải – giữa)
  { slug: "nghe-son", cx: 33, cy: 62, d: 32 }, // Sơn (trái – dưới)
  { slug: "nghe-tre", cx: 66, cy: 85, d: 32 }, // Tre (dưới cùng)
];

type Zone = { slug: string; cx: number; cy: number; d: number };

function withCraft(list: Zone[]) {
  return list
    .map((z) => ({ ...z, craft: getCraft(z.slug) }))
    .filter((z): z is Zone & { craft: NonNullable<ReturnType<typeof getCraft>> } =>
      Boolean(z.craft),
    );
}

const zones = withCraft(ZONES);
const zonesMobile = withCraft(ZONES_MOBILE);

export function MapHero() {
  const root = useRef<HTMLElement>(null);
  const mobileSvgRef = useRef<SVGSVGElement>(null);
  const desktopSvgRef = useRef<SVGSVGElement>(null);
  const navigate = usePageTransition();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      // Fade-in nhẹ (chỉ opacity → hotspot luôn nhận click). Áp cho cả 2 bản.
      gsap.from([mobileSvgRef.current, desktopSvgRef.current], {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Bản đồ làng nghề Chàng Sơn — chọn một làng nghề để khám phá"
      className="relative h-[100svh] min-h-[480px] w-full overflow-hidden bg-ink"
    >
      {/* MOBILE (bản dọc) */}
      <MapSvg
        ref={mobileSvgRef}
        className="sm:hidden"
        src={BANNER_MOBILE_SRC}
        vb={VB_MOBILE}
        zones={zonesMobile}
        par="xMidYMid"
        onSelect={(slug) => navigate(`/${slug}`)}
      />
      {/* DESKTOP / TABLET (bản ngang) — neo mép TRÊN (YMin) để tấm biển tiêu đề luôn
          hiện đủ dưới navbar, chỉ crop bớt ở đáy. */}
      <MapSvg
        ref={desktopSvgRef}
        className="hidden sm:block"
        src={BANNER_SRC}
        vb={VB_DESKTOP}
        zones={zones}
        par="xMidYMin"
        onSelect={(slug) => navigate(`/${slug}`)}
      />
    </section>
  );
}

type MapSvgProps = {
  className?: string;
  src: string;
  vb: { w: number; h: number };
  zones: (Zone & { craft: NonNullable<ReturnType<typeof getCraft>> })[];
  /** Căn ảnh khi cover: "xMidYMin" ghim mép trên, "xMidYMid" căn giữa. */
  par?: "xMidYMid" | "xMidYMin";
  onSelect: (slug: string) => void;
};

function MapSvg({ className, src, vb, zones, par = "xMidYMid", onSelect, ref }: MapSvgProps & {
  ref?: React.Ref<SVGSVGElement>;
}) {
  const preserve = `${par} slice`;
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${vb.w} ${vb.h}`}
      preserveAspectRatio={preserve}
      // Chừa đúng chiều cao navbar (h-16 / sm:h-20) để map không bị che mép trên.
      className={`absolute inset-x-0 bottom-0 top-16 h-auto w-full select-none sm:top-20 ${className ?? ""}`}
    >
      {/* Ảnh nằm TRONG svg → cùng phép cover với hotspot, không bao giờ lệch */}
      <image
        href={src}
        x={0}
        y={0}
        width={vb.w}
        height={vb.h}
        preserveAspectRatio={preserve}
      />
      {zones.map((z) => (
        <MapZone
          key={z.slug}
          cx={(z.cx / 100) * vb.w}
          cy={(z.cy / 100) * vb.h}
          r={(z.d / 100 / 2) * vb.w}
          name={z.craft.name}
          onSelect={() => onSelect(z.slug)}
        />
      ))}
    </svg>
  );
}

type MapZoneProps = {
  cx: number;
  cy: number;
  r: number;
  name: string;
  onSelect: () => void;
};

function MapZone({ cx, cy, r, name, onSelect }: MapZoneProps) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`Khám phá ${name}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group cursor-pointer outline-none [transform-box:fill-box] [transform-origin:center]"
    >
      {/* Vùng click: fill trong suốt vẫn bắt được con trỏ (khác fill="none") */}
      <circle cx={cx} cy={cy} r={r} fill="transparent" />

      {/* Sóng sáng lan nhẹ ra ngoài (chỉ hiện khi hover/focus) */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth={2}
        opacity={0}
        className="pointer-events-none [transform-box:fill-box] [transform-origin:center] group-hover:[animation:zone-ping_1.9s_ease-out_infinite] group-focus-visible:[animation:zone-ping_1.9s_ease-out_infinite]"
      />

      {/* Vòng highlight ôm sát emblem: viền vàng đồng + quầng sáng */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth={3}
        opacity={0}
        className="pointer-events-none scale-90 opacity-0 transition-all duration-300 ease-out [transform-box:fill-box] [transform-origin:center] [filter:drop-shadow(0_0_14px_rgba(201,162,75,0.6))] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
      />
    </g>
  );
}
