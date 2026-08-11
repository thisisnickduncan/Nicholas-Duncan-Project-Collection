export type ProjectCategory = "IT" | "PM" | "Data" | "Security";

export function categoryLabel(category: ProjectCategory): string {
  return category === "PM" ? "Project Management" : category;
}

export interface OutcomeMetric {
  label: string;
  value: string;
}

export interface Screenshot {
  /** Path under /public/projects/[slug]/. */
  src: string;
  /** Natural pixel dimensions, so the image reserves its space before loading. */
  width: number;
  height: number;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  category: ProjectCategory;
  role: string;
  tools: string[];
  problem: string;
  approach: string;
  outcome: string[];
  outcomeMetrics?: OutcomeMetric[];
  githubUrl?: string;
  demoUrl?: string;
  /** Absent -> ProjectVisual renders a generated placeholder. Rendered uncropped at its own aspect ratio, so phone captures survive. */
  screenshot?: Screenshot;
  /** Full paper PDF in /public/papers/. When set, the case study renders an embedded scroll viewer + download link. */
  paperUrl?: string;
  /** Overrides the band's call to action. Defaults to "Read the case study", which
   *  only tells the truth for the written work — a shipped program is something you
   *  go and look at, and a design document is a proposal. */
  ctaLabel?: string;
}

export const DEFAULT_CTA_LABEL = "Read the case study";

