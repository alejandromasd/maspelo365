import { Routes } from "@angular/router";
import {
  ACCESSORIES_SECTION,
  CARE_SECTION,
  POSTIZOS_SECTION,
} from "./features/collections/collection-section.model";

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
  {
    path: "postizos",
    title: "Postizos y extensiones | Maspelo365",
    data: { section: POSTIZOS_SECTION },
    loadComponent: () =>
      import("./features/collections/collection-page.component").then(
        (component) => component.CollectionPageComponent,
      ),
  },
  {
    path: "cuidado",
    title: "Cuidado capilar | Maspelo365",
    data: { section: CARE_SECTION },
    loadComponent: () =>
      import("./features/collections/collection-page.component").then(
        (component) => component.CollectionPageComponent,
      ),
  },
  {
    path: "accesorios",
    title: "Accesorios | Maspelo365",
    data: { section: ACCESSORIES_SECTION },
    loadComponent: () =>
      import("./features/collections/collection-page.component").then(
        (component) => component.CollectionPageComponent,
      ),
  },
  {
    path: "asesoria",
    title: "Asesoría personalizada | Maspelo365",
    loadComponent: () =>
      import("./features/advisory/advisory-page.component").then(
        (component) => component.AdvisoryPageComponent,
      ),
  },
  { path: "**", redirectTo: "" },
];
