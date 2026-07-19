import Image from "next/image";
import type { Article } from "@/data/articles";
import { TransitionLink } from "@/components/transition/TransitionLink";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <TransitionLink
      href={`/tin-tuc/${article.slug}`}
      className={
        featured
          ? "group grid overflow-hidden rounded-2xl border border-line bg-white/70 transition hover:shadow-[var(--shadow-card)] md:grid-cols-2"
          : "group flex flex-col overflow-hidden rounded-2xl border border-line bg-white/70 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
      }
    >
      <div
        className={
          featured
            ? "relative min-h-56 overflow-hidden"
            : "relative aspect-[16/10] overflow-hidden"
        }
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        {article.video && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
            <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current" aria-hidden>
              <path d="M4 2.5v11l9-5.5-9-5.5z" />
            </svg>
            Video
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-muted">
          <span className="font-semibold text-son">{article.category}</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>{article.date}</span>
        </div>
        <h3
          className={
            featured
              ? "mt-3 font-display text-2xl leading-snug text-ink sm:text-3xl"
              : "mt-3 font-display text-xl leading-snug text-ink"
          }
        >
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">
          {article.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="text-muted">{article.readingTime}</span>
          <span className="text-ink-soft transition group-hover:text-son">
            Đọc tiếp →
          </span>
        </div>
      </div>
    </TransitionLink>
  );
}
