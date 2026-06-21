import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ với dự án Gió Từ Làng — quảng bá làng nghề Chàng Sơn. Thông tin liên hệ, địa chỉ và mạng xã hội.",
};

const contactInfo = [
  { label: "Email", value: site.email },
  { label: "Điện thoại", value: site.phone },
  { label: "Địa chỉ", value: site.address },
];

export default function LienHePage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
        eyebrow="Liên hệ"
        title="Kết nối cùng Gió Từ Làng"
        subtitle="Bạn quan tâm tới làng nghề Chàng Sơn, muốn tìm hiểu sản phẩm hay đồng hành cùng dự án? Hãy để lại lời nhắn cho chúng tôi."
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Thông tin liên hệ */}
          <Reveal stagger>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="rounded-2xl border border-line bg-white/70 p-6"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                    {info.label}
                  </p>
                  <p className="mt-2 font-display text-lg text-ink">
                    {info.value}
                  </p>
                </div>
              ))}

              {/* Mạng xã hội */}
              <div className="rounded-2xl border border-line bg-white/70 p-6">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                  Mạng xã hội
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {site.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-soft transition hover:border-son hover:text-son"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Bản đồ placeholder */}
              <Placeholder
                label="Bản đồ làng Chàng Sơn"
                accent="#7a3b2e"
                className="aspect-[16/10] w-full"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
