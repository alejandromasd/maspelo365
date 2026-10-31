import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { PRODUCT_REPOSITORY } from "../../core/domain/product.repository";
import { Product } from "../../core/domain/product.model";
import { CartService } from "../../core/application/cart.service";
import { FavoritesService } from "../../core/application/favorites.service";
import { SiteHeaderComponent } from "../../shared/ui/site-header.component";

@Component({
  selector: "maspelo-home-page",
  standalone: true,
  imports: [RouterLink, SiteHeaderComponent],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
  private readonly repository = inject(PRODUCT_REPOSITORY);
  readonly cart = inject(CartService);
  readonly favorites = inject(FavoritesService);
  readonly featured = this.repository.getFeatured();

  toggleFavorite(product: Product): void {
    this.favorites.toggle(product);
  }

  addToCart(product: Product): void {
    this.cart.add(product);
  }
}
