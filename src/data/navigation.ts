export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const craftNav: NavItem[] = [
  { label: "Nghề Quạt", href: "/nghe-quat" },
  { label: "Nghề Mộc", href: "/nghe-moc" },
  { label: "Nghề Tre", href: "/nghe-tre" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Khám phá",
    items: craftNav,
  },
  {
    title: "Về dự án",
    items: [
      { label: "Giới thiệu", href: "/gioi-thieu" },
      { label: "Tin tức & câu chuyện", href: "/tin-tuc" },
    ],
  },
  {
    title: "Cùng tham gia",
    items: [
      { label: "Sản phẩm", href: "/san-pham" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
  },
];
