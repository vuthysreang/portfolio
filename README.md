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

Edit the work history in `data/experience.json`. The one-page public résumé is `public/Vuthy-Sreang-CV.pdf`. Edit the introduction, biography, toolkit, and contact links in `app/page.tsx`. The project descriptions and source links live in `components/Projects.tsx`. Relay Mail and Data Atlas are display names for existing public repositories. Orbit Lab is an original interactive concept included in this site.

The orbital geometry is generated locally in `components/Flux.tsx`. It responds to pointer movement, includes a pause control, and starts paused for visitors who prefer reduced motion. Theme colors and responsive layouts are in `app/globals.css`.

## GitHub Pages

Run `npm run deploy:pages` from the repository root to build the static site for `/portfolio/` and push the contents of `out/` to the `gh-pages` branch. The Git remote must allow pushes. In repository Settings → Pages, choose **Deploy from a branch**, **gh-pages**, and **/ (root)**. The project URL is https://vuthysreang.github.io/portfolio/.

To generate the same static files locally without publishing, run `npm run build:pages`. Ordinary development and production builds still run at the domain root.
