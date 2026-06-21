export type ProjectPhase = {
  phase: string;
  title: string;
  description: string;
};

export type ProjectItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  href: string;
  accent: string;
  image: string;
};

export type ContentWeek = {
  week: string;
  theme: string;
  items: string[];
};

/** Lộ trình nội dung theo tuần (bám sơ đồ dự án trên Figma). */
export const contentRoadmap: ContentWeek[] = [
  {
    week: "Tuần 5",
    theme: "Đặt nền & bối cảnh",
    items: [
      "Khám phá làng nghề truyền thống Chàng Sơn",
      "Làng nghề mộc cổ truyền Chàng Sơn",
      "Quạt cổ Việt Nam – di sản đang bị nhầm lẫn",
    ],
  },
  {
    week: "Tuần 6",
    theme: "Đi sâu vào nghề quạt",
    items: [
      "Giới thiệu nghề làm quạt cổ",
      "Chân dung nhân vật",
      "Quy trình nghề",
      "Chi tiết thẩm mỹ",
      "Nỗi trăn trở",
    ],
  },
  {
    week: "Tuần 7",
    theme: "Sản phẩm & tiếp nối",
    items: [
      "Quạt trong đời sống hôm nay",
      "Gìn giữ và lan tỏa nghề",
    ],
  },
];

/** Cấu trúc dự án: một nghề chính, ba nghề phụ. */
export const projectStructure = {
  main: {
    name: "Gió Từ Làng — Nghề Quạt",
    role: "Dự án chính",
    href: "/nghe-quat",
    accent: "#b23a2e",
    note: "Nghề quạt là mạch kể trung tâm, trọng tâm nội dung của toàn dự án.",
  },
  branches: [
    {
      name: "Nghề Mộc",
      role: "Nhánh phụ",
      href: "/nghe-moc",
      accent: "#7a3b2e",
      note: "Mở rộng câu chuyện sang nghề mộc cổ truyền của làng.",
    },
    {
      name: "Nghề Sơn",
      role: "Nhánh phụ",
      href: "/nghe-son",
      accent: "#c2703d",
      note: "Chiều sâu của sơn ta — sự kiên nhẫn qua từng lớp ủ.",
    },
    {
      name: "Nghề Tre",
      role: "Nhánh phụ",
      href: "/nghe-tre",
      accent: "#6f7a3b",
      note: "Sự dẻo dai, gần gũi của tre trong nếp sống Việt.",
    },
  ],
};

/** Danh mục dự án / chuyên đề — hiển thị dạng lưới giống trang dự án quattutam.vn. */
export const portfolio: ProjectItem[] = [
  {
    slug: "lang-quat-chang-son",
    title: "Làng Quạt Chàng Sơn",
    category: "Nghề Quạt",
    description:
      "Chuyên đề trọng tâm của dự án — hành trình gìn giữ và lan tỏa nghề quạt truyền thống của làng.",
    href: "/nghe-quat",
    accent: "#b23a2e",
    image: "/images/projects/lang-quat.jpg",
  },
  {
    slug: "quat-nghe-thuat-treo-tuong",
    title: "Quạt nghệ thuật treo tường",
    category: "Nghề Quạt",
    description:
      "Đưa cánh quạt vẽ tay trở thành điểm nhấn trang trí cho không gian sống hiện đại.",
    href: "/san-pham",
    accent: "#b23a2e",
    image: "/images/projects/quat-treo-tuong.jpg",
  },
  {
    slug: "quat-su-kien-qua-tang",
    title: "Quạt sự kiện & quà tặng văn hóa",
    category: "Nghề Quạt",
    description:
      "Những chiếc quạt mang câu chuyện làng nghề đến các sự kiện, hội chợ và bộ quà tặng.",
    href: "/san-pham",
    accent: "#b23a2e",
    image: "/images/projects/quat-su-kien.jpg",
  },
  {
    slug: "khong-gian-nha-go",
    title: "Không gian nhà gỗ truyền thống",
    category: "Nghề Mộc",
    description:
      "Tư liệu về kết cấu, hoa văn và bàn tay người thợ mộc trong kiến trúc gỗ Chàng Sơn.",
    href: "/nghe-moc",
    accent: "#7a3b2e",
    image: "/images/projects/nha-go.jpg",
  },
  {
    slug: "do-tho-hoanh-phi",
    title: "Đồ thờ, hoành phi & câu đối",
    category: "Nghề Mộc",
    description:
      "Ghi lại nét chạm khắc tinh xảo trên các tác phẩm gỗ tâm linh của làng.",
    href: "/nghe-moc",
    accent: "#7a3b2e",
    image: "/images/projects/do-tho.jpg",
  },
  {
    slug: "son-ta-thu-cong",
    title: "Sơn ta trên đồ thủ công",
    category: "Nghề Sơn",
    description:
      "Khám phá chiều sâu của sơn truyền thống qua từng lớp ủ, lớp mài kiên nhẫn.",
    href: "/nghe-son",
    accent: "#c2703d",
    image: "/images/projects/son-ta.jpg",
  },
  {
    slug: "tre-doi-song-hien-dai",
    title: "Tre trong đời sống hiện đại",
    category: "Nghề Tre",
    description:
      "Thiết kế mới trên vật liệu tre truyền thống, hướng tới lối sống xanh và bền vững.",
    href: "/nghe-tre",
    accent: "#6f7a3b",
    image: "/images/projects/tre-hien-dai.jpg",
  },
  {
    slug: "tu-lieu-cau-chuyen-lang-nghe",
    title: "Tư liệu & câu chuyện làng nghề",
    category: "Chuyên đề",
    description:
      "Phóng sự, hình ảnh và lời kể của những người đang ngày ngày giữ nghề ở Chàng Sơn.",
    href: "/tin-tuc",
    accent: "#b23a2e",
    image: "/images/projects/tu-lieu.jpg",
  },
];

