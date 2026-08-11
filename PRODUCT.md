# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences land here, with **no single primary** — confirmed by the user. Design for the skimmer first, with depth underneath for the other two.

1. **Recruiters and screeners**, doing a 60-second skim to decide whether to advance Nick. They scan; they do not read. Nothing important may depend on sustained attention.
2. **Hiring managers for a specific role**, arriving from an application and already somewhat interested. They want proof the work is real — depth, mechanism, and evidence that survives scrutiny.
3. **People Nick sent the link to directly** — referrals, networking contacts, interviewers prepping. They give it real time. The site is backing up a conversation already in progress.

Their shared job: decide whether Nick Duncan is worth a conversation.

## Product Purpose

A personal portfolio site for Nick Duncan — a 2026 BBA graduate in Management Information Systems and Business Management (University of Hawaiʻi at Mānoa) seeking a full-time role in IT, project management, data/business analysis, or cybersecurity.

**Success is a single confirmed action: the visitor contacts him.** Email or phone. Resume downloads, case-study reads, and shortlisting are all valuable, but they are upstream of the one outcome that counts. Every path through the site should terminate somewhere reachable.

## Positioning

**The range itself is the pitch** — confirmed by the user. Business fluency and the ability to ship working software, as one capability rather than two separate résumés. A candidate who can run a PMBOK failure analysis *and* deploy a Python service to a systemd unit is not the same as either specialist.

The mechanism a neighboring portfolio could not truthfully copy: **Nick builds things to find out where the obvious approach breaks, and the correction is the story.** This is documented, not asserted — the Telegram news collector's nine-stage pipeline exists because each intuitive version was measurably wrong (nine "independent" domains turned out to be one wire service under nine mastheads; GDELT's 429s were saturation, not caller rate-limiting; a topicality filter would have dropped 11 of 16 delivered stories). Most junior portfolios show what was built. This one can show what was *learned by measurement* and what changed because of it.

Known risk the user accepted: "generalist" reads as unfocused unless the combination is made to feel deliberate. Making the range legible as a single argument — rather than a list of unrelated tracks — is a standing design problem for this site, not a solved one.

## Operating Context

- Visitors arrive from a job application, LinkedIn, GitHub, a resume link, or a direct message from Nick. Assume no prior context and no patience for a preamble.
- The audience is split between people evaluating on a phone between meetings and people reading on a desktop with a browser tab open next to an ATS.
- The résumé PDF (`public/resume.pdf`) is what actually travels through an employer's hiring process. The site is the richer front door to it, not its replacement.
- Deep artifacts are **long-form PDFs** (18–2,600 KB business and PM papers). Reading them in full is a deliberate, minority action; the site must convey their substance without requiring it.
- Content is authored in two files: `data/profile.ts` (bio, experience, education, skills, contact) and `data/projects.ts` (case studies). Adding a project means copying one object in an array — no other file changes. Future work must preserve this single-source-of-truth arrangement.

## Capabilities and Constraints

- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion 13, Lenis smooth scroll. Deployed via Vercel (`.vercel/` present).
- **Routes:** `/` (home), `/about`, `/work`, `/work/[slug]` (case study), plus a 404.
- **Home composition:** Hero → AboutTeaser → ResumeSection → SelectedWork → ContactBlock.
- **Case study shape:** header, problem, approach, outcome, optional outcome metrics, optional screenshot, optional embedded PDF viewer, optional GitHub and live-demo links.
- **Project categories:** `IT`, `PM` (labeled "Project Management"), `Data`, `Security`. `Security` is declared in the type but no project currently uses it.
- Light/dark theming with a no-flash inline script; the initial theme follows `prefers-color-scheme` and persists to `localStorage`.
- Motion is opt-out-aware throughout: `useReducedMotion` gates SplitText, RevealOnScroll, PageTransition, and disables Lenis entirely in favor of native scroll; `globals.css` carries a `prefers-reduced-motion` block.
- Screenshots render **uncropped at their own aspect ratio** so phone captures survive — a deliberate constraint, not an oversight.
- **Open / undecided:** whether a `Security` project will ever exist; whether the site has a custom domain (not evidenced in-repo); Nick's exact availability date — the education record runs 2021–2026 and the DRPSEC internship ends May 2026, so "currently seeking" is accurate as of August 2026 and should be re-confirmed before being restated as fact.

