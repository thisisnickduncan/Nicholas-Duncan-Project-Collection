import type { Metadata } from "next";
import { ProjectIndex } from "@/components/work/ProjectIndex";

/** Written once, used both as the page description and as the on-page standfirst. */
const DESCRIPTION = "Case studies in IT, project management, data and blockchain analysis, and cybersecurity.";

export const metadata: Metadata = {
  title: "Work — Nick Duncan",
  description: DESCRIPTION,
};

export default function WorkPage() {
  return <ProjectIndex intro={DESCRIPTION} />;
}
