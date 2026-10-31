export interface CollectionSection {
  readonly navLabel: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly categories: readonly string[];
  readonly highlights: readonly string[];
}

export const POSTIZOS_SECTION: CollectionSection = {
  navLabel: "Postizos",
  eyebrow: "Volumen, a tu manera",
  title: "Un gesto sencillo. Un cambio que se siente.",
  description: "Postizos y extensiones pensados para acompañar tu estilo con movimiento, ligereza y un acabado natural.",
  image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=1200&q=88",
  imageAlt: "Detalle de cabello con ondas naturales",
  categories: ["Topper", "Postizo", "Extensiones"],
  highlights: ["Colocación sencilla", "Tonos fáciles de combinar", "Asesoramiento personalizado"],
};

export const CARE_SECTION: CollectionSection = {
  navLabel: "Cuidado",
  eyebrow: "Tu ritual, cada día",
  title: "Cuidar también es parte de sentirte bien.",
  description: "Una selección de fórmulas y esenciales para mantener cada pieza suave, bonita y lista para acompañarte.",
  image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=88",
  imageAlt: "Productos para el cuidado capilar",
  categories: ["Cuidado", "Adhesión"],
  highlights: ["Rutinas suaves", "Fórmulas seleccionadas", "Consejos de nuestras especialistas"],
};

export const ACCESSORIES_SECTION: CollectionSection = {
  navLabel: "Accesorios",
  eyebrow: "Los detalles que acompañan",
  title: "Pequeños esenciales. Más comodidad cada día.",
  description: "Descubre complementos pensados para cuidar, guardar y llevar tus piezas con naturalidad y tranquilidad.",
  image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=88",
  imageAlt: "Accesorios de cuidado personal",
  categories: ["Accesorios"],
  highlights: ["Comodidad en casa", "Materiales agradables", "Prácticos para viajar"],
};
