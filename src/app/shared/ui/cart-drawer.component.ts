import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  PLATFORM_ID,
  ViewChild,
  effect,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { CartService } from "../../core/application/cart.service";

@Component({
  selector: "maspelo-cart-drawer",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./cart-drawer.component.html",
  styleUrl: "./cart-drawer.component.css",
})
export class CartDrawerComponent {
  readonly cart = inject(CartService);
  checkoutNotice = false;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @ViewChild("cartPanel")
  set cartPanel(panel: ElementRef<HTMLElement> | undefined) {
    if (panel && this.cart.isOpen() && this.isBrowser) {
      queueMicrotask(() => panel.nativeElement.focus());
    }
  }

  constructor() {
    effect((onCleanup) => {
      if (!this.isBrowser || !this.cart.isOpen()) return;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      onCleanup(() => {
        document.body.style.overflow = previousOverflow;
      });
    });
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  }

  close(): void {
    this.cart.close();
    this.checkoutNotice = false;
    if (this.isBrowser) {
      window.setTimeout(() => {
        document.querySelector<HTMLElement>("[data-cart-trigger]")?.focus();
      });
    }
  }

  showCheckoutNotice(): void {
    this.checkoutNotice = true;
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    if (this.cart.isOpen()) this.close();
  }

  @HostListener("document:keydown", ["$event"])
  onTab(event: KeyboardEvent): void {
    if (!this.cart.isOpen() || event.key !== "Tab") return;
    const panel = document.querySelector<HTMLElement>("[role='dialog'][aria-labelledby='cart-title']");
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      "button:not([disabled]), a[href], input:not([disabled]), [tabindex='0']",
    );
    const first = focusable.item(0);
    const last = focusable.item(focusable.length - 1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
}
