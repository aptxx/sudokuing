# Sudokuing

Play free Sudoku online at **[sudokuing.com](https://sudokuing.com)** — no download, no signup, a fresh puzzle every time.

## Features

- **Three themes**: classic numbers, alphabet letters (A–I), and colors
- **Five difficulty levels**: easy, medium, hard, expert, and crazy
- Every generated puzzle has exactly one solution
- Auto-save in progress games per theme (browser localStorage)
- Notes / pencil marks, mistake counter, hints
- Dark mode, mobile keyboard support, PWA manifest
- Privacy-friendly: no accounts, no tracking beyond analytics

## Tech Stack

- [Next.js](https://nextjs.org/) 15 (App Router) + React
- [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Cloudflare Workers](https://workers.cloudflare.com/) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)
- Ads served through Google Ad Manager (GAM)

## Development

```bash
npm install
npm run dev        # local dev server
npm run lint       # eslint
npm run build      # production build
npm run preview    # build + run on workerd locally (wrangler)
npm run deploy     # build + deploy to Cloudflare Workers
```

Configuration lives in `.env` (`NEXT_PUBLIC_BASE_URL`) and `src/config/setting.ts`.
Wrangler config: `wrangler.jsonc`.

## License

[LGPL-2.1](./LICENSE)
