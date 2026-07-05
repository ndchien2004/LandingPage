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
 * độ của ảnh. Dù dùng `slice` (cover/crop) hay `none` (kéo khít), browser áp CÙNG một phép
 * biến đổi cho ảnh VÀ hotspot → chúng KHÔNG BAO GIỜ trôi khỏi nhau, trên mọi kích thước
 * màn hình / độ phân giải. (Toạ độ ring khai trong hệ pixel của ảnh nên là bất biến.)
 *
 * Desktop dùng `none`: ép ảnh khít cả chiều rộng LẪN chiều cao của khung → hiện TRỌN tấm
 * bản đồ (kể cả mép/khung dưới), không bị tràn xuống ngoài màn. Đánh đổi: ảnh hơi nén dọc
 * (emblem thành elip nhẹ) — nhưng ring cũng nén y hệt nên vẫn ôm đúng từng làng nghề.
 *
 * 👉 Khi đổi ảnh: cập nhật src trong cloudinaryAssets + đổi VB_* cho khớp pixel ảnh mới.
 */
const BANNER_SRC = cloudinaryAssets.map.banner.src;
const BANNER_MOBILE_SRC = cloudinaryAssets.map.bannerMobile.src;

/** Kích thước pixel ảnh gốc = viewBox. Desktop ngang, mobile dọc. */
const VB_DESKTOP = { w: 2752, h: 1536 };
const VB_MOBILE = { w: 768, h: 1376 };

/**
 * Vùng chọn từng làng nghề — toạ độ theo % khung ảnh (cx,cy: tâm; d: đường kính theo %
 * CHIỀU RỘNG). Chuyển sang pixel viewBox lúc render. Emblem trên ảnh là hình TRÒN thật
 * (ảnh không còn bị kéo méo) nên vòng highlight là circle 1:1.
 * 👉 Căn tay các số này cho khớp vòng tròn emblem trên ảnh thật.
 *
 * Ảnh bản đồ desktop mới (2752×1536) vẽ 3 làng nghề: Mộc (trên–trái),
 * Quạt (vòng vàng giữa), Tre (trên–phải).
 */
const ZONES = [
  { slug: "nghe-moc", cx: 22.7, cy: 28, d: 14 }, // Mộc (medallion gỗ, trên – trái)
  { slug: "nghe-quat", cx: 50, cy: 49.9, d: 18 }, // Quạt (vòng vàng phát sáng, giữa)
  { slug: "nghe-tre", cx: 80, cy: 29, d: 14 }, // Tre (medallion tre, trên – phải)
];

/**
 * Bản dọc cho điện thoại (ảnh 768×1376) — bản mới chỉ còn 3 làng (bỏ Sơn):
 * Quạt (trên – trái), Mộc (giữa – phải), Tre (dưới – phải).
 */
const ZONES_MOBILE = [
  { slug: "nghe-quat", cx: 27, cy: 22, d: 34 }, // Quạt (vòng vàng, trên – trái)
  { slug: "nghe-moc", cx: 73, cy: 42, d: 30 }, // Mộc (medallion gỗ, giữa – phải)
  { slug: "nghe-tre", cx: 74, cy: 83, d: 30 }, // Tre (medallion tre, dưới – phải)
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
      {/* DESKTOP / TABLET (bản ngang) — `none`: ép khít cả ngang lẫn dọc để hiện TRỌN
          khung bản đồ (không tràn đáy ra ngoài màn). */}
      <MapSvg
        ref={desktopSvgRef}
        className="hidden sm:block"
        src={BANNER_SRC}
        vb={VB_DESKTOP}
        zones={zones}
        par="none"
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
  /**
   * Cách khít ảnh vào khung:
   * - "none": kéo khít cả 2 chiều (hiện trọn ảnh, có thể méo nhẹ).
   * - "xMidYMin"/"xMidYMid": cover/crop, ghim mép trên / căn giữa.
   */
  par?: "xMidYMid" | "xMidYMin" | "none";
  onSelect: (slug: string) => void;
};

function MapSvg({ className, src, vb, zones, par = "xMidYMid", onSelect, ref }: MapSvgProps & {
  ref?: React.Ref<SVGSVGElement>;
}) {
  const preserve = par === "none" ? "none" : `${par} slice`;
  return (
    // Wrapper (block thường) định KHUNG = từ dưới navbar (top-16 = chiều cao navbar) tới đáy màn.
    // svg lấp đầy khung này bằng h-full → preserveAspectRatio mới thực sự quyết định cách
    // khít ảnh. (Nếu để h-auto trên svg, nó tự lấy chiều cao theo tỉ lệ ảnh và `none` vô tác
    // dụng → đáy ảnh tràn ra ngoài màn.)
    <div
      className={`absolute inset-x-0 bottom-0 top-16 select-none ${className ?? ""}`}
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${vb.w} ${vb.h}`}
        preserveAspectRatio={preserve}
        className="block h-full w-full"
      >
        {/* Ảnh nằm TRONG svg → cùng phép biến đổi với hotspot, không bao giờ lệch */}
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
    </div>
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
