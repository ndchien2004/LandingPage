import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  descriptionClassName?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  descriptionClassName,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="eyebrow mb-3 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-son/60" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-7 text-muted sm:text-lg", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}