export const projectIntro = {
  title: "Gió Từ Làng",
  lead: "Một dự án quảng bá làng nghề Chàng Sơn bằng ngôn ngữ của câu chuyện, hình ảnh và trải nghiệm.",
  paragraphs: [
    "Gió Từ Làng ra đời từ mong muốn đưa làng nghề Chàng Sơn đến gần hơn với công chúng — không chỉ như một địa danh, mà như một không gian văn hóa sống động đang tiếp tục thở và chuyển động.",
    "Lấy nghề quạt làm hướng đi chính, dự án mở rộng sang nghề mộc, nghề sơn và nghề tre, để người xem có thể bước vào từng nghề như bước vào một hành trình khám phá riêng.",
  ],
};

export const projectReasons: { title: string; description: string }[] = [
  {
    title: "Vì làng nghề cần được kể lại",
    description:
      "Nhiều làng nghề truyền thống đang dần mai một. Kể lại câu chuyện của họ là cách để giữ nghề không rơi vào quên lãng.",
  },
  {
    title: "Vì người trẻ cần một lối vào",
    description:
      "Một trải nghiệm hiện đại, trực quan sẽ giúp người trẻ tiếp cận văn hóa truyền thống một cách tự nhiên và hứng thú hơn.",
  },
  {
    title: "Vì sản phẩm thủ công xứng đáng được biết đến",
    description:
      "Đằng sau mỗi sản phẩm là công sức và tâm huyết của người thợ — điều đó cần được nhìn thấy và trân trọng.",
  },
];

export const projectGoals: string[] = [
  "Giới thiệu làng nghề Chàng Sơn tới công chúng, khách du lịch và người quan tâm văn hóa.",
  "Tôn vinh giá trị của bốn nghề: quạt, mộc, sơn và tre.",
  "Tạo nền tảng trực quan để câu chuyện làng nghề tiếp tục được mở rộng.",
  "Kết nối người làm nghề với cộng đồng yêu thích thủ công truyền thống.",
];

export const projectPhases: ProjectPhase[] = [
  {
    phase: "01",
    title: "Lắng nghe làng",
    description:
      "Tìm hiểu lịch sử, con người và quy trình của từng nghề thông qua tư liệu và câu chuyện thực tế.",
  },
  {
    phase: "02",
    title: "Kể lại bằng hình ảnh",
    description:
      "Xây dựng nội dung, hình ảnh và trải nghiệm trực quan cho từng nghề, lấy nghề quạt làm trọng tâm.",
  },
  {
    phase: "03",
    title: "Mở ra hành trình",
    description:
      "Thiết kế homepage như trang mở của một cuốn truyện, dẫn người xem bước vào từng nghề một cách tự nhiên.",
  },
  {
    phase: "04",
    title: "Tiếp tục lan tỏa",
    description:
      "Mở rộng nội dung, kết nối sản phẩm và cộng đồng để câu chuyện làng nghề tiếp tục được kể.",
  },
];
