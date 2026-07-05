import { crafts } from "./crafts";

export type HeroSlide = {
  key: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  accent: string;
};

const bySlug = (slug: string) => crafts.find((c) => c.slug === slug)!;

/**
 * Các slide của hero full màn hình (chạy lần lượt như từng chương truyện).
 * Slide đầu mở chuyện, ba slide sau dẫn vào ba nghề của làng.
 */
export const heroSlides: HeroSlide[] = [
  {
    key: "intro",
    eyebrow: "Làng nghề Chàng Sơn",
    title: "Gió Từ Làng",
    subtitle:
      "Có những nghề được giữ lại không bằng sách vở, mà bằng đôi tay. Hãy bắt đầu hành trình về Chàng Sơn — nơi gió kể lại câu chuyện của quạt, mộc và tre.",
    cta: "Bắt đầu hành trình",
    href: "/du-an",
    accent: "#b23a2e",
  },
  {
    key: "quat",
    eyebrow: "Chương 01 — Nghề Quạt",
    title: "Gấp Gió Thành Nghề",
    subtitle:
      "Từ nan tre chẻ mảnh đến cánh quạt bung mở, người Chàng Sơn đã gấp gió vào tay — và gấp cả một miền ký ức vào từng nếp giấy.",
    cta: "Khám phá Nghề Quạt",
    href: "/nghe-quat",
    accent: bySlug("nghe-quat").accent,
  },
  {
    key: "moc",
    eyebrow: "Chương 02 — Nghề Mộc",
    title: "Tiếng Đục Vọng Từ Gỗ",
    subtitle:
      "Người thợ mộc Chàng Sơn lắng nghe thớ gỗ trước khi đặt lưỡi đục, để mỗi đường chạm trở thành một lời kể của thời gian.",
    cta: "Khám phá Nghề Mộc",
    href: "/nghe-moc",
    accent: bySlug("nghe-moc").accent,
  },
  {
    key: "tre",
    eyebrow: "Chương 03 — Nghề Tre",
    title: "Sự Dẻo Dai Của Làng Quê",
    subtitle:
      "Tre uốn được mà không gãy. Trong tay người thợ, thân tre mộc mạc hóa thành những vật dụng thân quen của nếp sống Việt.",
    cta: "Khám phá Nghề Tre",
    href: "/nghe-tre",
    accent: bySlug("nghe-tre").accent,
  },
];
