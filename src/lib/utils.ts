type ClassValue = string | number | false | null | undefined;

/** Gộp className có điều kiện mà không cần thêm thư viện. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
