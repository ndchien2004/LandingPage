import { cn } from "@/lib/utils";

type PlaceholderProps = {
  /** Đường dẫn ảnh thật sau này (hiện chưa dùng — đang là placeholder). */
  src?: string;
  /** Nhãn mô tả nội dung ảnh. */
  label?: string;
  /** Màu nhấn của khối placeholder. */
  accent?: string;
  className?: string;
  /** Hiển thị dòng "Ảnh minh họa". */
  showHint?: boolean;
};

/**
 * Khối ảnh placeholder có gu thẩm mỹ, gợi texture giấy / nan quạt.
 * Khi có ảnh thật, có thể thay component này bằng <Image /> của Next.
 */
export function Placeholder({
  label = "Ảnh minh họa",
  accent = "#b23a2e",
  className,
  showHint = true,
}: PlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl",
        className,
      )}
      style={{
        backgroundColor: "var(--color-paper-2)",
        backgroundImage: `radial-gradient(120% 120% at 80% 0%, ${accent}22 0%, transparent 55%), radial-gradient(100% 100% at 0% 100%, ${accent}14 0%, transparent 50%)`,
      }}
      aria-hidden="true"
    >
      {/* Hoa văn nan quạt mảnh */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `repeating-linear-gradient(115deg, ${accent}33 0 1px, transparent 1px 22px)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 0 1px var(--color-line)",
          borderRadius: "1rem",
        }}
      />
      <div className="relative z-10 px-6 text-center">
        <span
          className="mx-auto mb-3 block h-10 w-10 rounded-full"
          style={{ backgroundColor: `${accent}` , opacity: 0.85 }}
        />
        <p className="font-display text-base text-ink-soft">{label}</p>
        {showHint && (
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-muted">
            Ảnh minh họa
          </p>
        )}
      </div>
    </div>
  );
}
