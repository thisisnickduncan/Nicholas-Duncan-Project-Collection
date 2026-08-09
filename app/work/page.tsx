import type { Metadata } from "next";
import { ProjectIndex } from "@/components/work/ProjectIndex";

export const metadata: Metadata = {
  title: "Work — Nick Duncan",
  description: "Case studies in IT, project management, data analysis, and cybersecurity.",
};

export default function WorkPage() {
  return <ProjectIndex />;
}
