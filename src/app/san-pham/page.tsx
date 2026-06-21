import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ProductExplorer } from "@/components/products/ProductExplorer";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description:
    "Bộ sưu tập sản phẩm thủ công của làng nghề Chàng Sơn: quạt, đồ mộc, đồ sơn và sản phẩm tre.",
};

export default function SanPhamPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Sản phẩm"
        title="Tinh hoa thủ công Chàng Sơn"
        subtitle="Mỗi sản phẩm là kết tinh của nguyên liệu, kỹ thuật và bàn tay người thợ. Khám phá bộ sưu tập theo từng nhóm nghề."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ProductExplorer />
        </Container>
      </section>
    </SiteShell>
  );
}
