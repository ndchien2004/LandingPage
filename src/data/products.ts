export type Product = {
  id: string;
  name: string;
  category: "Quạt" | "Mộc" | "Sơn" | "Tre";
  price: string;
  description: string;
  image: string;
  tags: string[];
};

export const productCategories = ["Tất cả", "Quạt", "Mộc", "Sơn", "Tre"] as const;

export const products: Product[] = [
  {
    id: "quat-giay-do-ve-tay",
    name: "Quạt giấy dó vẽ tay",
    category: "Quạt",
    price: "Liên hệ",
    description:
      "Quạt giấy dó với họa tiết dân gian được vẽ thủ công, phù hợp trưng bày và làm quà tặng văn hóa.",
    image: "/images/products/quat-1.jpg",
    tags: ["Thủ công", "Trưng bày"],
  },
  {
    id: "quat-lua-thu-phap",
    name: "Quạt lụa thư pháp",
    category: "Quạt",
    price: "Liên hệ",
    description:
      "Mặt quạt lụa mềm mại, điểm nét thư pháp trang nhã — món quà mang đậm tinh thần truyền thống.",
    image: "/images/products/quat-2.jpg",
    tags: ["Quà tặng", "Thư pháp"],
  },
  {
    id: "quat-trang-tri-co-lon",
    name: "Quạt trang trí cỡ lớn",
    category: "Quạt",
    price: "Liên hệ",
    description:
      "Cánh quạt khổ lớn làm điểm nhấn cho không gian mang hơi hướng truyền thống.",
    image: "/images/products/quat-3.jpg",
    tags: ["Nội thất", "Điểm nhấn"],
  },
  {
    id: "do-tho-cham-khac",
    name: "Đồ thờ chạm khắc",
    category: "Mộc",
    price: "Liên hệ",
    description:
      "Sản phẩm đồ thờ được chạm khắc tinh xảo theo lối truyền thống, trang nghiêm và bền chắc.",
    image: "/images/products/moc-1.jpg",
    tags: ["Chạm khắc", "Truyền thống"],
  },
  {
    id: "hoanh-phi-cau-doi",
    name: "Hoành phi câu đối",
    category: "Mộc",
    price: "Liên hệ",
    description:
      "Hoành phi, câu đối gỗ lưu giữ nét chữ và hoa văn cổ, tôn lên không gian thờ tự.",
    image: "/images/products/moc-2.jpg",
    tags: ["Gỗ", "Hoa văn cổ"],
  },
  {
    id: "tuong-phu-dieu-go",
    name: "Tượng & phù điêu gỗ",
    category: "Mộc",
    price: "Liên hệ",
    description:
      "Tác phẩm trang trí thủ công, thể hiện trình độ chạm khắc của người thợ Chàng Sơn.",
    image: "/images/products/moc-3.jpg",
    tags: ["Trang trí", "Thủ công"],
  },
  {
    id: "hop-son-truyen-thong",
    name: "Hộp sơn truyền thống",
    category: "Sơn",
    price: "Liên hệ",
    description:
      "Hộp phủ nhiều lớp sơn ủ công phu, bật lên chiều sâu màu sắc đặc trưng.",
    image: "/images/products/son-1.jpg",
    tags: ["Sơn ta", "Chiều sâu màu"],
  },
  {
    id: "tranh-son-trang-tri",
    name: "Tranh sơn trang trí",
    category: "Sơn",
    price: "Liên hệ",
    description:
      "Tranh hoàn thiện bằng kỹ thuật sơn truyền thống, càng nhìn càng thấy độ óng đằm.",
    image: "/images/products/son-2.jpg",
    tags: ["Tranh", "Truyền thống"],
  },
  {
    id: "vat-pham-phu-son",
    name: "Vật phẩm phủ sơn",
    category: "Sơn",
    price: "Liên hệ",
    description:
      "Vật phẩm trang trí phủ sơn, tôn lên vẻ đẹp của cốt mộc và tre bên dưới.",
    image: "/images/products/son-3.jpg",
    tags: ["Phối nghề", "Trang trí"],
  },
  {
    id: "gio-khay-tre",
    name: "Giỏ & khay tre",
    category: "Tre",
    price: "Liên hệ",
    description:
      "Sản phẩm đan tre nhẹ và bền, phù hợp làm khay quà, giỏ đựng và vật dụng hằng ngày.",
    image: "/images/products/tre-1.jpg",
    tags: ["Đan lát", "Gia dụng"],
  },
  {
    id: "den-tre-trang-tri",
    name: "Đèn tre trang trí",
    category: "Tre",
    price: "Liên hệ",
    description:
      "Đèn đan tre tạo ánh sáng ấm áp, mộc mạc, phù hợp không gian sống hiện đại.",
    image: "/images/products/tre-2.jpg",
    tags: ["Ánh sáng", "Mộc mạc"],
  },
  {
    id: "san-pham-tre-hien-dai",
    name: "Sản phẩm tre hiện đại",
    category: "Tre",
    price: "Liên hệ",
    description:
      "Thiết kế mới trên vật liệu tre truyền thống, hướng tới lối sống xanh và bền vững.",
    image: "/images/products/tre-3.jpg",
    tags: ["Thiết kế mới", "Bền vững"],
  },
];
