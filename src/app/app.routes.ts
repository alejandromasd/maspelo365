import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    title: "Maison del cabello | Pelucas y prótesis capilares",
    loadComponent: () =>
      import("./features/home/home-page.component").then(
        (component) => component.HomePageComponent,
      ),
  },
  {
    path: "protesis",
    title: "Prótesis capilares | Maison del cabello",
    loadComponent: () =>
      import("./features/catalog/catalog-page.component").then(
        (component) => component.CatalogPageComponent,
      ),
  },
  { path: "**", redirectTo: "" },
];
