import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
  accent?: string;
  align?: "left" | "center";
  breadcrumb?: Crumb[];
  children?: React.ReactNode;
};

/** Hero nhỏ, nhã nhặn dùng cho các trang nội dung (không phải homepage). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  subtitleClassName,
  accent = "#b23a2e",
  align = "left",
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-grain">
      {/* Vệt màu nhấn mềm */}
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: `${accent}1f` }}
      />
      <Container className="relative py-8 sm:py-12">
        {/* max-w-4xl: đủ rộng để câu dẫn không xuống dòng sớm khi màn còn diện tích */}
        <Reveal stagger className={cn("max-w-4xl", align === "center" && "mx-auto text-center")}>
          {breadcrumb && (
            <Breadcrumb
              items={breadcrumb}
              className={cn("mb-5", align === "center" && "justify-center")}
            />
          )}
          {eyebrow && (
            <p className="eyebrow mb-4" style={{ color: accent }}>
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "mt-6 text-pretty text-lg leading-8 text-muted",
                align === "center" && "mx-auto",
                subtitleClassName,
              )}
            >
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