## Brand Commitments

- **Name:** Nick Duncan. (Repo and directory use "Nicholas Duncan"; the site's own voice uses "Nick.")
- **Tagline:** "Business systems, translated into working software." — in use as the site title and the positioning line.
- **Voice, as written:** plain, specific, and evidence-led. Concrete numbers over adjectives; the existing copy says "1.2% → 14.1%" rather than "significantly improved." Willing to state where an approach was wrong. No hype, no superlatives about himself.
- **Existing assets:** Space Grotesk + DM Sans, a grain overlay, a theme toggle, scroll progress bar. These are the incumbent visual system, recorded here as fact — not as a commitment. Whether to preserve or replace them is a design decision, not product truth.

## Evidence on Hand

Everything below is real and already in the repository. **Nothing here may be embellished, and no new metric, employer, testimonial, client, or credential may be invented.**

- **7 case studies** in `data/projects.ts`, each with real problem/approach/outcome prose and, in most cases, verified metrics.
- **5 full papers** in `public/papers/` — Boeing balanced scorecard, campus parking redevelopment, Challenger failure analysis, internship-matching database, Kai Motion.
- **1 production screenshot** — `public/projects/telegram-news-collector/digest.png`, a real delivered digest.
- **1 live demo** — SwingScore at `itm352-swingscore.onrender.com`.
- **2 public repos** — the Telegram news collector and the swing-score calculator, under `github.com/thisisnickduncan`.
- **Résumé PDF** at `public/resume.pdf` (present; the README's note that it is missing is stale).
- **Photos:** `public/images/nick-duncan.png` and a cutout version.
- **Contact:** thisisnickduncan@gmail.com, (949) 357-8629, Laguna Niguel, CA, LinkedIn, GitHub.
- **Credentials:** Google AI Essentials; Six Sigma White Belt; major coursework GPA 3.8.
- **Roles:** IT Intern at DRPSEC; Associate Financial Advisor Intern at Northwestern Mutual; bartender/server at Tiki's Grill & Bar (Waikīkī, 500–700+ guests per shift); Co-Founder & COO of Kai Motion, an operating ocean-education venture with paid bookings.
- **Absences future work must not paper over:** no client testimonials, no professional references, no employer logos, no press, no user counts, no revenue for Kai Motion beyond its own projections (which are modeled, not achieved, and must stay labeled as projections).

## Product Principles

1. **Survive the skim, reward the read.** The 60-second visitor must leave with the argument intact; the 20-minute visitor must find that the depth was real. Neither audience may be served by starving the other.
2. **The range is one argument, not four.** Business analysis, PM, IT, and data are evidence for a single claim — that Nick can translate a business problem into a working system. Presenting them as separate tracks concedes the "unfocused generalist" reading.
3. **Show the correction, not just the artifact.** What makes this portfolio different is documented reasoning about where the obvious approach failed. Surfaces that reduce projects to titles and tool lists throw away the actual advantage.
4. **Every road ends at contact.** Contact is the one confirmed success condition. No dead ends, no terminal page without a way to reach him.
5. **Only what's true.** Real metrics, real roles, real artifacts. Projections stay labeled as projections. When evidence is missing, the answer is to omit or to ask Nick for it — never to invent it.

## Accessibility & Inclusion

No formal standard was specified, but the codebase has an established baseline that future work must not regress: full `prefers-reduced-motion` support across all motion (including disabling smooth scroll), light and dark themes with a no-flash initial paint, and images with reserved dimensions. Because a screener may open this on any device in any condition, phone-first legibility and non-motion-dependent comprehension are working requirements.
