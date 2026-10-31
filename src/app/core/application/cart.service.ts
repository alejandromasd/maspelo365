import { computed, effect, Injectable, inject, signal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { CartLine } from "../domain/cart-line.model";
import { Product } from "../domain/product.model";

const STORAGE_KEY = "maspelo365.cart.v1";
const FREE_SHIPPING_THRESHOLD = 90;
const STANDARD_DELIVERY = 4.9;

@Injectable({ providedIn: "root" })
export class CartService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly lines = signal<CartLine[]>(this.restore());
  readonly isOpen = signal(false);
  readonly lastAddedName = signal("");
  readonly itemCount = computed(() =>
    this.lines().reduce((total, line) => total + line.quantity, 0),
  );
  readonly subtotal = computed(() =>
    this.lines().reduce(
      (total, line) => total + line.product.price * line.quantity,
      0,
    ),
  );
  readonly remainingForFreeShipping = computed(() =>
    Math.max(0, FREE_SHIPPING_THRESHOLD - this.subtotal()),
  );
  readonly shippingProgress = computed(() =>
    Math.min(100, (this.subtotal() / FREE_SHIPPING_THRESHOLD) * 100),
  );
  readonly delivery = computed(() =>
    this.subtotal() >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_DELIVERY,
  );
  readonly total = computed(() => this.subtotal() + this.delivery());

  constructor() {
    effect(() => {
      if (this.isBrowser) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lines()));
        } catch {
          // Keep the in-memory cart usable when browser storage is unavailable.
        }
      }
    });
  }

  add(product: Product): void {
    this.lines.update((lines) => {
      const existing = lines.find((line) => line.product.name === product.name);
      return existing
        ? lines.map((line) =>
            line.product.name === product.name
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          )
        : [...lines, { product, quantity: 1 }];
    });
    this.lastAddedName.set(product.name);
    this.isOpen.set(true);
  }

  increase(productName: string): void {
    this.lines.update((lines) =>
      lines.map((line) =>
        line.product.name === productName
          ? { ...line, quantity: line.quantity + 1 }
          : line,
      ),
    );
  }

  decrease(productName: string): void {
    this.lines.update((lines) =>
      lines
        .map((line) =>
          line.product.name === productName
            ? { ...line, quantity: line.quantity - 1 }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }

  remove(productName: string): void {
    this.lines.update((lines) =>
      lines.filter((line) => line.product.name !== productName),
    );
  }

  clear(): void {
    this.lines.set([]);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  private restore(): CartLine[] {
    if (!this.isBrowser) return [];
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (!Array.isArray(stored)) return [];
      return stored.filter((line): line is CartLine => this.isCartLine(line));
    } catch {
      return [];
    }
  }

  private isCartLine(value: unknown): value is CartLine {
    if (!value || typeof value !== "object") return false;
    const line = value as Partial<CartLine>;
    const product = line.product;
    return (
      typeof line.quantity === "number" &&
      Number.isInteger(line.quantity) &&
      line.quantity > 0 &&
      !!product &&
      typeof product.name === "string" &&
      typeof product.price === "number" &&
      typeof product.image === "string"
    );
  }
}
