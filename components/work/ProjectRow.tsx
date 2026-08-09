import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { categoryLabel, type Project } from "@/data/projects";

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative grid cursor-pointer grid-cols-1 items-center gap-4 border-t border-border py-8 transition-colors duration-200 first:border-t-0 hover:border-accent lg:grid-cols-12"
    >
      <span className="font-heading text-sm text-muted lg:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="lg:col-span-10">
        <h3 className="font-heading text-2xl font-semibold tracking-tight transition-[letter-spacing] duration-200 group-hover:tracking-wide sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted">{project.oneLiner}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Tag>{categoryLabel(project.category)}</Tag>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="hidden text-2xl text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent lg:col-span-1 lg:block lg:text-right"
      >
        &rarr;
      </span>
    </Link>
  );
}
