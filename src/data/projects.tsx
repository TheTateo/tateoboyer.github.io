export type Project = {
  number: string;
  title: string;
  type: string;
  description: string;
  image: string;
  color: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "HUMAIN//ORBITAL",
    type: "Identité visuelle · UI/UX",
    description:
      "Une expérience spatiale immersive où l'interface devient un instrument de navigation.",
    image:
      "https://images.unsplash.com/photo-1723039914210-a6f13a6931af?auto=format&fit=crop&w=1400&q=85",
    color: "#75dcff",
  },
  {
    number: "02",
    title: "EXO//MIND",
    type: "Direction artistique · 3D",
    description:
      "Une campagne expérimentale qui explore la frontière entre mémoire humaine et intelligence synthétique.",
    image:
      "https://images.unsplash.com/photo-1566410824233-a8011929225c?auto=format&fit=crop&w=1400&q=85",
    color: "#ff694a",
  },
  {
    number: "03",
    title: "ÉVEILLÉ//",
    type: "Motion design · Expérience",
    description:
      "Un générique cinétique construit comme un voyage vers une lumière inconnue.",
    image:
      "https://images.unsplash.com/photo-1712508818674-1eac0c173733?auto=format&fit=crop&w=1400&q=85",
    color: "#d8ff55",
  },
];