export const projects: Project[] = [
  {
    slug: "telegram-news-collector",
    title: "Telegram News Collector",
    oneLiner: "A self-hosted news pipeline that clusters wire copy into real events, refuses to report anything only one newsroom covered, and delivers a bias-spread digest to Telegram on the hour.",
    category: "Data",
    role: "Sole developer — design, build, and deployment",
    tools: ["Python", "SQLite", "Anthropic API (Claude)", "Telegram Bot API", "APScheduler", "rapidfuzz", "systemd / Linux"],
    problem:
      "A news digest is only worth reading if it tells you what actually happened and who agrees on it. The obvious build — fetch articles, summarize them, require two sources — quietly fails on real data: the single most 'corroborated' story in the database had nine distinct domains and exactly one distinct headline, because Hearst, Reach plc, and the Fox O&O group all run the same wire copy under different mastheads. Counting domains measures syndication, not agreement.",
    approach:
      "Built a nine-stage pipeline where each stage exists because the intuitive version was measurably wrong. Syndicated copies are collapsed by headline similarity so a publisher chain votes once — after stripping the trailing masthead, which was dragging five identical reprints below the collapse threshold. Headlines are grouped into real-world events by a Claude Haiku pass before the fuzzy matcher, since two newsrooms covering one story often share no words. GDELT's constant HTTP 429s are answered with many short retries instead of exponential backoff, after measuring that a first request following minutes of silence still fails — the API is saturated, not rate-limiting the caller. Topicality is used to rank, never to filter, because a headline gate would have dropped 11 of 16 delivered stories. Outlets are tagged from AllSides and an MBFC-derived dataset, and any outlet in neither is excluded from the math rather than guessed at.",
    outcome: [
      "Running in production as a systemd service on an always-on VM, delivering a digest every four hours where each story carries a cross-source summary, its source list, and the Left/Center/Right spread of the outlets that ran it.",
      "Semantic event clustering raised the share of stories reaching two independent sources from 1.2% to 14.1% on identical input, and syndication collapse reduced one run's 21 domains to 7 genuine voices.",
      "Digests arrive every four hours on the hour — 12am, 4am, 8am, and so on. The scheduler starts fifteen minutes early and holds the finished digest for the target instant, so a fetch that varies from one to thirteen minutes still lands exactly on the slot rather than whenever it happens to finish.",
      "Stories that arrive with a single source are held rather than dropped, and graduate into a later digest labelled 'Now corroborated' if another newsroom picks them up.",
    ],
    outcomeMetrics: [
      { label: "Corroboration rate", value: "1.2% → 14.1%" },
      { label: "Outlets bias-rated", value: "8,774" },
      { label: "Delivery accuracy", value: "On the hour, to the second" },
    ],
    githubUrl: "https://github.com/thisisnickduncan/telegram-news-collector",
    ctaLabel: "Take a look at the program",
    screenshot: {
      src: "/projects/telegram-news-collector/digest.png",
      width: 323,
      height: 734,
      caption:
        "A delivered digest: each story carries its source list, the Left/Center/Right coverage spread, and Follow / Ask / Ignore controls.",
    },
  },
  {
    slug: "swingscore-political-analytics",
    title: "SwingScore Political Analytics Platform",
    oneLiner: "A county-level election analytics tool that scores and ranks swing-state volatility from 6M+ rows of public data.",
    category: "Data",
    role: "Database Management/Backend Development",
    tools: ["Python", "Flask", "Pandas", "SQL"],
    problem:
      "Presidential election coverage tends to focus on national or state-level polling, which obscures the county-level dynamics that actually decide outcomes in competitive swing states — there was no accessible way to rank counties by how much they matter and how volatile they are.",
    approach:
      "Processed, cleaned, and merged over 6 million rows of election and demographic data from multiple public datasets, then built backend data pipelines and a custom swing-score algorithm in Python, Flask, and Pandas to rank high-impact counties for campaign outreach, with interactive visualizations for exploring volatility trends.",
    outcome: [
      "Shipped a live analytics platform where any county in a swing state can be looked up, ranked, and compared by swing score and turnout volatility.",
      "The visualizations and ranking logic are built to support data-driven outreach decisions, not just descriptive charts.",
    ],
    outcomeMetrics: [
      { label: "Rows of data processed", value: "6M+" },
      { label: "Ranked unit", value: "Counties in swing states" },
      { label: "Status", value: "Live, public demo" },
    ],
    githubUrl: "https://github.com/thisisnickduncan/Political-Swing-Score-Calculator",
    demoUrl: "https://itm352-swingscore.onrender.com/",
    ctaLabel: "Take a look at the program",
  },
  {
    slug: "challenger-failed-project-analysis",
    title: "Failed Project Analysis: Space Shuttle Challenger",
    oneLiner: "A PMBOK-framework analysis of the Challenger disaster as a project management failure, not just an engineering one.",
    category: "PM",
    role: "Author",
    tools: [
      "PMBOK Guide (7th Edition)",
      "Risk Register",
      "Stakeholder Register",
      "Launch Readiness Dashboard Design",
      "Governance & Escalation Model",
    ],
    problem:
      "The 1986 Challenger disaster is usually explained as an O-ring engineering failure. The assignment was to analyze it instead as a project management failure — asking why a known, unresolved safety risk was allowed to pass through a project system that should have stopped it.",
    approach:
      "Mapped the case against PMBOK 7th Edition performance domains — value delivery, stakeholder engagement, systems thinking, risk and uncertainty, leadership and governance, and safety culture — to trace how schedule pressure, filtered communication, and normalization of deviance combined to override a clear no-go signal from Thiokol's engineers.",
    outcome: [
      "Concluded that the core failure was treating launch as a calendar milestone instead of a value decision, and that authority was allowed to override unresolved technical dissent.",
      "Proposed concrete corrective lessons: binding no-go criteria for unproven conditions, safety authority structurally separated from schedule authority, leading-indicator dashboards for risk signals, and redefining project success as safe mission completion rather than on-time launch.",
    ],
    outcomeMetrics: [
      { label: "PMBOK domains mapped", value: "18" },
      { label: "Corrective lessons proposed", value: "4" },
      { label: "Root cause named", value: "Governance, not the O-ring" },
    ],
    paperUrl: "/papers/challenger-failed-project-analysis.pdf",
  },
  {
    slug: "internship-matching-database",
    title: "Internship Matching Database",
    oneLiner: "A relational database design that matches BUS 395 students to internships by major and skills, with live advisor tracking.",
    category: "IT",
    role: "Database & schema design",
    tools: ["Entity-Relationship Modeling", "Relational Schema Design", "SQL"],
    problem:
      "Every BUS 395 student at the Shidler College of Business must complete an internship before graduating, but listings were scattered across email, Handshake, professors, and advisors with no way to tell which ones fit a student's major or skills — and advisors had no way to see where students stood without asking one by one.",
    approach:
      "Designed the relational data model behind the proposed system: an entity-relationship diagram and schema built around seven core tables (Student, Major, Skill, Advisor, Company, Internship, Application) plus three many-to-many connecting tables, so that a student's skills and major could be matched directly against what each internship listing required.",
    outcome: [
      "Produced a design where relevant internship matches surface automatically instead of relying on someone to manually connect a student to a listing.",
      "The same schema supports advisors pulling live status across their full caseload — applied, interviewing, or offer — replacing one-on-one status check-ins.",
    ],
    outcomeMetrics: [
      { label: "Tables in schema", value: "10" },
      { label: "Matched on", value: "Major + skills" },
      { label: "Advisor view", value: "Full caseload status" },
    ],
    paperUrl: "/papers/internship-matching-database.pdf",
    ctaLabel: "Read the proposal",
  },
  {
    slug: "kai-motion",
    title: "Kai Motion — Ocean School Venture",
    oneLiner: "Co-founded and operate a culturally grounded ocean-education business as an alternative to volume surf tourism in Waikīkī.",
    category: "PM",
    role: "Co-Founder & Chief Operating Officer",
    tools: [
      "Beachhead Market Analysis",
      "Competitive Strategy (Disruption)",
      "Financial Modeling & Cash Flow Projection",
      "Operations & Systems Design",
    ],
    problem:
      "Hawai‘i's ocean-recreation industry is built around volume tourism — fast, transactional surf lessons — leaving a gap for visitors who want a safe, culturally grounded, and environmentally responsible ocean experience, while beach pollution and cultural commercialization keep increasing with tourism volume.",
    approach:
      "As COO, I lead operations, systems, delivery, and technology for the venture, working alongside three co-founders. We selected culturally curious O‘ahu visitors as our beachhead market by scoring it against the six beachhead-market criteria, sized the opportunity using a conservative TAM model, and chose a disruption-based competitive strategy — over intellectual-property or value-chain alternatives — built around small-group lessons that combine surf instruction, ocean safety, Hawaiian culture, and stewardship.",
    outcome: [
      "Completed startup setup (registration, insurance, permits, funding via founder capital and the UH Kalo Grant) and moved into early paid bookings and service validation.",
      "Modeled a lean, service-based financial structure with a clear path to profitability, and built out the operating systems, launch phases, and partnership roadmap the business is now executing against.",
    ],
    outcomeMetrics: [
      { label: "Beachhead TAM", value: "$12.49M/yr" },
      { label: "Year 1 net profit (projected)", value: "$13,740" },
      { label: "Stage", value: "Operating, paid bookings" },
    ],
    paperUrl: "/papers/kai-motion.pdf",
  },
  {
    slug: "central-campus-parking-redevelopment",
    title: "Central Campus Parking Redevelopment",
    oneLiner: "A feasibility study and project management plan to replace a UH Mānoa surface lot with a smart, multi-level parking structure.",
    category: "PM",
    role: "Author",
    tools: [
      "Feasibility & Market Research Analysis",
      "Requirements Traceability Matrix",
      "User Stories & Use Case Modeling",
      "Swimlane Process Diagrams",
      "Risk Register",
      "Work Breakdown Structure & Milestone Timeline",
    ],
    problem:
      "UH Mānoa's central academic core — the surface lot between Shidler College of Business, George Hall, and the Architecture Building — was operating near full occupancy during peak hours, with commuter student permits selling out multiple semesters, while the lot itself used high-value land at low density.",
    approach:
      "Built a full feasibility and market-research case using the university's own transportation data and industry parking benchmarks (FHWA, VTPI), then developed a scope statement, a 26-item requirements matrix with full traceability, user stories and swimlane workflows for issue, risk, and change management, a risk register with mitigations, a six-phase work breakdown structure, and a 30-month milestone timeline for replacing the surface lot with a smart, multi-level parking structure.",
    outcome: [
      "Proposed a 4-level structure replacing roughly 70–100 surface spaces with an estimated 320, without requiring new land acquisition.",
      "Defined a phased path from feasibility through design, permitting, construction, testing, deployment, and closeout, with risk mitigations for budget overrun, construction-period parking loss, and stakeholder resistance.",
    ],
    outcomeMetrics: [
      { label: "Net capacity gain", value: "~70-100 → 320 spaces" },
      { label: "Estimated project cost", value: "$13M–$18M" },
      { label: "Delivery timeline", value: "30 months, six phases" },
    ],
    paperUrl: "/papers/central-campus-parking-redevelopment.pdf",
  },
  {
    slug: "boeing-balanced-scorecard",
    title: "Boeing Safety & Quality Turnaround: Balanced Scorecard Strategy",
    oneLiner: "A multi-framework strategic consulting report — PESTEL, Porter's Five Forces, VRIO, Value Chain, and a Balanced Scorecard turnaround plan — for Boeing's Board to fix safety and quality before scaling production again.",
    category: "PM",
    role: "Group Leader",
    tools: [
      "PESTEL Analysis",
      "Porter's Five Forces",
      "VRIO Analysis",
      "Value Chain Analysis",
      "Balanced Scorecard & Strategy Mapping",
      "Financial Modeling & Sensitivity Analysis",
    ],
    problem:
      "Following the 737 MAX crashes, the Alaska Airlines door-plug incident, and FAA production restrictions, Boeing kept declaring safety and quality as priorities without its operating processes, incentives, supplier oversight, or culture actually reflecting that commitment — the Board needed a full strategic diagnosis, not another safety pledge, to prove the gap was a strategy-execution failure and chart a way out of it.",
    approach:
      "Diagnosed Boeing's position using PESTEL, Porter's Five Forces, VRIO, and Value Chain analysis to confirm the crisis was systemic rather than isolated, then built a four-perspective Balanced Scorecard adapted for aviation — Learning & Growth, Internal Processes, Customer & Regulator Trust, and Financial Recovery — with a strategy map, a financial model comparing recovery scenarios with sensitivity analysis, and a phased 24-month implementation rollout.",
    outcome: [
      "Recommended five board-level actions: a safety-first scorecard dashboard, full integration of Spirit AeroSystems into one Boeing-controlled quality system, tying production increases to quality gates, realigning executive incentives around safety over speed, and strengthening employee stop-the-line and reporting protections.",
      "Built a financial model comparing baseline, safety-first, and downside recovery scenarios with sensitivity analysis on defect rates, rework cost, and delivery delays, showing the safety-first path was financially stronger despite a higher upfront cost.",
      "Laid out a phased 24-month rollout — freeze unsafe scaling and baseline metrics in the first 90 days, integrate Spirit and standardize quality in months 3–6, then institutionalize the scorecard into annual planning through month 24.",
    ],
    outcomeMetrics: [
      { label: "Strategic frameworks applied", value: "4" },
      { label: "Board recommendations", value: "5" },
      { label: "Implementation phases", value: "90-day / 6-mo / 24-mo" },
    ],
    paperUrl: "/papers/boeing-balanced-scorecard.pdf",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
