import type { Project, Skill, Technology } from "../types";

/**
 * Données affichées tant que rien n'a été enregistré dans le navigateur.
 * Ce sont les valeurs de départ (et celles restaurées par "Réinitialiser" dans l'admin).
 *
 * Astuce : depuis l'admin, "Exporter" génère un JSON que tu peux recopier ici
 * pour que ces données deviennent celles de tous les visiteurs.
 */
export const defaultProjects: Project[] = [
  {
    id: "project-humain-orbital",
    title: "HUMAIN//ORBITAL",
    technologies: ["Identité visuelle", "UI/UX"],
    description:
      "Une expérience spatiale immersive où l'interface devient un instrument de navigation.",
    image:
      "https://images.unsplash.com/photo-1723039914210-a6f13a6931af?auto=format&fit=crop&w=1400&q=85",
    color: "#75dcff",
  },
  {
    id: "project-exo-mind",
    title: "EXO//MIND",
    technologies: ["Direction artistique", "3D"],
    description:
      "Une campagne expérimentale qui explore la frontière entre mémoire humaine et intelligence synthétique.",
    image:
      "https://images.unsplash.com/photo-1566410824233-a8011929225c?auto=format&fit=crop&w=1400&q=85",
    color: "#ff694a",
  },
  {
    id: "project-eveille",
    title: "ÉVEILLÉ//",
    technologies: ["Motion design", "Expérience"],
    description:
      "Un générique cinétique construit comme un voyage vers une lumière inconnue.",
    image:
      "https://images.unsplash.com/photo-1712508818674-1eac0c173733?auto=format&fit=crop&w=1400&q=85",
    color: "#d8ff55",
  },
];

export const defaultTechnologies: Technology[] = [
  {
    id: "technology-identite-visuelle",
    name: "Identité visuelle",
  },
  {
    id: "technology-ui-ux",
    name: "UI/UX",
  },
  {
    id: "technology-direction-artistique",
    name: "Direction artistique",
  },
  {
    id: "technology-3d",
    name: "3D",
  },
  {
    id: "technology-motion-design",
    name: "Motion design",
  },
  {
    id: "technology-experience",
    name: "Expérience",
  },
];

export const defaultSkills: Skill[] = [
  { id: "skill-art-direction", name: "Direction artistique", level: 92 },
  { id: "skill-ui-ux", name: "UI / UX Design", level: 88 },
  { id: "skill-motion", name: "Motion Design", level: 76 },
  { id: "skill-creative-dev", name: "Développement créatif", level: 68 },
];

export const defaultTools: string[] = [
  "Figma",
  "Adobe CC",
  "Blender",
  "After Effects",
  "React",
  "WebGL",
];
