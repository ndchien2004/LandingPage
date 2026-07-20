import type { Metadata } from "next";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { ImageZoom } from "@/components/products/ImageZoom";
import {
  products,
  getProductById,
  getRelatedProducts,
} from "@/data/products";
import { productImage } from "@/data/cloudinaryAssets";
import { site } from "@/data/site";

/** Màu nhấn theo nhóm nghề, đồng bộ với theme. */
const accentByCategory: Record<string, string> = {
  Quạt: "#b23a2e",
  Mộc: "#7a3b2e",
  Tre: "#c2703d",
};

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) {
    return { title: "Không tìm thấy sản phẩm" };
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) notFound();

  const accent = accentByCategory[product.category] ?? "#b23a2e";
  const related = getRelatedProducts(product);

  return (
    <SiteShell>
      <section
        className="relative overflow-hidden border-b border-line bg-paper-grain"
        style={{
          background: `linear-gradient(180deg, ${accent}10 0%, transparent 55%)`,
        }}
      >
        <Container className="py-10 sm:py-14">
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Sản phẩm", href: "/san-pham" },
              { label: product.name },
            ]}
            className="mb-8"
          />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            {/* Ảnh lớn — bấm để phóng to xem toàn cảnh */}
            <Reveal>
              <ImageZoom
                thumbSrc={product.image}
                fullSrc={productImage(product.id, "full")}
                alt={product.name}
                category={product.category}
                accent={accent}
              />
            </Reveal>

            {/* Thông tin */}
            <Reveal stagger className="lg:pt-4">
              <p
                className="eyebrow"
                style={{ color: accent }}
              >
                Nghề {product.category}
              </p>
              <h1 className="mt-4 font-display text-3xl leading-[1.12] text-ink sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              {product.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-7 text-pretty text-lg leading-8 text-ink-soft">
                {product.description}
              </p>

              {/* Liên hệ đặt làm */}
              <div className="mt-9 rounded-2xl border border-line bg-white/70 p-6">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                  Đặt làm & liên hệ
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  Mỗi sản phẩm được làm thủ công theo yêu cầu. Liên hệ để được
                  tư vấn về kích thước, chất liệu và thời gian hoàn thiện.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium text-paper shadow-[var(--shadow-soft)] transition duration-300"
                    style={{ background: accent }}
                  >
                    Gọi {site.phone}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line px-6 text-sm font-medium text-ink transition duration-300 hover:border-son hover:text-son"
                  >
                    Gửi email
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <TransitionLink
                  href="/san-pham"
                  className="text-sm text-ink-soft transition hover:text-son"
                >
                  ← Về tất cả sản phẩm
                </TransitionLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Sản phẩm liên quan */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                Sản phẩm cùng nhóm nghề
              </h2>
            </Reveal>
            <Reveal
              stagger
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Reveal>
          </Container>
        </section>
      )}
    </SiteShell>
  );
}
