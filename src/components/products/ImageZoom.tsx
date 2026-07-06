"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ImageZoomProps = {
  /** Ảnh hiển thị trong khung (bản card/fit). */
  thumbSrc: string;
  /** Ảnh độ phân giải cao dùng khi phóng to. */
  fullSrc: string;
  alt: string;
  category?: string;
  accent?: string;
};

const MIN_SCALE = 1;
const MAX_SCALE = 5;

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Khung ảnh sản phẩm bấm để phóng to. Mở overlay toàn màn hình cho phép
 * zoom (cuộn chuột / nút / chụm 2 ngón / double-click) và kéo để xem toàn cảnh.
 */
export function ImageZoom({
  thumbSrc,
  fullSrc,
  alt,
  category,
  accent = "#b23a2e",
}: ImageZoomProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  // Chỉ portal ở phía client (tránh lệch SSR)
  useEffect(() => setMounted(true), []);

  const stageRef = useRef<HTMLDivElement>(null);
  // Con trỏ đang giữ (hỗ trợ kéo 1 ngón & chụm 2 ngón)
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const dragging = useRef(false);

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    reset();
  }, [reset]);

  // Zoom quanh một điểm (theo tọa độ tương đối tâm khung)
  const zoomAt = useCallback(
    (nextScale: number, cx: number, cy: number) => {
      setScale((prev) => {
        const s = clamp(nextScale, MIN_SCALE, MAX_SCALE);
        const ratio = s / prev;
        setTx((prevTx) => cx - (cx - prevTx) * ratio);
        setTy((prevTy) => cy - (cy - prevTy) * ratio);
        if (s === MIN_SCALE) {
          setTx(0);
          setTy(0);
        }
        return s;
      });
    },
    [],
  );

  // Khóa cuộn nền + đóng bằng phím Esc khi overlay mở
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const relativeToCenter = (clientX: number, clientY: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2,
    };
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const { x, y } = relativeToCenter(e.clientX, e.clientY);
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    zoomAt(scale * factor, x, y);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale,
      };
      dragging.current = false;
    } else if (scale > 1) {
      dragging.current = true;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Chụm 2 ngón → zoom
    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const { x, y } = relativeToCenter(mid.x, mid.y);
      zoomAt(
        (pinchStart.current.scale * dist) / pinchStart.current.dist,
        x,
        y,
      );
      return;
    }

    // Kéo 1 ngón → di chuyển ảnh (khi đã phóng to)
    if (dragging.current) {
      setTx((v) => v + (e.clientX - prev.x));
      setTy((v) => v + (e.clientY - prev.y));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) dragging.current = false;
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    const { x, y } = relativeToCenter(e.clientX, e.clientY);
    zoomAt(scale > 1 ? MIN_SCALE : 2.5, x, y);
  };

  return (
    <>
      {/* Khung ảnh trong trang — bấm để mở phóng to */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-line bg-paper-2/50 shadow-[var(--shadow-card)]"
        aria-label="Phóng to ảnh sản phẩm"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbSrc}
          alt={alt}
          className="aspect-[4/5] w-full object-contain p-4 transition duration-700 group-hover:scale-[1.02]"
        />
        {category && (
          <span
            className="absolute left-4 top-4 rounded-full bg-paper/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            {category}
          </span>
        )}
        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-ink/70 px-3.5 py-1.5 text-xs font-medium text-paper backdrop-blur-sm transition group-hover:bg-ink/85">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.2-3.2M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Nhấn để phóng to
        </span>
      </button>

      {/* Overlay phóng to toàn màn hình — portal ra body để position:fixed
          bám theo viewport, không bị "nhốt" trong ancestor có transform (Reveal/GSAP). */}
      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/90 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Xem ảnh: ${alt}`}
        >
          {/* Vùng thao tác zoom/pan */}
          <div
            ref={stageRef}
            className="relative h-full w-full touch-none select-none overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={onDoubleClick}
            style={{ cursor: scale > 1 ? "grab" : "zoom-in" }}
          >
            <div className="flex h-full w-full items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fullSrc}
                alt={alt}
                draggable={false}
                className="max-h-full max-w-full object-contain"
                style={{
                  transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                  transition: dragging.current ? "none" : "transform 0.12s ease-out",
                }}
              />
            </div>
          </div>

          {/* Thanh điều khiển */}
          <div
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-ink/70 p-1.5 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <ZoomButton
              label="Thu nhỏ"
              onClick={() => zoomAt(scale / 1.4, 0, 0)}
              disabled={scale <= MIN_SCALE}
            >
              <path d="M8 12h8" />
            </ZoomButton>
            <span className="min-w-[3.25rem] text-center text-xs font-medium tabular-nums text-paper">
              {Math.round(scale * 100)}%
            </span>
            <ZoomButton
              label="Phóng to"
              onClick={() => zoomAt(scale * 1.4, 0, 0)}
              disabled={scale >= MAX_SCALE}
            >
              <path d="M12 8v8M8 12h8" />
            </ZoomButton>
            <span className="mx-1 h-5 w-px bg-white/15" />
            <ZoomButton label="Về mặc định" onClick={reset} disabled={scale === 1 && tx === 0 && ty === 0}>
              <path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6" />
            </ZoomButton>
          </div>

          {/* Nút đóng */}
          <button
            type="button"
            onClick={close}
            aria-label="Đóng"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-paper backdrop-blur-md transition hover:bg-ink/90"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          </div>,
          document.body,
        )}
    </>
  );
}

function ZoomButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-paper transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35"
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}
