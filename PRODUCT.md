# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary audiences, weighted equally:

- **Hiring visitors:** recruiters, HR screeners and tech leads looking at a 4th-year BS Information Technology student for an internship, part-time role or first junior position. They skim quickly, then check projects, the resume PDF and GitHub.
- **Freelance clients:** small businesses or individuals who need a website, management system, dashboard or Android app built, and who want proof the work actually gets delivered.

Both arrive mostly from links (resume, LinkedIn, GitHub, Facebook, direct shares) and judge in seconds whether the person behind the site can actually build.

## Product Purpose

Personal portfolio of Mark Joemarie Obra (brand handle: **devobra**), a software developer and BS IT student at Urdaneta City University in Pangasinan, Philippines. It exists to get him his first real-world experience (internship, part-time work or freelance) by showing working projects, the stack behind them and an easy way to reach him.

Success means a qualified visitor reaches out through the contact form or email, or downloads the resume.

## Positioning

What this portfolio can truthfully claim and most student portfolios cannot:

1. **Ships end to end:** builds the whole product, from database schema and Laravel REST API to the React/Next.js interface.
2. **Web + Android range:** has shipped a Unity/Android app (FireOps) alongside web work, which most web-only students can't show.
3. **Real, live work:** projects are deployed and running (bfpfireops.com, pangasinanheritage.vercel.app), not just repos.
4. **Learns by owning it:** uses AI tools (Claude, ChatGPT) to understand the "why" behind the code, so he can read, change and own what he ships.

## Operating Context

- Single-page site with anchored sections: Home, About (with Education and Tech Stack), Projects, Gallery, Contact, plus a footer.
- Light/dark theme toggle (next-themes).
- Visitors land on it from a resume, LinkedIn, GitHub or Facebook, on phone and on desktop.
- Contact form doesn't use a backend: on mobile it opens the visitor's email app (mailto:), on desktop it opens a pre-filled Gmail compose tab.
- Resume download: `public/obra_resume.pdf`, saved as `Mark_Joemarie_Obra_Resume.pdf`.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router; breaking changes from older versions, see AGENTS.md), React 19, Tailwind CSS 4, lucide-react, react-icons, next-themes. Deploys to Vercel.
- Content lives in `src/data/` (projects, services, stack, gallery, socials, navigation). Add new content there, not hard-coded in components.
- Services offered: Web Applications (full-stack), Mobile Apps (Android), Backend & APIs.
- Availability as stated: open to part-time roles, freelance projects and internships.
- Undecided: graduation date, rates/pricing, and any timeline for when he's available. Don't state these until confirmed.

## Brand Commitments

- Name: Mark Joemarie Obra. Handle/wordmark: `devobra_` (the logo component lives in `src/components/Logo.jsx`).
- Voice: first person, plain, humble and curious. A learner who builds and keeps going until it works. The footer sign-off "Still learning. Still building." is part of the identity.
- Site copy is in English. Code comments are often in Filipino/Taglish, and that's fine.

## Evidence on Hand

- **FireOps** (capstone project): Android fire-safety training simulation built in Unity. Trainees go through all eight TPASS steps, and a Laravel backend records their scores. It has a React web side and Blender assets. Live at https://bfpfireops.com, download at /download, repo at github.com/DevObra2005/CapstoneProject-FireOps. **It is a BFP-themed capstone that follows BFP fire-safety procedure. It has no formal partnership with, deployment by or endorsement from the Bureau of Fire Protection. Never claim or imply one.**
- **Pangasinan Heritage:** single-page tourism website (Next.js, React, Tailwind) with scroll-spy navigation and reusable detail views. Live at https://pangasinanheritage.vercel.app.
- Capstone defense photos (2026): `src/assets/gallery/` (defended milestone, live demo, results walkthrough, How to Play presentation).
- Project screenshots: `src/assets/projects/`. Portrait: `public/images/me.png`.
- Socials: GitHub (DevObra2005), LinkedIn (mark-joemarie-obra), Facebook.
- **Absent, so don't fabricate:** testimonials, client names, employer history, metrics or user counts, awards, and any BFP affiliation.

## Product Principles

1. **Proof over adjectives.** Every claim points to something live, downloadable or in a repo. If it can't be shown, it doesn't get said.
2. **Two audiences, one path to contact.** A recruiter and a freelance client should both reach the projects and the contact/resume options without extra steps.
3. **Honest about the stage.** He's a student looking for his first experience. That's a strength to own, not something to hide or inflate.
4. **Range shown, not listed.** The web + Android + backend range should come through in the work itself, not only in stack badges.
5. **Easy to keep current.** New projects and photos get added through `src/data/` without redesigning the site.
