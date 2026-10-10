<div align="center">
  <img src="./public/profile.webp" alt="Sergio Lenza" width="160" />

  # Sergio Lenza

  ### Front-end Lead · Product · Systems

  A bilingual portfolio about turning complex product challenges into clear,
  scalable experiences.

  <p>
    <a href="https://github.com/sergiolenza/slenza-website">
      <img src="https://img.shields.io/badge/GitHub-View%20source-181717?logo=github" alt="View source on GitHub" />
    </a>
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React-19-149eca?logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" alt="TypeScript 5" />
    <img src="https://img.shields.io/badge/Languages-English%20%2B%20Espa%C3%B1ol-238636" alt="Available in English and Spanish" />
  </p>
</div>

---

## The idea

This portfolio presents Sergio's work and approach across front-end
architecture, product delivery, and technical leadership. It is designed to
make the work easy to explore, in **English and Spanish**, on both desktop and
mobile.

> From architecture to impact.

## What you'll find

- Selected product work, with the technologies and outcomes behind each project.
- A career timeline and a practical, three-step approach to product challenges.
- A responsive interface with a custom pointer orb and scroll-reveal effects.
- Localized routes at `/en` and `/es`; `/` redirects to Spanish.
- Unit tests for meaningful behavior, including routes, localization, user
  interactions, and architecture boundaries.

## Built with

| Area | Tools |
| --- | --- |
| Application | Next.js App Router, React, TypeScript |
| Localization | Lingui |
| UI | CSS Modules, shared design tokens, Lucide |
| Quality | Vitest, Testing Library, jsdom, Biome |
| Package manager | pnpm |

## Run locally

**Requirements:** Node.js `>=22.19.0` and pnpm `12.3.4`.

```bash
git clone https://github.com/sergiolenza/slenza-website.git
cd slenza-website
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to
`/es`; visit `/en` for the English version.

## Quality checks

```bash
pnpm test                # Unit tests and coverage report
pnpm test:watch          # Watch mode with coverage
pnpm lint                # Biome lint and import-boundary checks
pnpm check:boundaries    # Check dependencies between architecture layers
pnpm build               # Validate boundaries, compile translations, build
```

The test suite uses Vitest's V8 coverage reporter and enforces minimum 80%
coverage for statements, branches, functions, and lines. The current suite
covers all application and source TypeScript files.

## Releases

This project follows [Semantic Versioning](https://semver.org/):

- **Patch** (`0.1.0` → `0.1.1`): backward-compatible fixes.
- **Minor** (`0.1.0` → `0.2.0`): backward-compatible features.
- **Major** (`0.1.0` → `1.0.0`): breaking changes.

Choose the appropriate bump script:

```bash
pnpm bump:patch
pnpm bump:minor
pnpm bump:major
```

Each command updates the package version without creating a Git commit or tag.
Commit the resulting version change using the team's Conventional Commit
convention, then create and push a matching `v`-prefixed Git tag when publishing
a release (for example, `v0.2.0`).

## Architecture

The application is organized around the `portfolio` business boundary:

```text
src/
  core/portfolio/
    application/       # Use cases as workflows are introduced
    domain/            # Portfolio content and domain types
    infrastructure/    # Lingui catalogs and integrations
    ui/                # Portfolio sections and presentation
  shared/               # Reusable providers and design tokens
app/                    # Next.js routes and composition
```

Import boundaries are checked by `pnpm check:boundaries`. Components and their
tests use **PascalCase**; shared application code stays in `src/shared` only
when it is genuinely reusable.

For dependency rules, naming, and localization conventions, see
[ARCHITECTURE.md](./ARCHITECTURE.md).

---

<div align="center">
  Made with care in Madrid · <a href="https://github.com/sergiolenza">GitHub</a>
</div>
