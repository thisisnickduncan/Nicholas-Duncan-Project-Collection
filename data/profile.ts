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
  bioParagraphs: string[];
  photo: string;
  location: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
  certifications: string[];
  skillCategories: SkillCategory[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
}

export const profile: Profile = {
  name: "Nick Duncan",
  tagline: "Business systems, translated into working software.",
  oneLineBio:
    "BBA graduate in Management Information Systems and Business Management, with experience across data analysis, business operations, finance, and client-facing work.",
  bioParagraphs: [
    "I'm a Bachelor of Business Administration graduate in Management Information Systems and Business Management from the University of Hawaiʻi at Mānoa, with experience spanning data analysis, business operations, finance, hospitality, and customer service.",
    "I built SwingScore, a Python/Flask data application using Pandas and SQL concepts to analyze election data — one example of how I like to work: take a messy, real-world dataset and turn it into something people can actually use to make decisions.",
    "I'm skilled in problem-solving, systems analysis, technical documentation, and data-driven decision-making, and I'm looking for a full-time role in IT, project management, data/business analysis, or cybersecurity.",
  ],
  photo: "/images/nick-duncan-cutout.png",
  location: "Laguna Niguel, CA",
  email: "thisisnickduncan@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/nicholas-duncan-a8341a272",
  githubUrl: "https://github.com/thisisnickduncan",
  resumeUrl: "/resume.pdf",
  certifications: ["Google AI Essentials", "Six Sigma White Belt"],
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
        "Networking Fundamentals",
        "Cybersecurity Fundamentals",
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
      school: "University of Hawaiʻi at Mānoa",
      degree: "Bachelor of Business Administration (BBA)",
      focus: "Management Information Systems & Business Management",
      dates: "2021 – 2026",
      highlights: ["Major coursework GPA: 3.8"],
    },
  ],
};
