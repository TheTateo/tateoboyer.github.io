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
  level: number;
};

export type SkillInput = Omit<Skill, "id">;

export type Technology = {
  id: string;
  name: string;
};

/** Format du fichier exporté / importé depuis l'admin. */
export type PortfolioExport = {
  version: 1;
  projects: Project[];
  skills: Skill[];
  tools: string[];
};
