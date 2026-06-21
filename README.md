# Gió Từ Làng

Landing page quảng bá **làng nghề Chàng Sơn** — nhấn mạnh dự án **Làng Quạt**,
mở rộng sang nghề mộc, nghề sơn và nghề tre.

Điểm đặc biệt: **homepage là một hero fullscreen kiểu "chọn ải"** (lấy cảm hứng
từ màn chọn level trong game), với 4 cánh cổng tương ứng 4 nghề. Các trang còn
lại được làm đồng bộ, sạch, chuyên nghiệp.

## Công nghệ

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS v4**
- **GSAP + @gsap/react** cho animation
- **next/font** (Playfair Display + Be Vietnam Pro)

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
npm start        # chạy bản build
```

> Lần build/dev đầu cần mạng để tải font Google (Playfair Display, Be Vietnam Pro).

## Cấu trúc thư mục

```
src/
  app/
    layout.tsx               # font + metadata gốc
    page.tsx                 # HOMEPAGE — hero "chọn ải"
    globals.css              # design tokens (@theme) + texture + reduced-motion
    gioi-thieu/              # Giới thiệu làng nghề
    du-an/                   # Dự án Gió Từ Làng
    san-pham/                # Sản phẩm (có lọc + tìm kiếm)
    tin-tuc/                 # Tin tức & câu chuyện
    lien-he/                 # Liên hệ (form placeholder)
    nghe-quat|moc|son|tre/   # 4 trang nghề (dùng chung template)
  components/
    home/                    # AnimatedBackground, LevelCard, HeroLevelSelection
    craft/                   # CraftPageTemplate (bố cục kể chuyện cho 4 nghề)
    layout/                  # Header, Footer, SiteShell
    products/                # ProductExplorer (lọc client-side)
    contact/                 # ContactForm (placeholder)
    ui/                      # Container, SectionHeading, Button, Reveal,
                             # PageHero, ProductCard, ArticleCard, Placeholder
  data/                      # site, navigation, crafts, products, projects, articles
  hooks/                     # useReducedMotion
  lib/                       # utils (cn)
public/images/               # nơi đặt ảnh thật (xem images/README.md)
```

## Thay nội dung & ảnh

- **Nội dung chữ**: sửa trong `src/data/*`. Toàn bộ copy đang là bản tạm tiếng Việt.
- **Ảnh**: hiện dùng `Placeholder`. Xem hướng dẫn thay ảnh thật trong
  `public/images/README.md`.
- **Màu sắc / font**: chỉnh trong `@theme` ở `src/app/globals.css`.

## Ghi chú animation

- Animation dùng **GSAP** với `useGSAP` + cleanup chuẩn (`gsap.matchMedia`).
- Tôn trọng `prefers-reduced-motion`: tự tắt/đơn giản hóa chuyển động.
- Hero homepage: entrance theo timeline (tiêu đề → luồng gió → 4 ải), hover từng
  ải có tilt 3D + reveal mô tả; nền có parallax theo con trỏ và hạt bụi giấy bay.
- Chỉ frontend, dữ liệu là mock — chưa có backend.
