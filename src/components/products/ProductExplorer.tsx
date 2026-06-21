"use client";

import { useMemo, useState } from "react";
import { products, productCategories } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { cn } from "@/lib/utils";

export function ProductExplorer() {
  const [category, setCategory] = useState<(typeof productCategories)[number]>(
    "Tất cả",
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = category === "Tất cả" || p.category === category;
      const matchQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [category, query]);

  return (
    <div>
      {/* Khu tìm kiếm & phân loại (placeholder, chưa nối backend) */}
      <div className="flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {productCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                category === c
                  ? "border-son bg-son text-paper"
                  : "border-line text-ink-soft hover:border-son hover:text-son",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <label className="relative w-full lg:w-72">
          <span className="sr-only">Tìm sản phẩm</span>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
            <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="h-11 w-full rounded-full border border-line bg-white/70 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-son"
          />
        </label>
      </div>

      {/* Kết quả */}
      <p className="mt-6 text-sm text-muted">
        {filtered.length} sản phẩm
        {category !== "Tất cả" && ` · ${category}`}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-2xl border border-dashed border-line py-16 text-center">
          <p className="font-display text-xl text-ink">Chưa tìm thấy sản phẩm</p>
          <p className="mt-2 text-sm text-muted">
            Hãy thử từ khóa khác hoặc chọn nhóm nghề khác.
          </p>
        </div>
      )}
    </div>
  );
}
