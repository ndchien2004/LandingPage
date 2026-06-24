"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type HeaderProps = {
  /** "overlay" cho homepage (đè lên hero), "solid" cho các trang còn lại. */
  variant?: "overlay" | "solid";
};

export function Header({ variant = "solid" }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Khóa cuộn nền khi mở menu mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const elevated = scrolled || variant === "solid";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Thanh chính nền giấy */}
      <div
        className={cn(
          "bg-paper transition-shadow duration-500",
          elevated
            ? "shadow-[0_10px_30px_-18px_rgba(60,38,18,0.55)]"
            : "shadow-[0_6px_20px_-18px_rgba(60,38,18,0.4)]",
        )}
      >
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:h-20 sm:px-8">
          {/* Logo */}
          <TransitionLink
            href="/"
            className="flex min-w-0 items-center gap-2.5 justify-self-start"
            onClick={() => setOpen(false)}
          >
            <span className="flex shrink-0 items-center">
              <Image
                src={cloudinaryAssets.logo.transparent.src}
                alt={site.name}
                width={180}
                height={80}
                priority
                className="h-10 w-auto object-contain sm:h-12"
              />
            </span>
            <span className="hidden min-w-0 flex-col leading-none sm:flex">
              <span className="font-display text-lg tracking-wide text-son">
                {site.name}
              </span>
              <span className="mt-0.5 text-[0.6rem] uppercase tracking-[0.24em] text-muted">
                Làng nghề Chàng Sơn
              </span>
            </span>
          </TransitionLink>

          {/* Nav giữa (desktop) */}
          <nav className="col-start-2 hidden items-center gap-7 justify-self-center lg:flex">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative font-display text-[0.82rem] uppercase tracking-[0.16em] transition-colors duration-300",
                    active ? "text-son" : "text-nau hover:text-son",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 h-[2px] rounded-full bg-gradient-to-r from-son to-dat transition-all duration-300",
                      active
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100 group-focus-visible:w-full group-focus-visible:opacity-100",
                    )}
                  />
                </TransitionLink>
              );
            })}
          </nav>

          {/* Actions — ghim cột cuối để luôn sát phải (nav giữa display:none trên
              mobile sẽ bị loại khỏi lưới, nếu không ghim sẽ dồn vào giữa) */}
          <div className="col-start-3 flex items-center gap-1.5 justify-self-end sm:gap-2">
            <button
              type="button"
              aria-label="Tìm kiếm"
              className="flex h-10 w-10 items-center justify-center rounded-full text-nau transition hover:bg-son/10 hover:text-son"
            >
              <SearchIcon className="h-[1.15rem] w-[1.15rem]" />
            </button>
            <button
              type="button"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-son transition hover:bg-son/10 lg:hidden"
            >
              {open ? <CloseIcon className="h-[1.15rem] w-[1.15rem]" /> : <MenuIcon className="h-[1.15rem] w-[1.15rem]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      <div className={cn("lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
        <div
          className={cn(
            "fixed inset-0 top-16 bg-ink/30 transition-opacity duration-300 sm:top-20",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <nav
          className={cn(
            "fixed inset-x-0 top-16 origin-top bg-paper px-5 pb-8 pt-2 shadow-[0_18px_40px_-24px_rgba(60,38,18,0.5)] transition duration-300 sm:top-20 sm:px-8",
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          {mainNav.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block border-b border-line/70 py-3.5 font-display text-lg uppercase tracking-[0.12em]",
                isActive(item.href) ? "text-son" : "text-nau",
              )}
            >
              {item.label}
            </TransitionLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* --- Icons (dùng tiết chế) --- */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
