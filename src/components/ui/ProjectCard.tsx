import Link from "next/link";
import type { ProjectItem } from "@/data/projects";
import { Placeholder } from "./Placeholder";

/** Thẻ dự án — ảnh 16:9 + nhãn danh mục + tiêu đề (layout giống trang dự án tham chiếu). */
export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Link
      href={project.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white/70 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
    >
      <div className="relative overflow-hidden">
        <Placeholder
          label={project.title}
          accent={project.accent}
          className="aspect-[16/9] w-full rounded-none transition duration-700 group-hover:scale-[1.04]"
          showHint={false}
        />
        <span
          className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
          style={{ color: project.accent }}
        >
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-ink transition group-hover:text-son sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-muted">
          {project.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition group-hover:text-son">
          Xem chuyên đề
          <span aria-hidden="true" className="transition group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
