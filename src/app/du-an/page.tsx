import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { crafts } from "@/data/crafts";
import {
  projectIntro,
  projectReasons,
  projectGoals,
  projectPhases,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "Dự án",
  description: projectIntro.lead,
};

export default function DuAnPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Dự án"
        title={projectIntro.title}
        subtitle={projectIntro.lead}
      />

      {/* Giới thiệu dự án */}
      <section className="py-20 sm:py-24">
        <Container size="narrow">
          <Reveal stagger>
            <SectionHeading eyebrow="Hành trình" title="Vì sao có Gió Từ Làng" />
            <div className="mt-6 space-y-5 text-base leading-8 text-ink-soft">
              {projectIntro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Lý do thực hiện */}
      <section className="border-y border-line bg-paper-2/40 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Lý do"
              title="Ba điều thôi thúc chúng tôi bắt đầu"
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {projectReasons.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-white/70 p-7"
              >
                <span className="font-display text-3xl text-son">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl text-ink">{r.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {r.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Mục tiêu */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Mục tiêu" title="Điều dự án hướng tới" />
          </Reveal>
          <Reveal stagger as="ul" className="space-y-4">
            {projectGoals.map((goal, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-line bg-white/70 p-5"
              >
                <span className="font-display text-lg text-son">↳</span>
                <span className="text-base leading-7 text-ink-soft">{goal}</span>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Cấu trúc nội dung / giai đoạn */}
      <section className="border-y border-line bg-paper-2/40 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Cấu trúc"
              title="Bốn bước của hành trình"
              description="Từ lắng nghe đến lan tỏa, mỗi bước đưa câu chuyện làng nghề tiến gần hơn tới công chúng."
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projectPhases.map((phase) => (
              <div
                key={phase.phase}
                className="rounded-2xl border border-line bg-white/70 p-6"
              >
                <span className="font-display text-2xl text-son">
                  {phase.phase}
                </span>
                <h3 className="mt-3 font-display text-lg text-ink">
                  {phase.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {phase.description}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Nhánh khám phá */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Bốn nhánh khám phá"
              title="Dự án chính & các nhánh nghề"
              description="Nghề quạt là hướng đi trọng tâm, mở rộng sang mộc, sơn và tre."
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {crafts.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group rounded-2xl border border-line bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <p
                  className="text-[0.7rem] uppercase tracking-[0.2em]"
                  style={{ color: c.accent }}
                >
                  Ải {c.order}
                </p>
                <h3 className="mt-2 font-display text-xl text-ink">{c.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{c.kicker}</p>
                <span className="mt-4 inline-block text-sm text-ink-soft transition group-hover:text-son">
                  Khám phá →
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
