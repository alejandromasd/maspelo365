import { Product, ProductSort } from "../domain/product.model";

export interface ProductQuery {
  readonly search: string;
  readonly categories: readonly string[];
  readonly sort: ProductSort;
}

export function filterProducts(
  products: readonly Product[],
  query: ProductQuery,
): Product[] {
  const search = query.search.trim().toLocaleLowerCase("es");
  const matching = products.filter((product) => {
    const matchesSearch =
      !search ||
      `${product.name} ${product.category} ${product.detail}`
        .toLocaleLowerCase("es")
        .includes(search);
    const matchesCategory =
      !query.categories.length || query.categories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  if (query.sort === "Recomendados") return matching;
  const direction = query.sort === "Precio: menor a mayor" ? 1 : -1;
  return [...matching].sort((first, second) =>
    direction * (first.price - second.price),
  );
}
