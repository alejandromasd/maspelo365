import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FloatingScrollbarComponent } from "./shared/ui/floating-scrollbar.component";
import { CartDrawerComponent } from "./shared/ui/cart-drawer.component";
import { FavoritesToastComponent } from "./shared/ui/favorites-toast.component";

@Component({
  selector: "maspelo-root",
  standalone: true,
  imports: [RouterOutlet, FloatingScrollbarComponent, CartDrawerComponent, FavoritesToastComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
