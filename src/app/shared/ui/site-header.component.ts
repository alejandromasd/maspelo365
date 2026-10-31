import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "maspelo-site-header",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./site-header.component.html",
  styleUrl: "./site-header.component.css",
})
export class SiteHeaderComponent {
  @Input() activeSection = "Inicio";
  readonly navItems = [
    { label: "Inicio", route: "/" },
    { label: "Prótesis", route: "/protesis" },
    { label: "Postizos", route: "/postizos" },
    { label: "Cuidado", route: "/cuidado" },
    { label: "Accesorios", route: "/accesorios" },
    { label: "Asesoría", route: "/asesoria" },
  ];
  menuOpen = false;
}
