# Hy-Climb

Hy-Climb is a mobile-first static web app for the Hy-Climb club. It lists affiliated climbing centers, shows center details, supports Korean and English UI, and opens Naver Map directions for normal visits and regular-meeting routes.

## Current Product

- Product behavior and use cases: [docs/wiki/03-product.md](docs/wiki/03-product.md)
- Feature status and traceability: [docs/wiki/04-features.md](docs/wiki/04-features.md)
- Runtime architecture and deployment shape: [docs/wiki/05-architecture.md](docs/wiki/05-architecture.md)
- Planned TDD and QA contract: [docs/wiki/06-tdd-qa.md](docs/wiki/06-tdd-qa.md)
- Wiki and harness entry point: [docs/wiki/01-index.md](docs/wiki/01-index.md)

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run lint` is available for non-regression checks. The current baseline is documented in [docs/wiki/06-tdd-qa.md](docs/wiki/06-tdd-qa.md).

## Source Layout

- `src/` contains React pages, components, context, data imports, i18n JSON, and Naver Map utilities.
- `public/` contains static images and the SPA redirect rule.
- `docs/wiki/` is the canonical project wiki.
- Root legacy docs are redirects to canonical wiki pages.
