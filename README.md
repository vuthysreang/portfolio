# Vuthy Sreang’s portfolio

A Next.js portfolio with an interactive orbital sculpture, locally hosted artwork and fonts, light and dark themes, and keyboard-accessible project details.

## Development

Use Node.js 24 and npm. From the repository root, run:

```sh
npm ci
npm run dev
```

The development server uses port 3000 by default. Run `npm run typecheck` to check TypeScript. For production, run `npm run build` followed by `npm start`.

## Content

Edit the introduction, biography, toolkit, and contact links in `app/page.tsx`. The project descriptions and source links live in `components/Projects.tsx`. Relay Mail and Data Atlas are display names for existing public repositories. Orbit Lab is an original interactive concept included in this site.

The orbital geometry is generated locally in `components/Flux.tsx`. It responds to pointer movement, includes a pause control, and starts paused for visitors who prefer reduced motion. Theme colors and responsive layouts are in `app/globals.css`.
