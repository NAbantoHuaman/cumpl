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
    year: "Capítulo 1",
    title: "El Destino Nos Unió",
    description:
      "Dicen que las casualidades no existen. El día que nuestras miradas se cruzaron, el universo entero suspiró. Fue el comienzo de la historia más bonita jamás contada.",
    icon: "✨",
  },
  {
    id: 2,
    year: "Capítulo 2",
    title: "Los Primeros Latidos",
    description:
      "Cada mensaje, cada llamada, cada momento compartido fue tejiendo un vínculo invisible pero inquebrantable. El corazón ya sabía lo que la mente aún no entendía.",
    icon: "💫",
  },
  {
    id: 3,
    year: "Capítulo 3",
    title: "Construyendo Nuestro Mundo",
    description:
      "Juntos comenzamos a construir un universo propio. Con risas como cimientos, sueños como paredes y amor como techo. Un refugio perfecto.",
    icon: "🌙",
  },
  {
    id: 4,
    year: "Capítulo 4",
    title: "Aventuras Sin Fin",
    description:
      "Cada día a tu lado es una nueva aventura. Desde los viajes más emocionantes hasta las tardes más tranquilas, todo se convierte en extraordinario contigo.",
    icon: "🦋",
  },
  {
    id: 5,
    year: "Capítulo 5",
    title: "Superando Tormentas",
    description:
      "No todo han sido días soleados, pero cada tormenta que hemos enfrentado juntos nos ha hecho más fuertes. Nuestro amor es a prueba de todo.",
    icon: "⭐",
  },
  {
    id: 6,
    year: "Hoy",
    title: "Celebrando 20 Años de Ti",
    description:
      "Y aquí estamos, celebrando la existencia de la persona más maravillosa del universo. 20 años de pura magia. Feliz cumpleaños, mi amor eterno.",
    icon: "🎂",
  },
];
