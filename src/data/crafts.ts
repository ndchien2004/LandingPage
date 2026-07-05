export type CraftProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type CraftFeatureProduct = {
  name: string;
  note: string;
};

export type Craft = {
  /** Mã định danh dùng cho route, ví dụ: nghe-quat */
  slug: string;
  /** Tên hiển thị ngắn, ví dụ: Nghề Quạt */
  name: string;
  /** Số thứ tự chương của nghề (dùng cho nhãn "Chương 01"...) */
  order: string;
  /** Một dòng gợi mở ngắn về nghề */
  kicker: string;
  /** Mô tả ngắn về nghề (dùng ở các thẻ điều hướng) */
  cardDescription: string;
  /** Màu nhấn chủ đạo của nghề (đồng bộ với theme) */
  accent: string;
  /** Tên file ảnh placeholder trong /public/images/crafts */
  image: string;
  /** Tiêu đề & mô tả cho hero nhỏ đầu trang nghề */
  hero: {
    title: string;
    subtitle: string;
  };
  /** Đoạn giới thiệu nghề */
  intro: string[];
  /** Giá trị cốt lõi của nghề */
  values: { title: string; description: string }[];
  /** Quy trình làm nghề */
  process: CraftProcessStep[];
  /** Câu chuyện con người */
  people: {
    quote: string;
    author: string;
    role: string;
    body: string[];
  };
  /** Sản phẩm tiêu biểu */
  products: CraftFeatureProduct[];
};

