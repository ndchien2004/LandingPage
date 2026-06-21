import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * Khung dùng chung cho các trang nội dung (không phải homepage):
 * Header dạng solid + khoảng đệm cho header cố định + Footer.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper-grain">
      <Header variant="solid" />
      <main className="flex-1 pt-16 sm:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
