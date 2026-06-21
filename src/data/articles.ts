export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
};

export const articles: Article[] = [
  {
    slug: "cau-chuyen-chiec-quat-chang-son",
    title: "Câu chuyện chiếc quạt Chàng Sơn",
    excerpt:
      "Từ nan tre đến cánh quạt bung mở, hành trình của một chiếc quạt là hành trình của cả một làng nghề.",
    category: "Câu chuyện nghề",
    date: "12 tháng 6, 2026",
    readingTime: "5 phút đọc",
    image: "/images/articles/quat-story.jpg",
  },
  {
    slug: "nguoi-giu-lua-nghe-moc",
    title: "Người giữ lửa nghề mộc",
    excerpt:
      "Gặp gỡ những người thợ mộc Chàng Sơn, lắng nghe câu chuyện về gỗ, về mộng và về sự kiên nhẫn.",
    category: "Con người",
    date: "5 tháng 6, 2026",
    readingTime: "6 phút đọc",
    image: "/images/articles/moc-people.jpg",
  },
  {
    slug: "chieu-sau-cua-son-ta",
    title: "Chiều sâu của sơn ta",
    excerpt:
      "Vì sao nghề sơn lại dạy người ta sự chờ đợi? Một góc nhìn về kỹ thuật và triết lý của nghề sơn truyền thống.",
    category: "Tư liệu nghề",
    date: "28 tháng 5, 2026",
    readingTime: "7 phút đọc",
    image: "/images/articles/son-depth.jpg",
  },
  {
    slug: "tre-va-loi-song-xanh",
    title: "Tre và lối sống xanh",
    excerpt:
      "Khi vật liệu mộc mạc của làng quê gặp gỡ xu hướng sống bền vững của hôm nay.",
    category: "Góc nhìn",
    date: "20 tháng 5, 2026",
    readingTime: "4 phút đọc",
    image: "/images/articles/tre-green.jpg",
  },
  {
    slug: "chang-son-mot-chieu-lang",
    title: "Chàng Sơn, một chiều làng",
    excerpt:
      "Dạo một vòng quanh làng nghề Chàng Sơn, nơi nhịp sống và nhịp nghề vẫn hòa làm một.",
    category: "Phóng sự",
    date: "14 tháng 5, 2026",
    readingTime: "8 phút đọc",
    image: "/images/articles/chang-son.jpg",
  },
  {
    slug: "gio-tu-lang-vi-sao",
    title: "Gió Từ Làng — vì sao chúng tôi bắt đầu",
    excerpt:
      "Đôi lời về lý do và mong muốn đứng sau dự án quảng bá làng nghề Chàng Sơn.",
    category: "Hậu trường",
    date: "2 tháng 5, 2026",
    readingTime: "5 phút đọc",
    image: "/images/articles/behind.jpg",
  },
];
