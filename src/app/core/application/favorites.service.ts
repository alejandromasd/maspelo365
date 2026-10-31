import { isPlatformBrowser } from "@angular/common";
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { Product } from "../domain/product.model";

const STORAGE_KEY = "maspelo365.favorites.v1";

@Injectable({ providedIn: "root" })
export class FavoritesService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly products = signal<Product[]>(this.restore());
  readonly count = computed(() => this.products().length);
  readonly feedback = signal("");
  private feedbackTimeout?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      if (!this.isBrowser) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products()));
      } catch {
        // Keep favorites available in memory when browser storage is unavailable.
      }
    });
  }

  has(productName: string): boolean {
    return this.products().some((product) => product.name === productName);
  }

  toggle(product: Product): void {
    const wasFavorite = this.has(product.name);
    this.products.update((products) =>
      wasFavorite
        ? products.filter((favorite) => favorite.name !== product.name)
        : [...products, product],
    );
    this.showFeedback(
      wasFavorite
        ? `${product.name} se ha quitado de tus favoritos.`
        : `${product.name} se ha guardado en tus favoritos.`,
    );
  }

  remove(productName: string): void {
    if (!this.has(productName)) return;
    this.products.update((products) =>
      products.filter((product) => product.name !== productName),
    );
    this.showFeedback(`${productName} se ha quitado de tus favoritos.`);
  }

  dismissFeedback(): void {
    this.feedback.set("");
    if (this.feedbackTimeout) clearTimeout(this.feedbackTimeout);
  }

  private showFeedback(message: string): void {
    this.feedback.set(message);
    if (!this.isBrowser) return;
    if (this.feedbackTimeout) clearTimeout(this.feedbackTimeout);
    this.feedbackTimeout = setTimeout(() => this.feedback.set(""), 2800);
  }

  private restore(): Product[] {
    if (!this.isBrowser) return [];
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (!Array.isArray(stored)) return [];
      return stored.filter((product): product is Product => this.isProduct(product));
    } catch {
      return [];
    }
  }

  private isProduct(value: unknown): value is Product {
    if (!value || typeof value !== "object") return false;
    const product = value as Partial<Product>;
    return (
      typeof product.name === "string" &&
      typeof product.category === "string" &&
      typeof product.price === "number" &&
      typeof product.image === "string"
    );
  }
}
