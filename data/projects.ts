export type ProjectCategory = "IT" | "PM" | "Data" | "Crypto" | "Security";

/** Two categories carry a short code in the data and a longer name on screen, so the
 *  filter bar and the case-study fact list can never drift apart. */
export function categoryLabel(category: ProjectCategory): string {
  if (category === "PM") return "Project Management";
  if (category === "Crypto") return "Crypto Analysis";
  return category;
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
  /** Several captures of one running program, framed together and centred as a set. Takes precedence over `screenshot`. */
  screenshots?: Screenshot[];
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
      { label: "Raised stories confirmed by 2+ newsrooms to", value: "1.2% → 14.1%" },
      { label: "Built a bias-rating table covering", value: "8,774 outlets" },
      { label: "Ship a digest on schedule", value: "6 a day, every 4 hours" },
    ],
    githubUrl: "https://github.com/thisisnickduncan/telegram-news-collector",
    ctaLabel: "Take a look at the program",
    screenshots: [
      { src: "/projects/telegram-news-collector/digest-1.png", width: 361, height: 685 },
      { src: "/projects/telegram-news-collector/digest-2.png", width: 370, height: 583 },
      {
        src: "/projects/telegram-news-collector/digest-3.png",
        width: 372,
        height: 259,
        caption:
          "Three moments from the bot: a delivered digest, the Left/Center/Right spread under each story, and a follow-up when a story it was already tracking develops. Every story carries its source list and Follow / Ask / Ignore controls.",
      },
    ],
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
      { label: "Cleaned and merged public data", value: "6M+ rows" },
      { label: "Scored every county in", value: "7 swing states" },
      { label: "Ranked the top-impact counties", value: "5 of 400+" },
    ],
    githubUrl: "https://github.com/thisisnickduncan/Political-Swing-Score-Calculator",
    demoUrl: "https://itm352-swingscore.onrender.com/",
    ctaLabel: "Take a look at the program",
  },
  {
    slug: "follow-the-coin",
    title: "Follow the Coin: Reconstructing a Five-Hop Bitcoin Fund Flow",
    oneLiner: "A blockchain investigation exercise that follows 0.00342052 tBTC across five confirmed hops on Bitcoin Testnet4 — deciding which output was a payment and which was change, and proving that an address the trail appeared to dead-end at was the same wallet all along.",
    category: "Crypto",
    role: "Sole author — built the trail, ran the analysis, wrote the report",
    tools: [
      "Bitcoin Testnet4",
      "mempool.space Block Explorer",
      "Sparrow Wallet",
      "Gamma",
      "Common-Input-Ownership Heuristic",
      "Change-Output Identification",
      "UTXO Value Reconciliation",
    ],
    problem:
      "Every Bitcoin transaction is public, which makes tracing funds sound like it should be trivial. It is not, because the ledger records amounts and addresses and labels nothing. When one transaction produces two outputs, nothing on-chain says which one was the payment and which was change coming back to the sender — and following the wrong one loses the money. When a hop lands on an address that has never appeared before, that transaction alone cannot tell you whether the trail has branched to a different party or is still in the same hands. The exercise was to reconstruct a five-hop trail from two facts only, a starting address and a destination, and to make both of those calls from block-explorer data alone.",
    approach:
      "Built the trail first — four Sparrow wallets on Testnet4, funded from a public faucet — then analysed it from scratch as though the wallets belonged to someone else, working only from mempool.space and deliberately not consulting the wallet software, which would have answered the payment-versus-change question by a shortcut no real case offers. At the Hop 3 split the payment was identified from a round-number pattern and confirmed by arithmetic (input minus payment minus fee matched the second output to the satoshi), and the two tests that could have corroborated it — the fresh-address test and the address-type test — were written up as having produced nothing rather than quietly dropped, so the finding is stated with exactly the support it has. The change output was then followed forward instead of being written off, which is how the trail reached the apparent dead end at D2 and, one hop later, resolved it: D1 and D2 were spent together in a single transaction, and since spending an input requires its private key, common control is structural rather than inferred. Fee behaviour and the trail's suspiciously even forty-minute rhythm were both examined and both cleared — Testnet4 simply produces a block about every twenty minutes. I developed the report itself in Gamma, my first time using the tool, which is what let me set twelve block-explorer exhibits, a full fund-flow diagram, and a per-hop determination table into one document at a level of finish I would not have reached laying it out by hand.",
    outcome: [
      "Closed the trail on-chain: 0.00342052 tBTC entered at Address A1 and 0.00340727 tBTC came to rest at Address D1 across five confirmed transactions in blocks 149,356 to 149,364, a span of two hours and forty minutes. The 1,325-satoshi difference is exactly the total fees paid, so no value is unexplained, and every transaction ID is listed for independent verification on mempool.space.",
      "Resolved the apparent dead end, which is the evidential core of the case. The Hop 3 change output moved on to D2, an address with no visible link to the known destination. Hop 5 spent D1 and D2 together into a single consolidated output, which under the common-input-ownership heuristic puts both addresses in the same hands — and CoinJoin, the one exception that would weaken that, was ruled out on the transaction's structure.",
      "Recorded what the evidence would not support as carefully as what it would: no attribution was attempted, the fee data across a tenfold rate range was found to carry no investigative signal, the even intervals were network cadence rather than automation, and a Hop 2 fee-bump that the explorer displays as a 'removed' transaction never confirmed and never moved any funds.",
      "Stated the limits plainly in the report itself — the author controls every wallet in the trail, so this demonstrates the method rather than the outcome of a real case, and Testnet4's light traffic made the trail cleaner to follow than mainnet would be.",
    ],
    outcomeMetrics: [
      { label: "Followed the funds through", value: "5 hops, 6 addresses" },
      { label: "Left unaccounted for", value: "0 of 342,052 sats" },
      { label: "Evidenced each determination with", value: "12 explorer exhibits" },
    ],
    paperUrl: "/papers/follow-the-coin.pdf",
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
      { label: "Checked the launch decision against PMBOK domains", value: "6" },
      { label: "Traced one open risk through every review gate", value: "1" },
      { label: "Wrote governance fixes so it can't repeat", value: "4" },
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
      { label: "Cut the places a student must search", value: "4 → 1" },
      { label: "Designed the schema behind the matching", value: "10 tables" },
      { label: "Replaced advisor check-ins with", value: "1 query per caseload" },
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
      { label: "Sized the beachhead market at", value: "$12.49M/yr" },
      { label: "Modeled Year 1 net profit at", value: "$13,740" },
      { label: "Secured funding to open", value: "Founder capital + UH grant" },
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
      { label: "Designed more parking on the same land", value: "70–100 → 320 spaces" },
      { label: "Costed the build at", value: "$13M–$18M" },
      { label: "Scheduled delivery across", value: "30 months, six phases" },
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
      { label: "Modeled recovery paths", value: "3 — safety-first won" },
      { label: "Recommended merging the quality systems", value: "2 → 1" },
      { label: "Phased the rollout across", value: "24 months, 3 phases" },
    ],
    paperUrl: "/papers/boeing-balanced-scorecard.pdf",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
