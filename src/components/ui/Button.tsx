import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-son text-paper hover:bg-son-deep shadow-[var(--shadow-soft)]",
  outline:
    "border border-line text-ink hover:border-son hover:text-son bg-transparent",
  ghost: "text-ink hover:text-son bg-transparent",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
