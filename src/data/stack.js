import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss,
  SiPhp, SiLaravel, SiMysql,
  SiUnity, SiBootstrap, SiGit, SiGithub, SiVercel, SiClaude,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandVscode, TbBrandOpenai } from "react-icons/tb";

export const stackTop = [
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#663399" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
];

export const stackBottom = [
  { name: "Unity", icon: SiUnity },
  { name: "C#", icon: TbBrandCSharp, color: "#512BD4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub },
  { name: "Vercel", icon: SiVercel },
  { name: "VS Code", icon: TbBrandVscode, color: "#007ACC" },
  { name: "Claude", icon: SiClaude, color: "#D97757", ai: true },
  { name: "ChatGPT", icon: TbBrandOpenai, ai: true },
];