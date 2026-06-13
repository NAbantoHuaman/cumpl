export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "12 de Septiembre",
    title: "El Inicio de Todo",
    description:
      "Aquel día nuestras vidas se cruzaron por primera vez. Tú desde Trujillo y yo desde Cajamarca. A pesar de la distancia, desde el inicio supe que había encontrado a alguien muy especial.",
    icon: "✨",
  },
  {
    id: 2,
    year: "5 de Octubre",
    title: "El Mejor Sí",
    description:
      "Apenas un par de semanas después, decidí ir a verte. Ese 5 de octubre me declaré, te pedí que fueras mi novia, y cuando respondiste que sí, te convertiste en la dueña de mi corazón.",
    icon: "💫",
  },
  {
    id: 3,
    year: "Cada Día",
    title: "Enamorado de Ti",
    description:
      "Me encanta todo de ti: tus ojos preciosos, tus labios, tu cuerpo, tu forma de hablar y caminar. Tienes un alma tan tierna, como una niña, que sabe tratarme con muchísimo cariño y romanticismo.",
    icon: "🌸",
  },
  {
    id: 4,
    year: "Nuestro Camino",
    title: "Superando la Distancia",
    description:
      "No ha sido fácil; hemos tenido diferencias y separaciones, y sé que he cometido errores. Pero a pesar de la distancia, siempre he vuelto a ti para arreglar las cosas, porque mi amor por ti es inmenso y verdadero.",
    icon: "🛤️",
  },
  {
    id: 5,
    year: "Hoy",
    title: "Felices 20 Años, Melanie",
    description:
      "Melanie Abanto Campos, me llena de júbilo estar a tu lado celebrando tus 20 años, sabiendo que eres mía. Estaré siempre contigo, en las buenas y en las malas. Te amo, y no quiero que seas de nadie más.",
    icon: "🎂",
  },
];
