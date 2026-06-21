# Thư mục ảnh

Nơi đặt ảnh thật khi bạn có sẵn. Hiện tại toàn site đang dùng component
`Placeholder` (khối ảnh trang trí), nên chưa cần ảnh thật để chạy.

## Cách thay ảnh thật

1. Bỏ ảnh vào đúng thư mục:
   - `logo/` — logo, favicon
   - `crafts/` — ảnh đại diện 4 nghề: `quat.jpg`, `moc.jpg`, `son.jpg`, `tre.jpg`
   - `products/` — ảnh sản phẩm (tên trùng `image` trong `src/data/products.ts`)
   - `articles/` — ảnh bài viết (tên trùng `image` trong `src/data/articles.ts`)

2. Thay `Placeholder` bằng `next/image`. Ví dụ:

   ```tsx
   import Image from "next/image";

   <Image
     src={craft.image}
     alt={craft.name}
     fill
     className="object-cover"
   />
   ```

   Các đường dẫn ảnh đã được khai báo sẵn trong `src/data/*` để bạn dùng lại.

> Đường dẫn ảnh trong `data/` đã trỏ tới các file trong thư mục này, ví dụ
> `/images/crafts/quat.jpg`. Chỉ cần đặt đúng tên file là dùng được ngay.
