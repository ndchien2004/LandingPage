import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Câu chuyện, tư liệu và góc nhìn về làng nghề Chàng Sơn — nơi nghề và đời hòa làm một.",
};

export default function TinTucPage() {
  const [featured, ...rest] = articles;

  return (
    <SiteShell>
      <PageHero
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức" }]}
        eyebrow="Tin tức & câu chuyện"
        title="Chuyện kể từ làng"
        subtitle="Những câu chuyện về nghề, về người và về vùng đất Chàng Sơn — góp nhặt để cùng nhau giữ lấy một di sản sống."
      />

      <section className="py-16 sm:py-20">
        <Container>
          {/* Bài nổi bật */}
          <Reveal>
            <ArticleCard article={featured} featured />
          </Reveal>

          {/* Danh sách bài còn lại */}
          <Reveal stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
