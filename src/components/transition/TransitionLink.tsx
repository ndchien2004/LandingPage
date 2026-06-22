"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "./PageTransition";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  href: string;
};

/**
 * Như next/link nhưng điều hướng kèm hiệu ứng trượt màn.
 * Vẫn giữ prefetch & ngữ nghĩa <a> (giữ nguyên SEO/accessibility);
 * chỉ chặn click thường để chèn hoạt cảnh, các click có phím bổ trợ
 * hoặc mở tab mới vẫn hoạt động như cũ.
 */
export function TransitionLink({
  href,
  onClick,
  ...props
}: TransitionLinkProps) {
  const navigate = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    e.preventDefault();
    navigate(href);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
