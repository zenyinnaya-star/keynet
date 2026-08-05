# keynet

A Next.js web application starter — App Router, TypeScript, and Tailwind CSS.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- ESLint

## Project structure

```
src/
  app/                 # routes (App Router)
    layout.tsx         # root layout (Header + Footer)
    page.tsx           # home page
    about/page.tsx      # example route
  components/
    layout/            # Header, Footer
    ui/                # reusable UI primitives (Button, ...)
  lib/
    utils.ts           # shared helpers (cn className merge)
```

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
