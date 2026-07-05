import { productImage } from "./cloudinaryAssets";

export type Product = {
  id: string;
  name: string;
  category: "Quạt" | "Mộc" | "Tre";
  price: string;
  description: string;
  image: string;
  tags: string[];
};

export const productCategories = ["Tất cả", "Quạt", "Mộc", "Tre"] as const;

/**
 * Sản phẩm thật của làng nghề — ảnh lưu trên Cloudinary
 * (thư mục GioTuLangLandingPage/products, upload bằng scripts/upload-product-assets.mjs).
 */
export const products: Product[] = [
  // — Nghề Quạt —
  {
    id: "quat-co-nau-tram",
    name: "Quạt cổ nâu trầm",
    category: "Quạt",
    price: "Liên hệ",
    description:
      "Chiếc quạt cổ mang sắc nâu trầm của thời gian, nan tre và mặt quạt nhuốm màu năm tháng — một hiện vật quý của nghề quạt Chàng Sơn.",
    image: productImage("quat-co-nau-tram"),
    tags: ["Quạt cổ", "Sưu tầm"],
  },
  {
    id: "quat-dong-ho-lon-dan",
    name: "Quạt giấy Đông Hồ — Lợn đàn",
    category: "Quạt",
    price: "Liên hệ",
    description:
      "Quạt giấy trắng in tranh dân gian Đông Hồ “Lợn đàn” — biểu tượng của sung túc, đủ đầy, phù hợp làm quà tặng văn hóa.",
    image: productImage("quat-dong-ho-lon-dan"),
    tags: ["Tranh Đông Hồ", "Quà tặng"],
  },
  {
    id: "quat-thu-phap",
    name: "Quạt lụa thư pháp Cha Mẹ",
    category: "Quạt",
    price: "Liên hệ",
    description:
      "Mặt quạt lụa tím điểm nét thư pháp vàng về công ơn cha mẹ — món quà ý nghĩa cho ngày lễ và dịp tri ân.",
    image: productImage("quat-thu-phap"),
    tags: ["Thư pháp", "Lụa"],
  },
  {
    id: "quat-dai-go-phong-canh",
    name: "Quạt đại gỗ — Phong cảnh làng quê",
    category: "Quạt",
    price: "Liên hệ",
    description:
      "Quạt trưng bày khổ lớn vẽ tay cảnh làng quê Việt: cây đa, bến nước, mái đình — điểm nhấn cho không gian truyền thống.",
    image: productImage("quat-dai-go-phong-canh"),
    tags: ["Trưng bày", "Vẽ tay"],
  },

  // — Nghề Mộc —
  {
    id: "moc-hoanh-phi-cau-doi",
    name: "Bộ hoành phi câu đối sơn son thếp vàng",
    category: "Mộc",
    price: "Liên hệ",
    description:
      "Bộ hoành phi, câu đối chạm khắc công phu, thếp vàng trang nghiêm — tôn lên không gian thờ tự của gia đình Việt.",
    image: productImage("moc-hoanh-phi-cau-doi"),
    tags: ["Đồ thờ", "Thếp vàng"],
  },
  {
    id: "moc-do-tho-cham-khac",
    name: "Bộ đồ thờ chạm khắc cổ",
    category: "Mộc",
    price: "Liên hệ",
    description:
      "Án gian, tủ thờ chạm khắc theo lối cổ với từng mảng hoa văn tinh xảo, giữ trọn nét trang nghiêm truyền thống.",
    image: productImage("moc-do-tho-cham-khac"),
    tags: ["Chạm khắc", "Truyền thống"],
  },
  {
    id: "moc-noi-that-truyen-thong",
    name: "Nội thất gỗ truyền thống",
    category: "Mộc",
    price: "Liên hệ",
    description:
      "Không gian nhà gỗ với hệ vì kèo, cửa võng và mảng chạm liền khối — dấu ấn của bàn tay thợ mộc Chàng Sơn.",
    image: productImage("moc-noi-that-truyen-thong"),
    tags: ["Nhà gỗ", "Kiến trúc"],
  },
  {
    id: "moc-tuong-nghe-go",
    name: "Tượng nghê gỗ",
    category: "Mộc",
    price: "Liên hệ",
    description:
      "Tượng nghê chạm khắc thủ công từ khối gỗ nguyên, đường nét sống động — linh vật gác cửa quen thuộc của người Việt.",
    image: productImage("moc-tuong-nghe-go"),
    tags: ["Tượng gỗ", "Linh vật"],
  },

  // — Nghề Tre —
  {
    id: "tre-chuon-chuon",
    name: "Chuồn chuồn tre",
    category: "Tre",
    price: "Liên hệ",
    description:
      "Chuồn chuồn tre vẽ tay nhiều màu, tự thăng bằng trên đầu ngón tay — món đồ chơi dân gian được cả trẻ em và du khách yêu thích.",
    image: productImage("tre-chuon-chuon"),
    tags: ["Đồ chơi dân gian", "Quà lưu niệm"],
  },
  {
    id: "tre-gio-tre",
    name: "Giỏ tre đan thủ công",
    category: "Tre",
    price: "Liên hệ",
    description:
      "Bộ sưu tập giỏ tre đan tay đủ kiểu dáng: giỏ quà, giỏ picnic, giỏ đựng đồ — nhẹ, bền và thân thiện với môi trường.",
    image: productImage("tre-gio-tre"),
    tags: ["Đan lát", "Quà tặng"],
  },
  {
    id: "tre-do-gia-dung",
    name: "Đồ gia dụng đan tre",
    category: "Tre",
    price: "Liên hệ",
    description:
      "Khay, rổ, bát đan tre với hoa văn đều đặn, hữu dụng trong đời sống hằng ngày mà vẫn giàu tính thẩm mỹ.",
    image: productImage("tre-do-gia-dung"),
    tags: ["Gia dụng", "Mộc mạc"],
  },
];
