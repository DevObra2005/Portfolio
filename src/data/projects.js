import { Flame, Landmark, } from "lucide-react";
import heritageImg from "@/assets/projects/pangasinan-heritage.webp";
import fireopsImg from "@/assets/projects/fireops.webp";

export const projects = [
  {
    title: "FireOps",
    badge: "Capstone Project",
    icon: Flame,
    desc: "Android fire-safety training simulation. Trainees go through all eight TPASS steps, and a Laravel backend records their scores.",
    tags: ["Unity", "C#", "Laravel", "Blender"],
    live: "https://bfpfireops.com",
    download: "https://bfpfireops.com/download",
    image: fireopsImg,
    repo: "https://github.com/DevObra2005/CapstoneProject-FireOps.git",
  },
  {
    title: "Pangasinan Heritage",
    badge: "Project",
    icon: Landmark,
    desc: "Single-page tourism website for Pangasinan's heritage spots and festivals, with scroll-spy navigation and reusable detail views.",
    tags: ["Next.js", "React", "Tailwind"],
    image: heritageImg,
    live: "https://pangasinanheritage.vercel.app",
  },
];