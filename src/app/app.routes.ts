import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    title: "Maspelo365 | Pelucas y prótesis capilares",
    loadComponent: () =>
      import("./features/home/home-page.component").then(
        (component) => component.HomePageComponent,
      ),
  },
  {
    path: "protesis",
    title: "Prótesis capilares | Maspelo365",
    loadComponent: () =>
      import("./features/catalog/catalog-page.component").then(
        (component) => component.CatalogPageComponent,
      ),
  },
  { path: "**", redirectTo: "" },
];
