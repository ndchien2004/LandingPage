import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import {
  projectIntro,
  projectPhases,
  portfolio,
  projectStructure,
  contentRoadmap,
} from "@/data/projects";

export const metadata: Metadata = {
  title: "Dự án",
  description: projectIntro.lead,
};

export default function DuAnPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb={[
          { label: "Trang chủ", href: "/" },
          { label: "Dự án" },
        ]}
        eyebrow="Dự án Gió Từ Làng"
        title="Dự án"
        subtitle={projectIntro.lead}
      />

      {/* Cấu trúc dự án: một nghề chính + ba nghề phụ */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Cấu trúc dự án"
              title="Một nghề chính, ba nhánh phụ"
              description="Nghề quạt là trọng tâm của Gió Từ Làng, từ đó mở rộng sang mộc, sơn và tre."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_2fr] lg:items-stretch">
            {/* Dự án chính */}
            <Reveal>
              <Link
                href={projectStructure.main.href}
                className="group flex h-full flex-col justify-between rounded-3xl border-2 p-8 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                style={{
                  borderColor: projectStructure.main.accent,
                  background: `${projectStructure.main.accent}0f`,
                }}
              >
                <div>
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-paper"
                    style={{ background: projectStructure.main.accent }}
                  >
                    {projectStructure.main.role}
                  </span>
                  <h3 className="mt-5 font-display text-3xl text-ink">
                    {projectStructure.main.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {projectStructure.main.note}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-son">
                  Vào chuyên đề chính
                  <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>

            {/* Ba nhánh phụ */}
            <Reveal stagger className="grid gap-6 sm:grid-cols-3">
              {projectStructure.branches.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="group flex flex-col justify-between rounded-2xl border border-line bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
                >
                  <div>
                    <span
                      className="text-[0.66rem] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: b.accent }}
                    >
                      {b.role}
                    </span>
                    <h3 className="mt-2 font-display text-xl text-ink">{b.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{b.note}</p>
                  </div>
                  <span className="mt-5 inline-block text-sm text-ink-soft transition group-hover:text-son">
                    Khám phá →
                  </span>
                </Link>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Lưới dự án / chuyên đề — layout chính, giống trang dự án tham chiếu */}
      <section className="border-t border-line py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Chuyên đề & dự án"
              title="Các chuyên đề trong hành trình"
            />
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-7 md:grid-cols-2">
            {portfolio.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Lộ trình nội dung theo tuần */}
      <section className="border-t border-line bg-paper-2/40 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Lộ trình nội dung"
              title="Câu chuyện kể theo từng tuần"
              description="Nội dung dự án được triển khai theo lộ trình, mỗi tuần một mạch chủ đề riêng."
            />
          </Reveal>
          <div className="mt-12 space-y-6">
            {contentRoadmap.map((week) => (
              <Reveal key={week.week}>
                <div className="grid gap-5 rounded-2xl border border-line bg-white/70 p-6 sm:p-8 lg:grid-cols-[0.8fr_2.2fr]">
                  <div className="lg:border-r lg:border-line lg:pr-6">
                    <span className="font-display text-2xl text-son">
                      {week.week}
                    </span>
                    <p className="mt-1 text-sm text-muted">{week.theme}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {week.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-paper px-4 py-1.5 text-sm text-ink-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/tin-tuc" variant="outline">
              Đọc các bài viết trong lộ trình
            </Button>
          </div>
        </Container>
      </section>

      {/* Hành trình dự án — giữ mạch kể chuyện */}
      <section className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Phương pháp"
              title="Cách câu chuyện được kể"
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

      {/* CTA */}
      <section className="border-t border-line py-20 sm:py-24">
        <Container className="text-center">
          <Reveal stagger>
            <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              Cùng giữ lấy một di sản đang sống
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted">
              Mỗi lượt ghé thăm, mỗi câu chuyện được kể lại đều góp phần để làng
              nghề Chàng Sơn tiếp tục thở.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/san-pham">Xem sản phẩm</Button>
              <Button href="/lien-he" variant="outline">
                Liên hệ với chúng tôi
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </SiteShell>
  );
}
