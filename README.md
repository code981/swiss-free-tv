# Swiss Free TV

Ad-free web app shell for legal Swiss/free TV sources.

## Principles

- No pirated streams.
- No ad blocking or paywall/geoblock bypassing.
- The app itself has no ads or tracking.
- Prefer official broadcaster live pages.
- Use direct in-app playback only for clearly public HLS streams.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Privacy notes

- Favorites and private stream entries stay in browser `localStorage`.
- Private stream playback connects directly from the browser to the URL you add; the app does not proxy or upload those URLs.
- Do not add streams unless you have the right to use them.

## Deploy

This is a static Vite app. Good free deployment targets:

- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages

Suggested deploy settings:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `^20.19.0 || >=22.12.0`

For a public site, connect this folder/repository to one of those providers and publish the `dist` directory produced by `npm run build`.

## Maintenance backlog

- Verify official links monthly or after broadcaster redesigns.
- Add more legally available Swiss/local channels.
- Add optional EPG from legal XMLTV/source feeds.
- Add channel health checks for direct HLS streams.
- Add PWA install/offline shell.
