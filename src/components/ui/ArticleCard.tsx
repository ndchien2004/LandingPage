import type { Article } from "@/data/articles";
import { Placeholder } from "./Placeholder";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <article
      className={
        featured
          ? "group grid overflow-hidden rounded-2xl border border-line bg-white/70 transition hover:shadow-[var(--shadow-card)] md:grid-cols-2"
          : "group flex flex-col overflow-hidden rounded-2xl border border-line bg-white/70 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
      }
    >
      <div className="overflow-hidden">
        <Placeholder
          label={article.title}
          accent="#7a3b2e"
          className={
            featured
              ? "h-full min-h-56 w-full rounded-none transition duration-700 group-hover:scale-[1.03]"
              : "aspect-[16/10] w-full rounded-none transition duration-700 group-hover:scale-[1.03]"
          }
          showHint={false}
        />
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
    </article>
  );
}
