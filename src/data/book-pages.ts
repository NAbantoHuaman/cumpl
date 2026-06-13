export interface BookPage {
  id: number;
  title: string;
  date: string;
  text: string;
  imagePlaceholder: string;
  imagePath?: string;
}

export const bookPages: BookPage[] = [
  {
    id: 1,
    title: "Nuestro Primer Capítulo",
    date: "Tardes Inolvidables",
    text: "Esa luz mágica de la tarde iluminando tu rostro, ese momento en el que el tiempo pareció detenerse solo para nosotros. Aún recuerdo exactamente lo que sentí.",
    imagePlaceholder: "linear-gradient(135deg, #FF2D78 0%, #2D0A4E 100%)",
    imagePath: "/fotos/IMG_20251004_165646.jpg",
  },
  {
    id: 2,
    title: "Nuestras Aventuras",
    date: "Explorando el Mundo Juntos",
    text: "Cada lugar nuevo a tu lado se convierte en mi lugar favorito. Porque no importa a dónde vayamos, el verdadero destino siempre es estar contigo.",
    imagePlaceholder: "linear-gradient(135deg, #D4A853 0%, #FF6B9D 100%)",
    imagePath: "/fotos/IMG_20251004_170610.jpg",
  },
  {
    id: 3,
    title: "Noches de Magia",
    date: "Bajo las Estrellas",
    text: "La noche siempre se vuelve más brillante cuando estás cerca. Esos instantes de complicidad y miradas que lo dicen todo sin necesidad de palabras.",
    imagePlaceholder: "linear-gradient(135deg, #A855F7 0%, #FFB6C1 100%)",
    imagePath: "/fotos/IMG_20251004_185208.jpg",
  },
  {
    id: 4,
    title: "Nuestras Locuras",
    date: "Risas Infinitas",
    text: "Nadie me hace reír como tú. Esas carcajadas espontáneas y nuestras pequeñas locuras son el tesoro más grande que guardo en el corazón.",
    imagePlaceholder: "linear-gradient(135deg, #FFB6C1 0%, #D4A853 100%)",
    imagePath: "/fotos/IMG_20251004_190831.jpg",
  },
  {
    id: 5,
    title: "Feliz Cumpleaños, Mi Amor",
    date: "Celebrando Tu Existencia",
    text: "Hoy brindamos por ti, por tus 20 años y por todo lo hermoso que eres. Que esta nueva vuelta al sol te traiga tanta felicidad como la que tú me das a mí cada día.",
    imagePlaceholder: "linear-gradient(135deg, #FF2D78 0%, #D4A853 100%)",
    imagePath: "/fotos/IMG_20251004_215522.jpg",
  },
];
