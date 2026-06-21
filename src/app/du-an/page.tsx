import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { projectIntro, projectPhases, portfolio } from "@/data/projects";

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

      {/* Lưới dự án / chuyên đề — layout chính, giống trang dự án tham chiếu */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal stagger className="grid gap-7 md:grid-cols-2">
            {portfolio.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Hành trình dự án — giữ mạch kể chuyện */}
      <section className="border-t border-line bg-paper-2/40 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Hành trình"
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
      <section className="py-20 sm:py-24">
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
