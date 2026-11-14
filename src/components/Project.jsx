import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Project() {
  return (
    <section id="projects" className="mx-auto max-w-275 scroll-mt-4 px-5 py-20">
      <SectionHeading
        number="02"
        label="PROJECTS"
        title="Things I've"
        accent="Built"
        subtitle="Projects I've built — each one a step in how I've grown."
      />

      <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}