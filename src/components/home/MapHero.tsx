"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { getCraft } from "@/data/crafts";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { usePageTransition } from "@/components/transition/PageTransition";

gsap.registerPlugin(useGSAP);

/**
 * Ảnh banner bản đồ làng nghề (host trên Cloudinary — xem src/data/cloudinaryAssets.ts).
 * 👉 Khi có ảnh mới: upload lên Cloudinary, đổi entry `map.banner` và cập nhật
 *    RATIO = tỉ lệ ngang/dọc của ảnh mới (ảnh hiện tại 2560/1086 ≈ 2.357).
 */
const BANNER_SRC = cloudinaryAssets.map.banner.src;
const RATIO = 2560 / 1086;

/**
 * Mép TRÊN của ảnh có sẵn một dải giấy thừa (~7% chiều cao) — chính nó tạo cảm
 * giác "hở" giữa bản đồ và thanh điều hướng (ảnh đã nằm sát navbar rồi).
 *  - CROP_TOP: cắt bớt dải giấy thừa ở mép trên (0.07 ≈ 7%) cho khung gỗ sát navbar.
 *  - STRETCH : kéo ảnh cao thêm theo chiều dọc (0.06 ≈ 6%) để map đầy đặn hơn.
 * Cả hai đều an toàn với vùng click (tính theo % nên không lệch tâm vòng tròn).
 */
const CROP_TOP = 0.07;
const STRETCH = 0.06;

/**
 * Vùng chọn từng làng nghề — căn khít vào vòng tròn emblem trên ảnh.
 *  - cx, cy: tâm emblem, tính theo % chiều rộng/chiều cao khung ảnh.
 *  - d: đường kính emblem, tính theo % CHIỀU RỘNG khung ảnh.
 * Lưu ý: emblem gốc là hình TRÒN nhưng ảnh đang kéo dọc +STRETCH nên khi hiển thị
 * thành elip cao hơn; vòng highlight được bù elip tương ứng (xem MapZone) nên vẫn ôm khít.
 * Toạ độ d/cx/cy được dò trực tiếp từ ảnh — chỉnh nhẹ nếu cần.
 */
const ZONES: { slug: string; cx: number; cy: number; d: number }[] = [
  { slug: "nghe-moc", cx: 23.9, cy: 33, d: 13 }, // Làng nghề Mộc (trái – trên)
  { slug: "nghe-son", cx: 21.9, cy: 72.0, d: 11.5 }, // Làng nghề Sơn (trái – dưới)
  { slug: "nghe-quat", cx: 50.1, cy: 53.2, d: 15 }, // Làng nghề Quạt (vòng vàng giữa)
  { slug: "nghe-tre", cx: 76.6, cy: 35.0, d: 13.5 }, // Làng nghề Tre (phải)
];

const zones = ZONES.map((z) => ({ ...z, craft: getCraft(z.slug) })).filter(
  (z) => z.craft,
);

export function MapHero() {
  const root = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const navigate = usePageTransition();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      // Fade-in nhẹ (chỉ opacity → các nút luôn nhận click)
      gsap.from(frameRef.current, { opacity: 0, duration: 1, ease: "power2.out" });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Bản đồ làng nghề Chàng Sơn — chọn một làng nghề để khám phá"
      className="relative h-[100svh] min-h-[480px] w-full overflow-hidden bg-ink"
    >
      {/* Nền mờ lấp đầy phần dư (không để hở viền) */}
      <Image
        src={BANNER_SRC}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="scale-110 select-none object-cover blur-2xl"
      />

      {/* Banner sắc nét: full chiều ngang, cắt mép giấy thừa phía trên cho sát navbar */}
      <div className="absolute inset-x-0 top-16 sm:top-20">
        {/* Khung cắt: ẩn dải giấy thừa ở mép trên ảnh */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: String(RATIO / ((1 + STRETCH) * (1 - CROP_TOP))) }}
        >
          {/* Ảnh đầy đủ — kéo cao thêm chút (STRETCH) & đẩy lên để giấu mép giấy (CROP_TOP) */}
          <div
            ref={frameRef}
            className="absolute inset-x-0"
            style={{
              aspectRatio: String(RATIO / (1 + STRETCH)),
              top: `-${(CROP_TOP / (1 - CROP_TOP)) * 100}%`,
            }}
          >
            <Image
              src={BANNER_SRC}
              alt="Bản đồ di sản làng nghề Chàng Sơn"
              fill
              priority
              sizes="100vw"
              className="select-none object-fill"
            />

            {/* Vùng chọn từng làng nghề: hiện vòng highlight khi hover/focus */}
            {zones.map((z) => (
              <MapZone
                key={z.slug}
                cx={z.cx}
                cy={z.cy}
                d={z.d}
                name={z.craft!.name}
                onSelect={() => navigate(`/${z.slug}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type MapZoneProps = {
  cx: number;
  cy: number;
  d: number;
  name: string;
  onSelect: () => void;
};

function MapZone({ cx, cy, d, name, onSelect }: MapZoneProps) {
  return (
    <button
      type="button"
      data-zone
      onClick={onSelect}
      aria-label={`Khám phá ${name}`}
      style={{
        left: `${cx}%`,
        top: `${cy}%`,
        width: `${d}%`,
        // Bù phần kéo dọc (STRETCH): emblem hiển thị cao hơn nên vòng cũng elip theo
        aspectRatio: String(1 / (1 + STRETCH)),
      }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-none"
    >
      {/* Sóng sáng lan nhẹ ra ngoài (chỉ hiện khi hover/focus) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-gold/50 opacity-0 group-hover:animate-zone-ping group-focus-visible:animate-zone-ping"
      />
      {/* Vòng highlight ôm sát emblem: viền vàng đồng + quầng sáng trong/ngoài */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 scale-90 rounded-full border-[3px] border-gold opacity-0 shadow-[0_0_26px_5px_rgba(201,162,75,0.5),inset_0_0_20px_5px_rgba(201,162,75,0.4)] transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
      />
    </button>
  );
}
