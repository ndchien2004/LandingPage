import { TransitionLink } from "@/components/transition/TransitionLink";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-line">/</span>}
            {item.href && !last ? (
              <TransitionLink href={item.href} className="transition hover:text-son">
                {item.label}
              </TransitionLink>
            ) : (
              <span className="text-ink-soft">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
