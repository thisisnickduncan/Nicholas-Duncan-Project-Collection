export type ProjectCategory = "IT" | "PM" | "Data" | "Security";

export interface OutcomeMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  category: ProjectCategory;
  role: string;
  timeframe: string;
  tools: string[];
  problem: string;
  approach: string;
  outcome: string[];
  outcomeMetrics?: OutcomeMetric[];
  githubUrl?: string;
  demoUrl?: string;
  /** Absent -> ProjectVisual renders a generated placeholder. Set once a real screenshot exists in /public/projects/[slug]/. */
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "swingscore-political-analytics",
    title: "SwingScore Political Analytics Platform",
    oneLiner: "A county-level election analytics tool that scores and ranks swing-state volatility from 6M+ rows of public data.",
    category: "Data",
    role: "Developer",
    timeframe: "ITM 352 coursework",
    tools: ["Python", "Flask", "Pandas", "SQL"],
    problem:
      "Presidential election coverage tends to focus on national or state-level polling, which obscures the county-level dynamics that actually decide outcomes in competitive swing states — there was no accessible way to rank counties by how much they matter and how volatile they are.",
    approach:
      "Processed, cleaned, and merged over 6 million rows of election and demographic data from multiple public datasets, then built backend data pipelines and a custom swing-score algorithm in Python, Flask, and Pandas to rank high-impact counties for campaign outreach, with interactive visualizations for exploring volatility trends.",
    outcome: [
      "Shipped a live analytics platform where any county in a swing state can be looked up, ranked, and compared by swing score and turnout volatility.",
      "The visualizations and ranking logic are built to support data-driven outreach decisions, not just descriptive charts.",
    ],
    outcomeMetrics: [{ label: "Rows of data processed", value: "6M+" }],
    githubUrl: "https://github.com/thisisnickduncan/Political-Swing-Score-Calculator",
    demoUrl: "https://itm352-swingscore.onrender.com/",
  },
  {
    slug: "challenger-failed-project-analysis",
    title: "Failed Project Analysis: Space Shuttle Challenger",
    oneLiner: "A PMBOK-framework analysis of the Challenger disaster as a project management failure, not just an engineering one.",
    category: "PM",
    role: "Author (individual analysis)",
    timeframe: "ITM 321, Spring 2026",
    tools: ["PMBOK Guide (7th Edition)", "Risk Register", "Stakeholder Register", "Launch Readiness Dashboard Design"],
    problem:
      "The 1986 Challenger disaster is usually explained as an O-ring engineering failure. The assignment was to analyze it instead as a project management failure — asking why a known, unresolved safety risk was allowed to pass through a project system that should have stopped it.",
    approach:
      "Mapped the case against PMBOK 7th Edition performance domains — value delivery, stakeholder engagement, systems thinking, risk and uncertainty, leadership and governance, and safety culture — to trace how schedule pressure, filtered communication, and normalization of deviance combined to override a clear no-go signal from Thiokol's engineers.",
    outcome: [
      "Concluded that the core failure was treating launch as a calendar milestone instead of a value decision, and that authority was allowed to override unresolved technical dissent.",
      "Proposed concrete corrective lessons: binding no-go criteria for unproven conditions, safety authority structurally separated from schedule authority, leading-indicator dashboards for risk signals, and redefining project success as safe mission completion rather than on-time launch.",
    ],
    outcomeMetrics: [{ label: "PMBOK domains mapped", value: "18" }],
  },
  {
    slug: "internship-matching-database",
    title: "Internship Matching Database",
    oneLiner: "A relational database design that matches BUS 395 students to internships by major and skills, with live advisor tracking.",
    category: "IT",
    role: "Database & schema design (Group 6)",
    timeframe: "ITM 354, 2026",
    tools: ["Entity-Relationship Modeling", "Relational Schema Design", "SQL"],
    problem:
      "Every BUS 395 student at the Shidler College of Business must complete an internship before graduating, but listings were scattered across email, Handshake, professors, and advisors with no way to tell which ones fit a student's major or skills — and advisors had no way to see where students stood without asking one by one.",
    approach:
      "Designed the relational data model behind the proposed system: an entity-relationship diagram and schema built around seven core tables (Student, Major, Skill, Advisor, Company, Internship, Application) plus three many-to-many connecting tables, so that a student's skills and major could be matched directly against what each internship listing required.",
    outcome: [
      "Produced a design where relevant internship matches surface automatically instead of relying on someone to manually connect a student to a listing.",
      "The same schema supports advisors pulling live status across their full caseload — applied, interviewing, or offer — replacing one-on-one status check-ins.",
    ],
    outcomeMetrics: [{ label: "Core tables designed", value: "10" }],
  },
  {
    slug: "kai-motion",
    title: "Kai Motion — Ocean School Venture",
    oneLiner: "Co-founded and operate a culturally grounded ocean-education business as an alternative to volume surf tourism in Waikīkī.",
    category: "PM",
    role: "Co-Founder & Chief Operating Officer",
    timeframe: "2026 – present",
    tools: ["Beachhead Market Analysis", "Financial Modeling", "Operations & Systems Design"],
    problem:
      "Hawaiʻi's ocean-recreation industry is built around volume tourism — fast, transactional surf lessons — leaving a gap for visitors who want a safe, culturally grounded, and environmentally responsible ocean experience, while beach pollution and cultural commercialization keep increasing with tourism volume.",
    approach:
      "As COO, I lead operations, systems, delivery, and technology for the venture, working alongside three co-founders. We selected culturally curious Oʻahu visitors as our beachhead market, sized the opportunity using a conservative TAM model, and built a disruption strategy around small-group lessons that combine surf instruction, ocean safety, Hawaiian culture, and stewardship — differentiating from conventional surf schools competing purely on price and convenience.",
    outcome: [
      "Completed startup setup (registration, insurance, permits, funding via founder capital and the UH Kalo Grant) and moved into early paid bookings and service validation.",
      "Modeled a lean, service-based financial structure with a clear path to profitability, and built out the operating systems, launch phases, and partnership roadmap the business is now executing against.",
    ],
    outcomeMetrics: [
      { label: "Beachhead TAM", value: "$12.49M/yr" },
      { label: "Year 1 net profit (projected)", value: "$13,740" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
