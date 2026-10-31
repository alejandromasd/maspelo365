import { ApplicationConfig } from "@angular/core";
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from "@angular/router";
import { routes } from "./app.routes";
import { PRODUCT_REPOSITORY } from "./core/domain/product.repository";
import { StaticProductRepository } from "./core/infrastructure/static-product.repository";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: PRODUCT_REPOSITORY, useExisting: StaticProductRepository },
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
    ),
  ],
};
