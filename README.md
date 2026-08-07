# 306.

Website for **306.** — a solo development studio by Ethan Weeks, building web, apps, and software.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/work/volleycanvas` | VolleyCanvas product page |
| `/work/volleycanvas/drills` | VolleyCanvas Drill Library |
| `/about` | About |
| `/contact` | Contact |

## Stack

- Vite
- React
- TypeScript
- React Router

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Customize

- Contact email + App Store link: `src/constants.ts`
- VolleyCanvas copy (overview, features, details, facts, notes): `src/content/volleycanvas.ts`

## Drill Library admin

No Vercel Pro / Blob required.

1. Click **Admin** (top right) and sign in.
2. On `/work/volleycanvas/drills`, upload a JSON drill (name + difficulty).
3. Click **Publish library file** to download `library.json`.
4. Replace `public/drills/library.json` with that file, commit, and push.
5. After Vercel redeploys, everyone can browse/download the drills.

Admin sign-in is client-side (simple gate, not secure).
