export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  image: string;
};

/**
 * Bài viết bám theo lộ trình nội dung trong sơ đồ dự án (Tuần 5 → 7).
 * Mỗi bài là một chủ đề trong hành trình kể chuyện về làng nghề Chàng Sơn.
 */
export const articles: Article[] = [
  {
    slug: "kham-pha-lang-nghe-truyen-thong-chang-son",
    title: "Khám phá làng nghề truyền thống Chàng Sơn",
    excerpt:
      "Đặt chân tới Chàng Sơn để cảm nhận một vùng đất nơi nghề thủ công vẫn hòa cùng nhịp sống thường ngày.",
    category: "Tuần 5 · Bối cảnh",
    date: "12 tháng 6, 2026",
    readingTime: "6 phút đọc",
    image: "/images/articles/kham-pha-chang-son.jpg",
  },
  {
    slug: "lang-nghe-moc-co-truyen-chang-son",
    title: "Làng nghề mộc cổ truyền Chàng Sơn",
    excerpt:
      "Bên cạnh nghề quạt, Chàng Sơn còn nổi danh với nghề mộc — nơi gỗ được thổi hồn qua từng đường chạm.",
    category: "Tuần 5 · Bối cảnh",
    date: "11 tháng 6, 2026",
    readingTime: "5 phút đọc",
    image: "/images/articles/moc-co-truyen.jpg",
  },
  {
    slug: "quat-co-viet-nam-di-san-de-bi-nham-lan",
    title: "Quạt cổ Việt Nam – di sản đang bị nhầm lẫn",
    excerpt:
      "Vì sao nhiều người vẫn nhầm lẫn về quạt cổ Việt Nam? Một góc nhìn để trả lại đúng giá trị cho di sản này.",
    category: "Tuần 5 · Góc nhìn",
    date: "10 tháng 6, 2026",
    readingTime: "7 phút đọc",
    image: "/images/articles/quat-co-di-san.jpg",
  },
  {
    slug: "gioi-thieu-nghe-lam-quat-co",
    title: "Giới thiệu nghề làm quạt cổ",
    excerpt:
      "Nghề làm quạt cổ ở Chàng Sơn bắt đầu từ đâu, và điều gì làm nên sự khác biệt của một chiếc quạt thủ công?",
    category: "Tuần 6 · Nghề Quạt",
    date: "5 tháng 6, 2026",
    readingTime: "6 phút đọc",
    image: "/images/articles/nghe-quat-co.jpg",
  },
  {
    slug: "chan-dung-nhan-vat",
    title: "Chân dung người giữ nghề",
    excerpt:
      "Gặp gỡ những nghệ nhân đã gắn bó cả đời với nghề quạt — những người lặng lẽ giữ lửa cho làng.",
    category: "Tuần 6 · Con người",
    date: "4 tháng 6, 2026",
    readingTime: "6 phút đọc",
    image: "/images/articles/chan-dung-nghe-nhan.jpg",
  },
  {
    slug: "quy-trinh-nghe",
    title: "Quy trình làm nên một chiếc quạt",
    excerpt:
      "Từ chọn tre, chẻ nan, phất giấy đến trang trí — hành trình tỉ mỉ phía sau mỗi cánh quạt Chàng Sơn.",
    category: "Tuần 6 · Quy trình",
    date: "3 tháng 6, 2026",
    readingTime: "5 phút đọc",
    image: "/images/articles/quy-trinh-quat.jpg",
  },
  {
    slug: "chi-tiet-tham-my",
    title: "Chi tiết thẩm mỹ trên mặt quạt",
    excerpt:
      "Thư pháp, tranh dân gian và họa tiết truyền thống — nơi cái đẹp được gửi gắm trên từng nếp giấy.",
    category: "Tuần 6 · Thẩm mỹ",
    date: "2 tháng 6, 2026",
    readingTime: "4 phút đọc",
    image: "/images/articles/chi-tiet-tham-my.jpg",
  },
  {
    slug: "noi-tran-tro",
    title: "Nỗi trăn trở của người làm nghề",
    excerpt:
      "Giữa dòng chảy hiện đại, người thợ Chàng Sơn đang đối mặt với những trăn trở gì để giữ lấy nghề?",
    category: "Tuần 6 · Trăn trở",
    date: "1 tháng 6, 2026",
    readingTime: "6 phút đọc",
    image: "/images/articles/noi-tran-tro.jpg",
  },
  {
    slug: "quat-trong-doi-song-hom-nay",
    title: "Quạt trong đời sống hôm nay",
    excerpt:
      "Chiếc quạt truyền thống tìm chỗ đứng mới trong không gian sống, sự kiện và quà tặng văn hóa hiện đại.",
    category: "Tuần 7 · Tiếp nối",
    date: "20 tháng 5, 2026",
    readingTime: "5 phút đọc",
    image: "/images/articles/quat-hom-nay.jpg",
  },
  {
    slug: "gin-giu-va-lan-toa-nghe",
    title: "Gìn giữ và lan tỏa nghề",
    excerpt:
      "Làm sao để câu chuyện làng nghề tiếp tục được kể? Đôi lời về hành trình gìn giữ và lan tỏa của dự án.",
    category: "Tuần 7 · Tiếp nối",
    date: "18 tháng 5, 2026",
    readingTime: "5 phút đọc",
    image: "/images/articles/gin-giu-nghe.jpg",
  },
];
