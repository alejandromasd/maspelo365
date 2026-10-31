import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "maison-site-header",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./site-header.component.html",
  styleUrl: "./site-header.component.css",
})
export class SiteHeaderComponent {
  @Input() isCatalog = false;
  menuOpen = false;
}
