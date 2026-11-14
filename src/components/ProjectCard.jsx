import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function ProjectCard({ project, index }) {
  const { title, badge, icon: Icon, desc, tags, repo, live, download, image } = project;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl">
      {/* Thumbnail — litrato kung meron, stripes kung wala */}
      <div
        className={`relative grid aspect-[16/10] place-items-center overflow-hidden ${
          image ? "bg-surface" : "bg-foreground text-background"
        }`}
      >
        {image ? (
          <>
            <Image
              src={image}
              alt={`${title} preview`}
              fill
              sizes="(min-width: 640px) 384px, 100vw"
              placeholder="blur"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            {/* Dilim sa ibaba para mabasa ang numero */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/45 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0_14px,currentColor_14px_15px)] opacity-10" />
            <Icon
              size={52}
              strokeWidth={1.3}
              className="relative transition duration-500 group-hover:scale-110 group-hover:-rotate-6"
            />
          </>
        )}

        <span className="absolute top-3 left-3 rounded-md bg-background px-2 py-1 font-mono text-[10px] tracking-wider text-foreground uppercase">
          {badge}
        </span>

        <span
          className={`absolute right-4 bottom-2 font-display text-5xl font-extrabold ${
            image ? "text-white/70" : "opacity-20"
          }`}
        >
          {number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <p className="mt-2 mb-4 flex-1 text-sm text-muted">{desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line-strong px-2.5 py-0.5 text-[11px]">
              {tag}
            </span>
          ))}
        </div>

        {(repo || live || download) && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-accent">
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <FaGithub size={15} /> Code
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <ArrowUpRight size={15} /> Live
              </a>
            )}
            {download && (
              <a href={download} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <Download size={15} /> Download App
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}