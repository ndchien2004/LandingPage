import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/san-pham/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white/70 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
    >
      <div className="relative aspect-square overflow-hidden bg-paper-2/50">
        <Image
          src={product.image}
          alt={product.name}
          width={1000}
          height={1000}
          className="h-full w-full object-contain p-3 transition duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-nau">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg text-ink">{product.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-end border-t border-line pt-4">
          <span className="text-sm text-ink-soft transition group-hover:text-son">
            Xem chi tiết →
          </span>
        </div>
      </div>
    </Link>
  );
}
