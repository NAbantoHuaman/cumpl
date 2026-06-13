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
    description: "El universo conspiró para que nuestros caminos se cruzaran. Desde ese instante, supe que algo mágico había comenzado.",
    color: "#FF2D78",
  },
  {
    id: 2,
    title: "La Primera Sonrisa",
    date: "Cuando el mundo se iluminó",
    description: "Tu sonrisa iluminó todo a mi alrededor. Fue como ver el amanecer por primera vez.",
    color: "#D4A853",
  },
  {
    id: 3,
    title: "Nuestro Primer Viaje",
    date: "Aventuras juntos",
    description: "Descubrimos que el mejor destino no es un lugar, sino estar juntos en cualquier parte del mundo.",
    color: "#A855F7",
  },
  {
    id: 4,
    title: "Noches de Películas",
    date: "Nuestro ritual sagrado",
    description: "Abrazados bajo las cobijas, el mundo exterior desaparecía. Solo existíamos tú y yo.",
    color: "#FFB6C1",
  },
  {
    id: 5,
    title: "Las Risas Infinitas",
    date: "Momentos de felicidad pura",
    description: "Esas carcajadas que nos dejaban sin aliento, los chistes internos que nadie más entiende.",
    color: "#FF6B9D",
  },
  {
    id: 6,
    title: "Promesas Eternas",
    date: "Un pacto de amor",
    description: "Cada promesa que nos hemos hecho es un hilo dorado que une nuestras almas para siempre.",
    color: "#E8B4F8",
  },
  {
    id: 7,
    title: "Hoy, Celebrando Tu Vida",
    date: "20 años de magia",
    description: "Y aquí estamos, celebrando que naciste, que existes, y que tengo la suerte inmensa de amarte.",
    color: "#D4A853",
  },
];
