import { Mail } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";

export const email = "dev.obra2005@gmail.com";

export const socials = [
  { label: "GitHub", href: "https://github.com/DevObra2005", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mark-joemarie-obra-795a79440", icon: FaLinkedinIn },
  { label: "Facebook", href: "https://www.facebook.com/joemarie.obra.77#", icon: FaFacebookF },
  { label: "Email", href: `mailto:${email}`, icon: Mail },
];