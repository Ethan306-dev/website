# 306.

Website for **306.** — a solo development studio by Ethan Weeks, building web, apps, and software.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/work/volleycanvas` | VolleyCanvas product page |
| `/work/volleycanvas/drills` | VolleyCanvas Drill Library |
| `/work/ace-stats` | Ace Stats website draft |
| `/work/platinum-body-works` | Platinum Body Works website draft |
| `/work/finishing-touch` | Finishing Touch by Gemma website draft |
| `/work/rebeccas-tearooms` | Rebecca's Licensed Tearooms website draft |
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

## Client shares

Send a client a private preview link for a website you built for them.

1. Sign in with **Admin** (top right).
2. Open **Shares** → **New client share**.
3. Add a title, client name, and upload a file or folder of the site.
4. **Save share**, then **Publish zip**.
5. Extract the zip into `public/shares/` so you get:
   - `public/shares/manifest.json`
   - `public/shares/{slug}/…` (the website files)
6. Commit and push. Share: `https://your-domain/share/{slug}`

Published shares are public URLs (anyone with the link can open them).
