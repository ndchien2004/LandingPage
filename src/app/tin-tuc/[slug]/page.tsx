import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  articles,
  getArticle,
  type Article,
  type ArticleBlock,
  type ArticleMediaImage,
} from "@/data/articles";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return { title: "Tin tức" };
  return { title: article.title, description: article.excerpt };
}

/* ------------------------------------------------------------------ */
/* Bố cục biên tập: gom block thành từng phần (heading + đoạn văn),    */
/* rồi chia đều ảnh của bài vào các phần — cột ảnh xen kẽ trái/phải,   */
/* ảnh dư của phần xếp thành dải masonry tràn chiều ngang.             */
/* ------------------------------------------------------------------ */

type BodyBlock = Extract<ArticleBlock, { type: "paragraph" | "quote" }>;
type Section = { heading?: string; body: BodyBlock[] };

function toSections(blocks: ArticleBlock[]): Section[] {
  const sections: Section[] = [];
  for (const block of blocks) {
    if (block.type === "heading") {
      sections.push({ heading: block.text, body: [] });
    } else {
      if (sections.length === 0) sections.push({ body: [] });
      sections[sections.length - 1].body.push(block);
    }
  }
  return sections;
}

/** Chia `total` phần tử vào `buckets` giỏ đều nhau, phần dư dồn lên đầu. */
function distribute(total: number, buckets: number): number[] {
  const base = Math.floor(total / buckets);
  const extra = total % buckets;
  return Array.from({ length: buckets }, (_, i) => base + (i < extra ? 1 : 0));
}

function SectionText({ section }: { section: Section }) {
  return (
    <>
      {section.heading && (
        <h2 className="mb-6 flex items-baseline gap-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
          <span className="hidden h-px w-8 shrink-0 translate-y-[-0.35rem] bg-son sm:inline-block" />
          {section.heading}
        </h2>
      )}
      <div className="space-y-5">
        {section.body.map((block, i) =>
          block.type === "quote" ? (
            <blockquote
              key={i}
              className="my-8 border-l-2 border-son pl-6 font-display text-xl leading-relaxed text-ink sm:text-2xl"
            >
              “{block.text}”
            </blockquote>
          ) : (
            <p key={i} className="text-base leading-8 text-ink-soft">
              {block.text}
            </p>
          ),
        )}
      </div>
    </>
  );
}

function SideImages({ images }: { images: ArticleMediaImage[] }) {
  return (
    <div className="space-y-5 lg:sticky lg:top-28">
      {images.map((image) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={1600}
          height={1200}
          sizes="(min-width: 1024px) 34rem, 100vw"
          className="h-auto w-full rounded-2xl border border-line shadow-[var(--shadow-soft)]"
        />
      ))}
    </div>
  );
}

function ImageBand({ images }: { images: ArticleMediaImage[] }) {
  return (
    <div className="mt-10 gap-5 space-y-5 sm:columns-2 lg:columns-3">
      {images.map((image) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={1600}
          height={1200}
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full break-inside-avoid rounded-2xl border border-line shadow-[var(--shadow-soft)]"
        />
      ))}
    </div>
  );
}

