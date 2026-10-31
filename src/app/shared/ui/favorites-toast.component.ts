import { Component, inject } from "@angular/core";
import { FavoritesService } from "../../core/application/favorites.service";

@Component({
  selector: "maspelo-favorites-toast",
  standalone: true,
  template: `
    @if (favorites.feedback()) {
      <div class="favorites-toast" role="status" aria-live="polite">
        <span class="favorites-toast-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M20.8 5.8c-2.5-2.6-6.4-1.2-8.8 1.6C9.6 4.6 5.7 3.2 3.2 5.8.8 8.3 2 12.9 12 20c10-7.1 11.2-11.7 8.8-14.2Z" /></svg>
        </span>
        <span>{{ favorites.feedback() }}</span>
        <button type="button" aria-label="Cerrar aviso" (click)="favorites.dismissFeedback()">×</button>
      </div>
    }
  `,
  styles: `
    :host { position: fixed; right: 20px; bottom: 22px; left: 20px; z-index: 120; display: flex; justify-content: center; pointer-events: none; }
    .favorites-toast { display: flex; width: fit-content; max-width: min(520px, 100%); align-items: center; gap: 12px; border: 1px solid rgba(255, 255, 255, .16); background: #332c27; padding: 13px 14px; color: #fff; box-shadow: 0 12px 36px rgba(27, 23, 19, .2); font-size: 12px; line-height: 1.45; animation: toast-in 180ms ease-out both; pointer-events: auto; }
    .favorites-toast-icon { display: grid; width: 30px; height: 30px; flex: 0 0 auto; place-items: center; border: 1px solid rgba(196, 168, 137, .6); border-radius: 50%; color: #e4d2be; }
    .favorites-toast-icon svg { width: 15px; fill: none; stroke: currentColor; stroke-width: 1.5; }
    .favorites-toast button { display: grid; width: 30px; height: 30px; flex: 0 0 auto; place-items: center; color: #e4d2be; font-size: 22px; line-height: 1; }
    @keyframes toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 480px) { :host { right: 12px; bottom: 12px; left: 12px; } .favorites-toast { width: 100%; font-size: 11px; } }
    @media (prefers-reduced-motion: reduce) { .favorites-toast { animation-duration: 1ms; } }
  `,
})
export class FavoritesToastComponent {
  readonly favorites = inject(FavoritesService);
}
