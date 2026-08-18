export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  org: string;
  role: string;
  dates: string;
  bullets: string[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  focus: string;
  dates: string;
  highlights: string[];
}

export interface Profile {
  name: string;
  tagline: string;
  oneLineBio: string;
  /** The home page's standing statement. Shorter and sharper than the About
   *  page's account, and deliberately not the same text: the front page makes
   *  the claim, the About page tells the story behind it. */
  teaserParagraphs: string[];
  /** The full account, /about only. */
  bioParagraphs: string[];
  photo: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
  instagramUrl: string;
  resumeUrl: string;
  certifications: string[];
  skillCategories: SkillCategory[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
}

export const profile: Profile = {
  name: "Nick Duncan",
  tagline: "Business-Minded, Tech Solutions",
  oneLineBio:
    "BBA graduate in Management Information Systems and Business Management, with experience across data management, IT project management (SDLC), networking, cybersecurity, data analysis, business operations, finance, and client-facing work.",
  teaserParagraphs: [
    "I build things to find out where the obvious approach breaks, then figure out what actually holds up. I'm a recent BBA graduate from the University of Hawai‘i at Mānoa (Management Information Systems and Business Management), with a background spanning database design, business systems, project management, and data analysis, along with networking and cybersecurity fundamentals and full-stack development.",
    "Before tech, I spent years in the service industry, which taught me how to stay sharp under pressure, manage competing priorities, and deliver consistently to customers. Skills I believe carry directly into how I approach projects and lead work today.",
  ],
  bioParagraphs: [
    "I'm drawn to the point where a system stops being simple. That's usually where the real problem is, and figuring it out is what got me into MIS in the first place. I hold a BBA in Management Information Systems and Business Management from the University of Hawai‘i at Mānoa, where I learned database design, business systems development, project management, and data analysis, plus a working foundation in networking, cybersecurity, and full-stack development.",
    "Before tech, I spent years behind the bar and on the floor in the service industry, learning how to stay composed when things get busy, juggle a dozen priorities at once, and still deliver for the person in front of me. That same instinct for staying calm and organized under pressure is what I bring to how I run projects and lead work today.",
    "Hello my name is Nicholas Duncan, I grew up in Laguna Niguel, California, and outside of work you'll usually find me surfing, at the gym, hanging out with my dog, or messing with computers, whether that's building one from parts or writing code for whatever project I'm into that week.",
    "My strengths come down to problem-solving, systems analysis, technical documentation, and making decisions backed by data instead of guesswork.",
  ],
  photo: "/images/nick-duncan-cutout.png",
  location: "Laguna Niguel, CA",
  email: "thisisnickduncan@gmail.com",
  phone: "(949)-357-8629",
  linkedinUrl: "https://www.linkedin.com/in/nicholas-duncan-a8341a272",
  githubUrl: "https://github.com/thisisnickduncan",
  instagramUrl: "https://www.instagram.com/nick_duncannn/?hl=en",
  resumeUrl: "/resume.pdf",
  certifications: ["Claude 101", "Claude Code 101", "Google AI Essentials", "Six Sigma White Belt"],
  skillCategories: [
    {
      category: "Technical",
      items: [
        "SQL",
        "Python",
        "Database Management",
        "Data Analysis",
        "Data Visualization",
        "Pandas",
        "Flask",
        "ERD / Schema Design",
        "Data Pipelines",
        "REST API Integration",
        "SQLite",
        "Async Python",
        "Concurrency & Threading",
        "Rate-Limit & Retry Handling",
        "Automated Testing (pytest)",
        "Sandboxing & Access Controls",
        "Desktop App Development (PyQt6)",
        "Linux / systemd Deployment",
        "Git & Version Control",
        "Networking Fundamentals",
        "Cybersecurity Fundamentals",
      ],
    },
    {
      category: "AI & Automation",
      items: [
        "LLM API Integration",
        "Prompt Design",
        "Agent & Tool-Calling Architecture",
        "JSON Schema Design & Validation",
        "Retrieval & Document Chunking",
        "Semantic Clustering",
        "Fuzzy Text Matching",
        "Realtime Voice (Speech In / Out)",
        "Wake-Word & Local ONNX Inference",
        "Computer Vision (Screen & Image)",
        "Browser Automation (Playwright)",
        "Scheduled Job Automation",
        "Bot Development (Telegram API)",
      ],
    },
    {
      category: "Business & Systems",
      items: [
        "Systems Analysis",
        "Requirements Gathering",
        "Project Management",
        "Agile",
        "Waterfall",
        "Process Improvement",
        "Technical Documentation",
        "Operations Management",
      ],
    },
    {
      category: "Client & Operations",
      items: ["Client Relations", "Customer Service", "Microsoft Office", "Inventory Management", "Cash Handling"],
    },
  ],
  experience: [
    {
      org: "DRPSEC",
      role: "Information Technology Intern",
      dates: "January 2024 – May 2026",
      bullets: [
        "Gained hands-on exposure to real-world IT and cybersecurity operations in a professional services environment, both in person and remotely.",
        "Applied MIS and cybersecurity concepts to better understand client technology needs, risk management, and secure IT operations.",
        "Gained practical exposure to IT and cybersecurity workflows, including how security controls support client operations and strengthen risk management.",
        "Demonstrated reliability, professionalism, and strong communication when working through unfamiliar systems, tools, and technical concepts.",
      ],
    },
    {
      org: "Northwestern Mutual",
      role: "Associate Financial Advisor Intern",
      dates: "May 2023 – September 2023",
      bullets: [
        "Contributed to the development of life insurance and wealth management strategies for clients.",
        "Worked on Whole Life and VUL Investment Program recommendations.",
        "Researched investment and insurance plans for clients needing retirement, income replacement, or estate planning advice.",
        "Helped develop client-related financial plans in compliance with FINRA regulations.",
      ],
    },
    {
      org: "Tiki's Grill & Bar",
      role: "Bartender | Server | Barback",
      dates: "August 2021 – November 2024",
      bullets: [
        "Supported high-volume restaurant and bar service for 500–600+ guests per shift, with peak nights reaching 700+ guests in a busy Waikīkī location.",
        "Prepared cocktails, beer, and wine quickly and accurately while handling 200+ drink orders per shift during peak service periods.",
        "Completed bar opening, closing, restocking, and inventory duties 4–5 shifts per week to reduce shortages and service delays.",
        "Trained 5+ new team members on bar operations, service standards, POS procedures, and shift responsibilities.",
      ],
    },
  ],
  education: [
    {
      school: "University of Hawai‘i at Mānoa",
      degree: "Bachelor of Business Administration (BBA)",
      focus: "Management Information Systems & Business Management",
      dates: "2021 – 2026",
      highlights: ["Major coursework GPA: 3.8"],
    },
  ],
};
