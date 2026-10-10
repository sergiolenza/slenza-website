# Architecture

The source follows a boundary-oriented structure inspired by
`spa-impactshell/code/src/core`: business capabilities own their code, and
shared code is kept separate from boundary-specific behavior.

## Source structure

```text
src/
  core/
    portfolio/
      application/       # use cases, when workflows exist
      domain/            # framework-independent models and content
      infrastructure/    # external/framework adapters and integrations
      ui/                # portfolio screens, components, and presentation copy
  shared/
    ui/
      providers/         # reusable application-wide React providers
      styles/            # global design tokens and CSS custom media
```

The portfolio currently has no application workflows, so `application/` is
reserved for future use cases and contains no placeholder code. Add a use case
there when a real workflow is introduced.

### Boundary ownership

- `src/core/portfolio/` owns the portfolio feature. Its UI components are
  portfolio-specific and stay in this boundary; do not move them to `shared`
  just because they are React components.
- `src/core/portfolio/domain/` contains framework-independent portfolio models
  and static content. It must not import React, Next.js, Lingui, UI, or
  infrastructure modules.
- `src/core/portfolio/application/` is reserved for portfolio use cases and
  coordinates domain behavior without depending on UI.
- `src/core/portfolio/infrastructure/` contains adapters for external
  libraries and framework concerns. Lingui catalog loading and server
  initialization live here; translation descriptors and rendered copy remain
  in the portfolio UI layer.
- `src/core/portfolio/ui/` contains portfolio screens, components, CSS Modules,
  and presentation translations. UI can depend on the portfolio domain and
  shared modules, but domain must remain independent of UI.
- `src/shared/` contains only capabilities genuinely reusable across boundaries.
  The Lingui React provider and global styles are shared. Shared modules must
  not import from a business boundary.
- `app/` is the Next.js composition/route layer. It wires portfolio UI,
  infrastructure initialization, and shared providers to routes.

Keep dependencies directed inward: routes may compose boundary UI and
infrastructure; UI may use application/domain contracts; application may use
domain; infrastructure implements boundary-facing integrations. A boundary may
depend on `shared`, but `shared` must not depend on a boundary. Avoid circular
dependencies and do not create generic abstractions before a second real use
case demonstrates reuse.

`pnpm check:boundaries` enforces these import rules using the TypeScript parser.
It is included in `pnpm lint`, `pnpm check`, and `pnpm build`; imports are
resolved before validation so relative paths and aliases are treated alike.
Biome 2.x also supports GritQL plugins and provides `noRestrictedImports`, but
the boundary checker is used here because it validates the resolved source and
target layers rather than only matching import specifiers.

## Testing

- Unit tests use Vitest, jsdom, and React Testing Library and are colocated with
  the module or component they exercise. Component tests use the same
  **PascalCase** basename as the component (for example,
  `HeroSection.test.tsx`); tests for kebab-case modules keep that basename.
  Shared Vitest setup lives in `tests/setup.ts`. Vitest uses `vmThreads` to
  reduce repeated jsdom environment startup while retaining per-file isolation.
- Cover domain invariants, localization loading, boundary enforcement, and
  user-visible interactions rather than snapshots or render-only smoke tests.
- Run `pnpm test` for the suite, `pnpm test:watch` while developing, or
  `pnpm test:coverage` to produce text and HTML coverage reports. Coverage
  includes TypeScript and TSX files in `app/` and `src/` and enforces 80%
  minimum statements, branches, functions, and lines. The regular test command
  enables coverage and prints the text report.

## Naming conventions

- React component files and their component directories use **PascalCase**,
  including colocated styles (for example, `HeroSection/HeroSection.tsx` and
  `HeroSection/HeroSection.module.css`).
- React component exports use **PascalCase**.
- Custom hook names use **camelCase** and start with `use` (for example,
  `usePortfolioData`). Keep hooks in the owning boundary's `ui` layer; put a
  hook in `src/shared/ui` only when it is genuinely reusable.
- Utility and non-component module filenames use **kebab-case** (for example,
  `portfolio-translations.ts` or `init-lingui.ts`). Place each utility in the
  layer and boundary that owns its responsibility; do not create a catch-all
  `utils` directory.
- Code identifiers and internal slugs (including DOM section IDs and their
  fragment links) use **English**. Spanish copy belongs only in Spanish
  translation catalogs, not in source identifiers or route-independent code.

## Routing and localization

English (`en`) is the Lingui source locale and is served at `/en`; Spanish
(`es`) is served at `/es`, and `/` redirects to `/es`. Write source messages in
English, including text inside `<Trans>`. Add or update messages with
`pnpm extract`; translate them in the `.po` catalogs under
`src/core/portfolio/infrastructure/i18n/locales/`. `pnpm dev` and `pnpm build`
compile those catalogs to typed TypeScript modules before Next.js runs, so
Turbopack can bundle them without a Webpack-only loader.
