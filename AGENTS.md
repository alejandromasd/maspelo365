# Maison del cabello

Angular 22 standalone application using Tailwind CSS v4.

## Development

- `npm start` launches the Angular development server on port 8443.
- `npm run build` creates a production build.

## Architecture

- `src/app/core/domain` contains business models and repository contracts.
- `src/app/core/application` contains use cases independent from Angular UI.
- `src/app/core/infrastructure` contains adapters for external or static data.
- `src/app/features` contains lazy loaded, standalone feature pages.
- `src/app/shared/ui` contains reusable standalone UI components.
- `src/app/app.routes.ts` defines lazy routes; `src/app/app.config.ts` configures application providers.

Keep feature components focused on presentation and interaction. Inject domain ports instead of importing infrastructure implementations into feature pages.

## Styling

Tailwind CSS v4 runs through `@tailwindcss/postcss`. Global styles and the design tokens live in `src/index.css`.
