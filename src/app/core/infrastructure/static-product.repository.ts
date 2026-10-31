import { Injectable } from "@angular/core";
import { FeaturedProduct, Product } from "../domain/product.model";
import { ProductRepository } from "../domain/product.repository";

const CATALOG: readonly Product[] = [
  { name: "Luna Top Lace", category: "Prótesis capilar", detail: "Cabello natural · Monofilamento", price: 389, image: "https://images.unsplash.com/photo-1583331030595-6601e6c7b5d5?auto=format&fit=crop&w=900&q=86", badge: "Más vendido", rating: "4.9", colors: ["#2c201b", "#6d4936", "#b58c68"] },
  { name: "Aura Lace Front", category: "Peluca médica", detail: "Fibra premium · Lace frontal", price: 329, image: "https://images.unsplash.com/photo-1625503337559-d3e99da12715?auto=format&fit=crop&w=900&q=86", badge: "Nuevo", rating: "4.8", colors: ["#211713", "#5d3c2c", "#a87957", "#d2b091"] },
  { name: "Natura Volume 20", category: "Sistema capilar", detail: "Cabello Remy · Base de tul", price: 449, image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.9", colors: ["#30231d", "#76513e", "#c69a72"] },
  { name: "Clara Bob 14", category: "Peluca natural", detail: "Cabello humano · Lace front", price: 359, previousPrice: 399, image: "https://images.unsplash.com/photo-1590610831759-0fca59c21a23?auto=format&fit=crop&w=900&q=86", badge: "-10%", rating: "4.7", colors: ["#211914", "#684736", "#b38a6d"] },
  { name: "Essential Topper 12", category: "Topper", detail: "Cabello natural · Clip invisible", price: 279, image: "https://images.unsplash.com/photo-1562092139-cac69580cd74?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.8", colors: ["#2f211a", "#745442", "#c5a080"] },
  { name: "Siena Soft Wave", category: "Peluca premium", detail: "Fibra térmica · Ondulada", price: 249, image: "https://images.unsplash.com/photo-1617391654484-2894196c2cc9?auto=format&fit=crop&w=900&q=86", badge: "Exclusivo online", rating: "4.6", colors: ["#231713", "#654231", "#aa7956"] },
  { name: "Silk Repair Serum", category: "Cuidado", detail: "Sérum reparador · 100 ml", price: 34, image: "https://images.unsplash.com/photo-1613754773306-532ec48b0de5?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.9", colors: [] },
  { name: "Invisible Hold", category: "Adhesión", detail: "Adhesivo capilar · 50 ml", price: 28, image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.7", colors: [] },
];

const FEATURED: readonly FeaturedProduct[] = [
  { name: "Éclat", type: "Peluca de cabello natural", price: "289 €", image: "https://images.unsplash.com/photo-1625503337559-d3e99da12715?auto=format&fit=crop&w=900&q=86", tone: "Rubio arena" },
  { name: "Sienna", type: "Lace front premium", price: "249 €", image: "https://images.unsplash.com/photo-1625503339883-6ddd78909177?auto=format&fit=crop&w=900&q=86", tone: "Castaño avellana" },
  { name: "Amélie", type: "Peluca de cabello natural", price: "319 €", image: "https://images.unsplash.com/photo-1663475986058-a4a06c5f9b8e?auto=format&fit=crop&w=900&q=86", tone: "Moreno intenso" },
];

const COLLECTION_PRODUCTS: readonly Product[] = [
  { name: "Soft Volume Clip-In", category: "Extensiones", detail: "Cabello natural · 45 cm", price: 189, image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=86", badge: "Más vendido", rating: "4.9", colors: ["#30231d", "#76513e", "#c69a72"] },
  { name: "Flequillo Paris", category: "Postizo", detail: "Clip invisible · Fibra premium", price: 69, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=86", badge: "Nuevo", rating: "4.7", colors: ["#211713", "#5d3c2c", "#a87957"] },
  { name: "Ondas Atelier", category: "Extensiones", detail: "Pack de 3 piezas · 50 cm", price: 149, image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.8", colors: ["#30231d", "#76513e", "#c69a72"] },
  { name: "Champú Delicado", category: "Cuidado", detail: "Limpieza suave · 250 ml", price: 24, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.8", colors: [] },
  { name: "Mascarilla Nutritiva", category: "Cuidado", detail: "Hidratación profunda · 200 ml", price: 32, image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=86", badge: "Recomendado", rating: "4.9", colors: [] },
  { name: "Spray Protector", category: "Cuidado", detail: "Protección térmica · 150 ml", price: 21, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.6", colors: [] },
  { name: "Cepillo Soft Touch", category: "Accesorios", detail: "Cerdas flexibles · Acabado madera", price: 28, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.8", colors: [] },
  { name: "Turbante Siena", category: "Accesorios", detail: "Algodón suave · Talla única", price: 36, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=86", badge: "Nuevo", rating: "4.7", colors: ["#30231d", "#76513e", "#c69a72"] },
  { name: "Soporte Elegance", category: "Accesorios", detail: "Expositor plegable · Metal mate", price: 19, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.6", colors: [] },
  { name: "Funda de Satén", category: "Accesorios", detail: "Protección nocturna · Satén", price: 16, image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=86", badge: "", rating: "4.8", colors: ["#30231d", "#76513e"] },
];

@Injectable({ providedIn: "root" })
export class StaticProductRepository implements ProductRepository {
  getCatalog(): readonly Product[] { return CATALOG; }
  getFeatured(): readonly FeaturedProduct[] { return FEATURED; }
  getProductsForCategories(categories: readonly string[]): readonly Product[] {
    const categorySet = new Set(categories);
    return [...CATALOG, ...COLLECTION_PRODUCTS].filter((product) =>
      categorySet.has(product.category),
    );
  }
}
