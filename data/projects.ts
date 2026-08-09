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
  {
    slug: "central-campus-parking-redevelopment",
    title: "Central Campus Parking Redevelopment",
    oneLiner: "A feasibility study and project management plan to replace a UH Mānoa surface lot with a smart, multi-level parking structure.",
    category: "PM",
    role: "Project Management Plan Author (Group 4)",
    timeframe: "ITM 321, Spring 2026",
    tools: ["Work Breakdown Structure", "Requirements Traceability Matrix", "Risk Register", "Swimlane Diagrams"],
    problem:
      "UH Mānoa's central academic core — the surface lot between Shidler College of Business, George Hall, and the Architecture Building — was operating near full occupancy during peak hours, with commuter student permits selling out multiple semesters, while the lot itself used high-value land at low density.",
    approach:
      "Built a full feasibility case using the university's own transportation data, then developed a scope statement, a 26-item requirements matrix with traceability, risk register with mitigations, a six-phase work breakdown structure, and a 30-month milestone timeline for replacing the surface lot with a smart, multi-level parking structure.",
    outcome: [
      "Proposed a 4-level structure replacing roughly 70–100 surface spaces with an estimated 320, without requiring new land acquisition.",
      "Defined a phased path from feasibility through design, permitting, construction, testing, deployment, and closeout, with risk mitigations for budget overrun, construction-period parking loss, and stakeholder resistance.",
    ],
    outcomeMetrics: [
      { label: "Net capacity gain", value: "~70-100 → 320 spaces" },
      { label: "Estimated project cost", value: "$13M–$18M" },
    ],
  },
  {
    slug: "boeing-balanced-scorecard",
    title: "Boeing Safety & Quality Turnaround: Balanced Scorecard Strategy",
    oneLiner: "A consulting recommendation for Boeing's Board to fix safety and quality control before scaling production again.",
    category: "PM",
    role: "Strategy Consultant (Escape Velocity Partners team)",
    timeframe: "BUS 345",
    tools: ["Balanced Scorecard (Kaplan & Norton)", "Strategy Mapping", "Case Analysis"],
    problem:
      "Following the 737 MAX crashes, the Alaska Airlines door-plug incident, and FAA production restrictions, Boeing kept declaring safety and quality as priorities without its operating processes, incentives, supplier oversight, or culture actually reflecting that commitment — a strategy execution failure, not just a communications or engineering problem.",
    approach:
      "Diagnosed the crisis as systemic rather than isolated, then built a four-perspective Balanced Scorecard adapted for aviation — Learning & Growth, Internal Processes, Customer & Regulator Trust, and Financial Recovery — with a strategy map showing how safety culture has to precede process quality, which has to precede regulator trust, which has to precede financial recovery.",
    outcome: [
      "Recommended five board-level actions: a safety-first scorecard dashboard, full integration of Spirit AeroSystems into one Boeing-controlled quality system, tying production increases to quality gates, realigning executive incentives around safety over speed, and strengthening employee stop-the-line and reporting protections.",
      "Laid out a phased 24-month rollout — freeze unsafe scaling and baseline metrics in the first 90 days, integrate Spirit and standardize quality in months 3–6, then institutionalize the scorecard into annual planning through month 24.",
    ],
    outcomeMetrics: [
      { label: "Board recommendations", value: "5" },
      { label: "Implementation phases", value: "90-day / 6-mo / 24-mo" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
