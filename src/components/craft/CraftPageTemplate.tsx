import Link from "next/link";
import type { Craft } from "@/data/crafts";
import { crafts } from "@/data/crafts";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CraftPageTemplate({ craft }: { craft: Craft }) {
  const others = crafts.filter((c) => c.slug !== craft.slug);

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
              <Button href="/lien-he" variant="outline">
                Liên hệ đặt làm
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
            <SectionHeading eyebrow="Về nghề" title={`Câu chuyện ${craft.name.toLowerCase()}`} />
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
              eyebrow="Quy trình"
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

      {/* Sản phẩm tiêu biểu */}
      <section className="py-20 sm:py-24">
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

      {/* Điều hướng sang các nghề khác */}
      <section className="border-t border-line bg-paper-2/40 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Tiếp tục hành trình"
              title="Lật sang chương tiếp theo"
              description="Mỗi nghề là một câu chuyện riêng. Khép lại chương này, hãy bước sang một nghề khác của làng."
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-line bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <div>
                  <p
                    className="text-[0.7rem] uppercase tracking-[0.2em]"
                    style={{ color: c.accent }}
                  >
                    Chương {c.order}
                  </p>
                  <h3 className="mt-1 font-display text-xl text-ink">{c.name}</h3>
                </div>
                <span className="text-ink-soft transition group-hover:translate-x-1 group-hover:text-son">
                  →
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
