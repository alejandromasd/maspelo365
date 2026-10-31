import { InjectionToken } from "@angular/core";
import { FeaturedProduct, Product } from "./product.model";

export interface ProductRepository {
  getCatalog(): readonly Product[];
  getFeatured(): readonly FeaturedProduct[];
  getProductsForCategories(categories: readonly string[]): readonly Product[];
}

export const PRODUCT_REPOSITORY = new InjectionToken<ProductRepository>(
  "PRODUCT_REPOSITORY",
);
