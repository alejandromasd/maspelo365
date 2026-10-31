import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { PRODUCT_REPOSITORY } from "../../core/domain/product.repository";
import { Product, ProductSort } from "../../core/domain/product.model";
import { filterProducts } from "../../core/application/filter-products.use-case";
import { SiteHeaderComponent } from "../../shared/ui/site-header.component";

@Component({
  selector: "maison-catalog-page",
  standalone: true,
  imports: [FormsModule, RouterLink, SiteHeaderComponent],
  templateUrl: "./catalog-page.component.html",
  styleUrl: "./catalog-page.component.css",
})
export class CatalogPageComponent {
  private readonly repository = inject(PRODUCT_REPOSITORY);
  readonly products = this.repository.getCatalog();
  readonly categoryPills = [
    { label: "Todo", values: [] },
    { label: "Prótesis", values: ["Prótesis capilar", "Peluca médica", "Peluca natural", "Peluca premium"] },
    { label: "Sistemas capilares", values: ["Sistema capilar"] },
    { label: "Toppers", values: ["Topper"] },
    { label: "Cuidado", values: ["Cuidado"] },
  ];
  readonly filterTypes = ["Prótesis capilar", "Peluca médica", "Sistema capilar", "Peluca natural", "Topper", "Peluca premium"];
  readonly colors = ["#2c201b", "#6d4936", "#b58c68", "#d2b091"];
  search = "";
  sort: ProductSort = "Recomendados";
  selectedCategory = "Todo";
  selectedTypes = new Set<string>();
  favorites = new Set<string>(["Aura Lace Front"]);
  openFilter = "";
  mobileFiltersOpen = false;
  visibleCount = 6;

  get filteredProducts(): Product[] {
    return filterProducts(this.products, {
      search: this.search,
      categories: [...this.selectedTypes],
      sort: this.sort,
    });
  }

  get visibleProducts(): Product[] {
    return this.filteredProducts.slice(0, this.visibleCount);
  }

  selectCategory(label: string): void {
    this.selectedCategory = label;
    this.selectedTypes = new Set(this.categoryPills.find((item) => item.label === label)?.values ?? []);
    this.visibleCount = 6;
  }

  toggleType(type: string): void {
    const updated = new Set(this.selectedTypes);
    updated.has(type) ? updated.delete(type) : updated.add(type);
    this.selectedTypes = updated;
    this.selectedCategory = "";
    this.visibleCount = 6;
  }

  toggleFilter(filter: string): void {
    this.openFilter = this.openFilter === filter ? "" : filter;
  }

  toggleFavorite(name: string): void {
    const updated = new Set(this.favorites);
    updated.has(name) ? updated.delete(name) : updated.add(name);
    this.favorites = updated;
  }

  clearFilters(): void {
    this.selectedTypes = new Set();
    this.selectedCategory = "Todo";
    this.visibleCount = 6;
  }
}
