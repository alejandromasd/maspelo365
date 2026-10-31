import { Component, Input, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { filterProducts } from "../../core/application/filter-products.use-case";
import { PRODUCT_REPOSITORY } from "../../core/domain/product.repository";
import { Product, ProductSort } from "../../core/domain/product.model";
import { SiteHeaderComponent } from "../../shared/ui/site-header.component";
import { CollectionSection } from "./collection-section.model";

@Component({
  selector: "maspelo-collection-page",
  standalone: true,
  imports: [FormsModule, RouterLink, SiteHeaderComponent],
  templateUrl: "./collection-page.component.html",
  styleUrl: "./collection-page.component.css",
})
export class CollectionPageComponent {
  @Input({ required: true }) section!: CollectionSection;

  private readonly repository = inject(PRODUCT_REPOSITORY);
  search = "";
  sort: ProductSort = "Recomendados";
  selectedCategory = "Todo";
  favorites = new Set<string>();

  get products(): readonly Product[] {
    return this.repository.getProductsForCategories(this.section.categories);
  }

  get categoryOptions(): string[] {
    return ["Todo", ...this.section.categories];
  }

  get filteredProducts(): Product[] {
    const categories = this.selectedCategory === "Todo" ? [] : [this.selectedCategory];
    return filterProducts(this.products, {
      search: this.search,
      categories,
      sort: this.sort,
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  toggleFavorite(name: string): void {
    const updated = new Set(this.favorites);
    updated.has(name) ? updated.delete(name) : updated.add(name);
    this.favorites = updated;
  }
}
