import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FloatingScrollbarComponent } from "./shared/ui/floating-scrollbar.component";

@Component({
  selector: "maison-root",
  standalone: true,
  imports: [RouterOutlet, FloatingScrollbarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