function ArticleVideo({ video, className }: { video: NonNullable<Article["video"]>; className?: string }) {
  return (
    <video
      src={video.src}
      poster={video.poster}
      controls
      playsInline
      preload="metadata"
      className={className}
    />
  );
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const sections = toSections(article.blocks);
  const counts = distribute(article.gallery.length, sections.length);

  // Cắt gallery theo số lượng đã chia cho từng phần.
  let cursor = 0;
  const sectionImages = counts.map((count) => {
    const slice = article.gallery.slice(cursor, cursor + count);
    cursor += count;
    return slice;
  });

  // Video dọc đứng cạnh phần mở đầu như một cột ảnh; video ngang tràn chiều rộng.
  const portraitVideo = article.video?.portrait ? article.video : undefined;
  const landscapeVideo = article.video && !article.video.portrait ? article.video : undefined;

  return (
    <SiteShell>
      <PageHero
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/tin-tuc" },
          { label: article.title },
        ]}
        eyebrow={`${article.category} · ${article.date} · ${article.readingTime}`}
        title={article.headline}
        subtitle={article.lead}
      />

      <article className="py-14 sm:py-20">
        {/* Video ngang: dải media mở đầu tràn container */}
        {landscapeVideo && (
          <Container className="mb-14 sm:mb-20">
            <Reveal>
              <ArticleVideo
                video={landscapeVideo}
                className="aspect-video w-full rounded-2xl border border-line bg-black shadow-[var(--shadow-soft)]"
              />
            </Reveal>
          </Container>
        )}

        <Container className="space-y-16 sm:space-y-24">
          {sections.map((section, i) => {
            const images = sectionImages[i];
            // Cột media: tối đa 2 ảnh (3 ảnh trở lên → 1 ảnh cột + phần dư xuống dải ngang).
            const side = images.length >= 3 ? images.slice(0, 1) : images;
            const band = images.length >= 3 ? images.slice(1) : [];
            const sideVideo = i === 0 ? portraitVideo : undefined;
            const hasMedia = side.length > 0 || sideVideo;
            const mediaLeft = i % 2 === 1;

            if (!hasMedia) {
              return (
                <Reveal key={i} className="mx-auto max-w-3xl">
                  <SectionText section={section} />
                </Reveal>
              );
            }

            return (
              <section key={i}>
                <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
                  <Reveal
                    className={
                      mediaLeft ? "lg:col-span-7 lg:order-2" : "lg:col-span-7"
                    }
                  >
                    <SectionText section={section} />
                  </Reveal>
                  <Reveal
                    className={
                      mediaLeft ? "lg:col-span-5 lg:order-1" : "lg:col-span-5"
                    }
                  >
                    {sideVideo ? (
                      <div className="lg:sticky lg:top-28">
                        <ArticleVideo
                          video={sideVideo}
                          className="mx-auto max-h-[76vh] w-auto rounded-2xl border border-line bg-black shadow-[var(--shadow-soft)]"
                        />
                        {side.length > 0 && (
                          <div className="mt-5">
                            <SideImages images={side} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <SideImages images={side} />
                    )}
                  </Reveal>
                </div>
                {band.length > 0 && (
                  <Reveal stagger>
                    <ImageBand images={band} />
                  </Reveal>
                )}
              </section>
            );
          })}

          {article.credit && (
            <p className="!mt-12 text-sm italic text-muted">{article.credit}</p>
          )}

          {/* Thông tin dự án & liên hệ */}
          <Reveal>
            <aside className="rounded-2xl border border-line bg-white/70 p-7 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
                <div>
                  <h2 className="font-display text-2xl text-ink">
                    Thông tin dự án và liên hệ
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    Dự án “Chàng Sơn Bách Nghệ” và chiến dịch “Gió từ Làng” là nỗ lực
                    phi thương mại của nhóm sinh viên Trường Đại học FPT nhằm khôi phục
                    và lan tỏa giá trị văn hóa truyền thống của làng nghề quạt Chàng Sơn.
                  </p>
                </div>
                <ul className="space-y-2 text-sm leading-7 text-ink-soft lg:border-l lg:border-line lg:pl-10">
                  <li>Người đại diện dự án: Lê Đăng Hưng — 0394 284 181</li>
                  <li>
                    Email:{" "}
                    <a
                      className="underline decoration-line underline-offset-4 hover:text-son"
                      href="mailto:changsonbachnghe@gmail.com"
                    >
                      changsonbachnghe@gmail.com
                    </a>
                  </li>
                  <li>
                    Fanpage:{" "}
                    <a
                      className="underline decoration-line underline-offset-4 hover:text-son"
                      href="https://www.facebook.com/Giotulang.vn/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      fb.com/Giotulang.vn
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </Container>
      </article>
    </SiteShell>
  );
}
