import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FloatingScrollbarComponent } from "./shared/ui/floating-scrollbar.component";
import { CartDrawerComponent } from "./shared/ui/cart-drawer.component";

@Component({
  selector: "maspelo-root",
  standalone: true,
  imports: [RouterOutlet, FloatingScrollbarComponent, CartDrawerComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
