import type { Craft } from "@/data/crafts";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CraftPageTemplate({ craft }: { craft: Craft }) {

  return (
    <>
      {/* Hero nghề */}
      <section
        className="relative overflow-hidden border-b border-line"
        style={{
          background: `linear-gradient(180deg, ${craft.accent}12 0%, transparent 60%)`,
        }}
      >
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <Reveal stagger>
            <p
              className="eyebrow mb-4"
              style={{ color: craft.accent }}
            >
              Chương {craft.order} — Làng nghề Chàng Sơn
            </p>
            <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              {craft.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              {craft.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/san-pham" variant="primary">
                Xem sản phẩm
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Placeholder
              label={craft.name}
              accent={craft.accent}
              className="aspect-[4/3] w-full shadow-[var(--shadow-card)]"
            />
          </Reveal>
        </Container>
      </section>

      {/* Giới thiệu nghề */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <Placeholder
              label={`Không gian ${craft.name.toLowerCase()}`}
              accent={craft.accent}
              className="aspect-[5/6] w-full"
            />
          </Reveal>
          <Reveal stagger>
            <SectionHeading eyebrow="Lịch sử" title={`Câu chuyện ${craft.name.toLowerCase()}`} />
            <div className="mt-6 space-y-5">
              {craft.intro.map((p, i) => (
                <p key={i} className="text-base leading-8 text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Giá trị */}
      <section className="border-y border-line bg-paper-2/40 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Giá trị"
              title="Điều làm nên nghề"
              description="Những giá trị cốt lõi được gìn giữ qua từng thế hệ người thợ."
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {craft.values.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-white/70 p-7"
              >
                <span
                  className="font-display text-3xl"
                  style={{ color: craft.accent }}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl text-ink">{v.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {v.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Quy trình */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Phương thức · Công đoạn"
              title="Từ nguyên liệu đến tác phẩm"
              description="Mỗi bước đều đòi hỏi sự tỉ mỉ và bàn tay lành nghề."
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {craft.process.map((step) => (
              <div key={step.step} className="relative pl-6">
                <span
                  className="absolute left-0 top-1 h-full w-px"
                  style={{ background: `${craft.accent}40` }}
                />
                <span
                  className="font-display text-2xl"
                  style={{ color: craft.accent }}
                >
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-lg text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Con người */}
      <section
        className="border-y border-line py-20 sm:py-24"
        style={{ background: `${craft.accent}0a` }}
      >
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <blockquote className="font-display text-2xl leading-snug text-ink sm:text-3xl">
              <span style={{ color: craft.accent }}>“</span>
              {craft.people.quote}
              <span style={{ color: craft.accent }}>”</span>
            </blockquote>
            <p className="mt-6 text-sm uppercase tracking-[0.16em] text-muted">
              {craft.people.author} · {craft.people.role}
            </p>
          </Reveal>
          <Reveal stagger>
            <div className="space-y-5">
              {craft.people.body.map((p, i) => (
                <p key={i} className="text-base leading-8 text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Vị trí */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal stagger>
            <SectionHeading eyebrow="Vị trí" title="Nơi nghề được sinh ra" />
            <p className="mt-6 text-base leading-8 text-ink-soft">
              {craft.name} gắn bó với làng nghề Chàng Sơn — vùng đất giàu truyền
              thống thủ công của xứ Đoài. Đây là nơi nghề được hình thành, gìn
              giữ và tiếp nối qua nhiều thế hệ người thợ.
            </p>
            <div className="mt-6 rounded-xl border border-line bg-white/70 p-5">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
                Địa chỉ
              </p>
              <p className="mt-1.5 font-display text-lg text-ink">
                {site.address}
              </p>
            </div>
          </Reveal>
          <Reveal>
            <Placeholder
              label="Bản đồ làng Chàng Sơn"
              accent={craft.accent}
              className="aspect-[16/11] w-full"
            />
          </Reveal>
        </Container>
      </section>

      {/* Sản phẩm tiêu biểu */}
      <section className="border-t border-line py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Sản phẩm tiêu biểu"
              title={`Tinh hoa ${craft.name.toLowerCase()}`}
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {craft.products.map((p) => (
              <div
                key={p.name}
                className="group overflow-hidden rounded-2xl border border-line bg-white/70"
              >
                <Placeholder
                  label={p.name}
                  accent={craft.accent}
                  className="aspect-square w-full rounded-none"
                  showHint={false}
                />
                <div className="p-5">
                  <h3 className="font-display text-base text-ink">{p.name}</h3>
                  <p className="mt-1.5 text-sm text-muted">{p.note}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <div className="mt-10">
            <Button href="/san-pham" variant="outline">
              Xem tất cả sản phẩm
            </Button>
          </div>
        </Container>
      </section>

    </>
  );
}
