import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { SiteHeaderComponent } from "../../shared/ui/site-header.component";

@Component({
  selector: "maspelo-advisory-page",
  standalone: true,
  imports: [FormsModule, RouterLink, SiteHeaderComponent],
  templateUrl: "./advisory-page.component.html",
  styleUrl: "./advisory-page.component.css",
})
export class AdvisoryPageComponent {
  name = "";
  email = "";
  consultation = "Asesoría sobre prótesis capilar";
  requestSent = false;

  submitRequest(): void {
    this.requestSent = true;
  }
}
