import Image from "next/image";
import Link from "next/link";
import { cloudinaryAssets } from "@/data/cloudinaryAssets";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-grain">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={cloudinaryAssets.logo.normal.src}
                alt={site.name}
                width={260}
                height={260}
                className="h-auto w-32 object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-7 text-muted">{site.shortDesc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-line px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-ink-soft transition hover:border-son hover:text-son"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow mb-4 text-ink-soft">{col.title}</h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted transition hover:text-son"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Dự án quảng bá làng nghề
            Chàng Sơn.
          </p>
          <p className="text-muted/80">{site.address}</p>
        </div>
      </div>
    </footer>
  );
}
