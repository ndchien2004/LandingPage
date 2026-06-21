export type ProjectPhase = {
  phase: string;
  title: string;
  description: string;
};

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
      "Thiết kế homepage như một sân khấu chọn ải, đưa người xem bước vào từng nghề một cách tự nhiên.",
  },
  {
    phase: "04",
    title: "Tiếp tục lan tỏa",
    description:
      "Mở rộng nội dung, kết nối sản phẩm và cộng đồng để câu chuyện làng nghề tiếp tục được kể.",
  },
];
