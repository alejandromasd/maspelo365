export interface Product {
  readonly name: string;
  readonly category: string;
  readonly detail: string;
  readonly price: number;
  readonly previousPrice?: number;
  readonly image: string;
  readonly badge: string;
  readonly rating: string;
  readonly colors: readonly string[];
}

export interface FeaturedProduct {
  readonly name: string;
  readonly type: string;
  readonly price: string;
  readonly image: string;
  readonly tone: string;
}

export type ProductSort =
  | "Recomendados"
  | "Precio: menor a mayor"
  | "Precio: mayor a menor";