export const crafts: Craft[] = [
  {
    slug: "nghe-quat",
    name: "Nghề Quạt",
    order: "01",
    kicker: "Hơi thở đầu tiên của làng",
    cardDescription:
      "Mỗi chiếc quạt là một lần gió được gấp lại trong tay người thợ — mở ra là cả một nếp làng.",
    accent: "#b23a2e",
    image: "/images/crafts/quat.jpg",
    hero: {
      title: "Nghề Quạt Chàng Sơn",
      subtitle:
        "Từ nan tre chẻ mảnh đến cánh quạt bung mở, người Chàng Sơn đã gấp gió thành nghề, gấp nghề thành tên đất.",
    },
    intro: [
      "Quạt Chàng Sơn từ lâu đã là niềm tự hào của vùng đất Thạch Thất. Không chỉ là vật dụng xua đi cái nóng ngày hè, chiếc quạt còn là tác phẩm thủ công kết tinh sự khéo léo, kiên nhẫn và gu thẩm mỹ của người thợ làng.",
      "Trải qua nhiều thế hệ, nghề quạt vẫn được gìn giữ như một mạch nguồn không dứt. Mỗi cánh quạt mở ra là một lần người làng kể lại câu chuyện của mình — về tre, về giấy, về lụa, và về đôi bàn tay đã quen với từng nếp gấp.",
    ],
    values: [
      {
        title: "Tinh xảo trong từng nan",
        description:
          "Nan quạt được chẻ đều, vót mảnh và xếp khít đến mức khi mở ra, cả cánh quạt như một vầng trăng cân đối.",
      },
      {
        title: "Nghệ thuật trên mặt quạt",
        description:
          "Mặt quạt là khoảng trống cho thư pháp, tranh dân gian và họa tiết truyền thống được thổi hồn.",
      },
      {
        title: "Di sản sống của làng",
        description:
          "Nghề quạt gắn liền với đời sống, lễ hội và ký ức của người Chàng Sơn qua nhiều thế hệ.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Chọn và xử lý tre",
        description:
          "Tre được chọn đúng độ tuổi, ngâm và phơi kỹ để nan quạt vừa dẻo vừa bền, không cong vênh theo thời gian.",
      },
      {
        step: "02",
        title: "Chẻ và vót nan",
        description:
          "Người thợ chẻ tre thành những nan mỏng đều tăm tắp, vót nhẵn từng chiếc — công đoạn đòi hỏi sự kiên nhẫn bậc nhất.",
      },
      {
        step: "03",
        title: "Phất giấy, bồi mặt quạt",
        description:
          "Giấy dó hoặc lụa được phất lên khung nan bằng hồ nấu thủ công, căng phẳng và bám chắc vào từng nếp gấp.",
      },
      {
        step: "04",
        title: "Trang trí và hoàn thiện",
        description:
          "Mặt quạt được vẽ tranh, viết thư pháp hoặc in họa tiết, rồi kiểm tra độ mở khít trước khi đến tay người dùng.",
      },
    ],
    people: {
      quote:
        "Làm quạt là làm gió. Gió thì vô hình, nên người thợ phải gửi cái tâm của mình vào từng nan tre.",
      author: "Nghệ nhân làng Chàng Sơn",
      role: "Người giữ nghề quạt",
      body: [
        "Đằng sau mỗi chiếc quạt là những người thợ đã gắn bó với nghề từ thuở còn nhỏ. Họ thuộc lòng tiếng tre tách ra dưới lưỡi dao, quen với mùi hồ giấy và ánh nắng phơi quạt trước sân.",
        "Dự án Gió Từ Làng mong muốn đưa câu chuyện của họ đến gần hơn với công chúng, để nghề quạt không chỉ được nhớ đến, mà còn được tiếp tục sống.",
      ],
    },
    products: [
      { name: "Quạt giấy dó vẽ tay", note: "Họa tiết dân gian, phù hợp trưng bày" },
      { name: "Quạt lụa thư pháp", note: "Quà tặng văn hóa trang nhã" },
      { name: "Quạt trang trí cỡ lớn", note: "Điểm nhấn không gian truyền thống" },
      { name: "Quạt lưu niệm", note: "Nhỏ gọn, mang đậm dấu ấn làng nghề" },
    ],
  },
  {
    slug: "nghe-moc",
    name: "Nghề Mộc",
    order: "02",
    kicker: "Tiếng đục vọng từ gỗ",
    cardDescription:
      "Người thợ mộc Chàng Sơn lắng nghe thớ gỗ, để mỗi đường chạm trở thành lời kể của thời gian.",
    accent: "#7a3b2e",
    image: "/images/crafts/moc.jpg",
    hero: {
      title: "Nghề Mộc Chàng Sơn",
      // NBSP nối cụm cuối → "nếp nhà, đồ thờ và hồn cốt kiến trúc Việt." luôn tròn 1 dòng.
      subtitle:
        "Từ những khối gỗ thô mộc, bàn tay người thợ chạm khắc nên nếp nhà, đồ thờ và hồn cốt kiến trúc Việt.",
    },
    intro: [
      "Nghề mộc Chàng Sơn nổi tiếng với những người thợ tài hoa, từng góp tay dựng nên nhiều công trình kiến trúc gỗ truyền thống. Sự tỉ mỉ trong từng mộng, từng đường chạm đã làm nên danh tiếng của làng.",
      "Gỗ trong tay người thợ không còn là vật liệu vô tri, mà trở thành nơi lưu giữ hoa văn, tích truyện và tinh thần của người Việt qua từng thời kỳ.",
    ],
    values: [
      {
        title: "Vững trong từng mộng gỗ",
        description:
          "Kỹ thuật ghép mộng truyền thống giúp sản phẩm bền chắc qua thời gian mà không cần đến đinh sắt.",
      },
      {
        title: "Tinh tế trong đường chạm",
        description:
          "Hoa văn được chạm khắc tỉ mỉ, sống động, thể hiện trình độ và thẩm mỹ của người thợ.",
      },
      {
        title: "Gắn với kiến trúc Việt",
        description:
          "Nghề mộc góp phần gìn giữ những giá trị kiến trúc gỗ truyền thống của dân tộc.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Chọn gỗ",
        description:
          "Gỗ được lựa theo loại, độ khô và vân gỗ phù hợp với từng sản phẩm và mục đích sử dụng.",
      },
      {
        step: "02",
        title: "Pha và tạo phôi",
        //   (no-break space) giữ "sản phẩm" luôn nằm cùng một dòng.
        description:
          "Người thợ đo, cắt và tạo hình phôi gỗ, đặt nền cho toàn bộ kết cấu sản phẩm.",
      },
      {
        step: "03",
        title: "Ghép mộng và chạm khắc",
        description:
          "Các chi tiết được ghép mộng chắc chắn, hoa văn được chạm khắc bằng tay với sự tập trung cao độ.",
      },
      {
        step: "04",
        title: "Hoàn thiện bề mặt",
        //   giữ "vẻ đẹp" luôn nằm cạnh nhau khi xuống dòng.
        description:
          "Sản phẩm được làm nhẵn, đánh bóng hoặc phủ lớp bảo vệ để tôn lên vẻ đẹp tự nhiên của gỗ.",
      },
    ],
    people: {
      quote:
        "Gỗ có tiếng nói riêng. Người thợ giỏi là người biết nghe gỗ trước khi đặt lưỡi đục.",
      author: "Nghệ nhân làng Chàng Sơn",
      role: "Người giữ nghề mộc",
      body: [
        "Những người thợ mộc Chàng Sơn học nghề từ cha ông, rèn tay nghề qua từng công trình. Với họ, mỗi sản phẩm hoàn thiện là một lần để lại dấu ấn cá nhân trong dòng chảy của nghề.",
        "Gió Từ Làng kể lại hành trình của họ — từ khúc gỗ thô đến tác phẩm có hồn — như một cách tôn vinh sự bền bỉ của nghề mộc truyền thống.",
      ],
    },
    products: [
      { name: "Đồ thờ chạm khắc", note: "Tinh xảo, trang nghiêm" },
      { name: "Hoành phi câu đối", note: "Lưu giữ nét chữ và hoa văn cổ" },
      { name: "Nội thất gỗ truyền thống", note: "Bền chắc theo lối ghép mộng" },
      { name: "Tượng và phù điêu", note: "Tác phẩm trang trí thủ công" },
    ],
  },
  {
    slug: "nghe-tre",
    name: "Nghề Tre",
    order: "03",
    kicker: "Sự dẻo dai của làng quê",
    cardDescription:
      "Từ thân tre mộc mạc, người thợ đan nên những vật dụng gần gũi mà bền bỉ với đời sống Việt.",
    accent: "#6f7a3b",
    image: "/images/crafts/tre.jpg",
    hero: {
      title: "Nghề Tre Chàng Sơn",
      subtitle:
        "Tre mọc thẳng, tre dẻo dai — và trong tay người thợ, tre trở thành vật dụng thân quen của nếp sống Việt.",
    },
    intro: [
      "Tre gắn bó với làng quê Việt Nam từ bao đời, và ở Chàng Sơn, nghề tre tiếp nối truyền thống ấy bằng những sản phẩm đan lát, gia dụng và trang trí gần gũi.",
      "Từ chiếc rổ, chiếc rá đến các sản phẩm trang trí hiện đại, tre cho thấy sự linh hoạt và sức sống bền bỉ của một vật liệu mộc mạc nhưng đầy tiềm năng.",
    ],
    values: [
      {
        title: "Mộc mạc mà bền",
        description:
          "Sản phẩm từ tre nhẹ, chắc và thân thiện với môi trường, phù hợp với đời sống hằng ngày.",
      },
      {
        title: "Khéo léo trong đan lát",
        description:
          "Kỹ thuật đan tạo nên những hoa văn đều đặn, vừa hữu dụng vừa giàu tính thẩm mỹ.",
      },
      {
        title: "Thân thiện môi trường",
        description:
          "Tre là vật liệu tái sinh nhanh, gắn với xu hướng sống xanh và bền vững hôm nay.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Chọn và xử lý tre",
        description:
          "Tre được chọn đúng độ, xử lý chống mối mọt và phơi khô để đảm bảo độ bền.",
      },
      {
        step: "02",
        title: "Chẻ nan, vót sợi",
        description:
          "Tre được chẻ thành nan, sợi với độ dày phù hợp cho từng kiểu đan và sản phẩm.",
      },
      {
        step: "03",
        title: "Đan và tạo hình",
        description:
          "Người thợ đan các nan tre theo kỹ thuật truyền thống, tạo nên dáng và hoa văn cho sản phẩm.",
      },
      {
        step: "04",
        title: "Hoàn thiện",
        description:
          "Sản phẩm được làm gọn mép, xử lý bề mặt và kiểm tra độ chắc trước khi hoàn thành.",
      },
    ],
    people: {
      quote:
        "Tre uốn được mà không gãy. Người làm nghề tre cũng học từ tre cái sự mềm mà bền ấy.",
      author: "Nghệ nhân làng Chàng Sơn",
      role: "Người giữ nghề tre",
      body: [
        "Những người thợ tre Chàng Sơn gìn giữ kỹ thuật đan lát truyền thống, đồng thời tìm tòi mẫu mã mới để tre đến gần hơn với đời sống hiện đại.",
        "Gió Từ Làng kể câu chuyện của tre như một lời nhắc về sự bền bỉ, gần gũi và tinh thần thích ứng của làng nghề Việt.",
      ],
    },
    products: [
      { name: "Đồ gia dụng đan tre", note: "Nhẹ, bền, thân thiện" },
      { name: "Đèn và vật trang trí tre", note: "Mộc mạc, ấm áp" },
      { name: "Giỏ, khay quà tre", note: "Phù hợp quà tặng, lưu niệm" },
      { name: "Sản phẩm tre kết hợp hiện đại", note: "Thiết kế mới trên vật liệu cũ" },
    ],
  },
];

export function getCraft(slug: string): Craft | undefined {
  return crafts.find((c) => c.slug === slug);
}
