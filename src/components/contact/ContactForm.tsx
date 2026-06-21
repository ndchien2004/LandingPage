"use client";

import { useState } from "react";

const inputClass =
  "h-12 w-full rounded-xl border border-line bg-white/70 px-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-son";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Placeholder: chưa nối backend. Hiển thị xác nhận tạm.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-white/70 p-8 text-center">
        <h3 className="font-display text-2xl text-ink">Cảm ơn bạn!</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Lời nhắn của bạn đã được ghi nhận (đây là bản demo, chưa kết nối hệ
          thống gửi thật). Chúng tôi sẽ phản hồi sớm nhất có thể.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-son transition hover:text-son-deep"
        >
          Gửi một lời nhắn khác
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white/70 p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-ink-soft">Họ và tên</span>
          <input required name="name" className={inputClass} placeholder="Nguyễn Văn A" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-ink-soft">Email</span>
          <input
            required
            type="email"
            name="email"
            className={inputClass}
            placeholder="email@vidu.com"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm text-ink-soft">Chủ đề</span>
        <input name="subject" className={inputClass} placeholder="Hợp tác, đặt làm, tìm hiểu..." />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm text-ink-soft">Lời nhắn</span>
        <textarea
          required
          name="message"
          rows={5}
          className="w-full rounded-xl border border-line bg-white/70 p-4 text-sm text-ink outline-none transition placeholder:text-muted focus:border-son"
          placeholder="Bạn muốn chia sẻ điều gì với chúng tôi?"
        />
      </label>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-son px-7 text-sm font-medium text-paper shadow-[var(--shadow-soft)] transition hover:bg-son-deep"
      >
        Gửi lời nhắn
      </button>
    </form>
  );
}
