export interface Memory {
  id: number;
  title: string;
  date: string;
  description: string;
  imagePath?: string;
  color: string;
}

export const memories: Memory[] = [
  {
    id: 1,
    title: "Nuestro Primer Encuentro",
    date: "El día que todo comenzó",
    description: "",
    imagePath: "/fotos/IMG-20251004-WA0205.jpg",
    color: "#FF2D78",
  },
  {
    id: 2,
    title: "La Primera Sonrisa",
    date: "Cuando el mundo se iluminó",
    description: "",
    imagePath: "/fotos/IMG-20251004-WA0206.jpg",
    color: "#D4A853",
  },
  {
    id: 3,
    title: "Nuestro Primer Viaje",
    date: "Aventuras juntos",
    description: "",
    imagePath: "/fotos/IMG-20251004-WA0207.jpg",
    color: "#A855F7",
  },
  {
    id: 4,
    title: "Noches de Películas",
    date: "Nuestro ritual sagrado",
    description: "",
    imagePath: "/fotos/IMG-20251004-WA0208.jpg",
    color: "#FFB6C1",
  },
  {
    id: 5,
    title: "Las Risas Infinitas",
    date: "Momentos de felicidad pura",
    description: "",
    imagePath: "/fotos/IMG-20251023-WA0070.jpg",
    color: "#FF6B9D",
  },
  {
    id: 6,
    title: "Promesas Eternas",
    date: "Un pacto de amor",
    description: "",
    imagePath: "/fotos/IMG-20251023-WA0072.jpg",
    color: "#E8B4F8",
  },
  {
    id: 7,
    title: "Hoy, Celebrando Tu Vida",
    date: "20 años de magia",
    description: "",
    imagePath: "/fotos/IMG-20251023-WA0178.jpg",
    color: "#D4A853",
  },
];
