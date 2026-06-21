import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Về làng nghề Chàng Sơn — lịch sử, bản sắc, con người và giá trị văn hóa của một vùng đất giàu truyền thống thủ công.",
};

const identity = [
  {
    title: "Lịch sử lâu đời",
    body: "Chàng Sơn là một trong những làng nghề truyền thống lâu đời của xứ Đoài, nổi tiếng với nghề làm quạt, nghề mộc và nhiều nghề thủ công tinh xảo khác.",
  },
  {
    title: "Bản sắc thủ công",
    body: "Mỗi sản phẩm của làng đều mang dấu ấn của bàn tay người thợ — sự tỉ mỉ, kiên nhẫn và một gu thẩm mỹ được truyền lại qua nhiều thế hệ.",
  },
  {
    title: "Con người giữ nghề",
    body: "Đằng sau danh tiếng của làng là những nghệ nhân lặng lẽ, gắn bó cả đời với nghề và xem việc giữ nghề như giữ lấy cội rễ của mình.",
  },
];

const facts = [
  { label: "Vị trí", value: "Thạch Thất, Hà Nội" },
  { label: "Nghề tiêu biểu", value: "Quạt · Mộc · Sơn · Tre" },
  { label: "Tinh thần", value: "Thủ công truyền thống" },
];

export default function GioiThieuPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Giới thiệu"
        title="Làng nghề Chàng Sơn"
        subtitle="Một vùng đất nơi nghề thủ công không chỉ là sinh kế, mà là bản sắc, là ký ức và là niềm tự hào được trao truyền qua bao thế hệ."
      />

      {/* Tổng quan */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal stagger>
            <SectionHeading
              eyebrow="Vùng đất & con người"
              title="Nơi gió mang theo hơi thở của nghề"
            />
            <div className="mt-6 space-y-5 text-base leading-8 text-ink-soft">
              <p>
                Nằm ở huyện Thạch Thất, Hà Nội, Chàng Sơn từ lâu đã được biết
                đến như một cái nôi của nghề thủ công truyền thống. Tiếng lành về
                những chiếc quạt, những công trình gỗ và sự khéo léo của người
                thợ nơi đây đã vượt ra khỏi lũy tre làng.
              </p>
              <p>
                Ở Chàng Sơn, nghề và đời gắn bó làm một. Nhịp sống của làng hòa
                cùng nhịp của nghề — từ tiếng chẻ tre, tiếng đục gỗ đến những
                ngày phơi quạt, ủ sơn. Tất cả tạo nên một không gian văn hóa
                sống động và bền bỉ.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/du-an">Tìm hiểu dự án Gió Từ Làng</Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Placeholder
              label="Một góc làng Chàng Sơn"
              accent="#b23a2e"
              className="aspect-[4/5] w-full shadow-[var(--shadow-card)]"
            />
          </Reveal>
        </Container>
      </section>

      {/* Bản sắc */}
      <section className="border-y border-line bg-paper-2/40 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Bản sắc"
              title="Điều làm nên Chàng Sơn"
              align="center"
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {identity.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-white/70 p-7"
              >
                <h3 className="font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Giá trị văn hóa + thông tin nhanh */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Placeholder
              label="Nghệ nhân làng nghề"
              accent="#7a3b2e"
              className="aspect-[5/6] w-full"
            />
          </Reveal>
          <Reveal stagger>
            <SectionHeading
              eyebrow="Giá trị văn hóa"
              title="Giữ nghề là giữ lấy cội rễ"
            />
            <p className="mt-6 text-base leading-8 text-ink-soft">
              Trong dòng chảy hiện đại, nhiều làng nghề đứng trước nguy cơ mai
              một. Việc gìn giữ và lan tỏa giá trị của làng nghề Chàng Sơn không
              chỉ là bảo tồn một nghề, mà là giữ lại một phần ký ức và bản sắc
              của văn hóa Việt.
            </p>
            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-line bg-white/70 p-4"
                >
                  <dt className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-display text-base text-ink">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
