export type Project = {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  image: string;
  color: string;
};

export type ProjectInput = Omit<Project, "id">;

export type Skill = {
  id: string;
  name: string;
};

export type SkillInput = Omit<Skill, "id">;

export type Technology = {
  id: string;
  name: string;
};

export type TimelineEntry = {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
};

export type TimelineEntryInput = Omit<TimelineEntry, "id">;

export type CertificationBadge = {
  id: string;
  type: "certification" | "badge";
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl: string;
};

export type CertificationBadgeInput = Omit<CertificationBadge, "id">;

/** Format du fichier exporté / importé depuis l'admin. */
export type PortfolioExport = {
  version: 1;
  projects: Project[];
  skills: Skill[];
  tools: string[];
  timeline: TimelineEntry[];
  certifications: CertificationBadge[];
};
