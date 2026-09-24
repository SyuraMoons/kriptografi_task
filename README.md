# kriptografi_task — Caesar Cipher
**harfi

Interactive Caesar cipher web app (TypeScript + Vite).

## Run

```bash
npm install
npm run dev      # local dev server
npm test         # run test cases (Vitest)
npm run build    # static build to dist/
```

## Team split

| Person A — Crypto & Attack | Person B — Interface & Visualization |
|---|---|
| `src/caesar.ts` (logic + validation) | `src/ui/encryptDecrypt.ts` |
| `src/caesar.test.ts` | `src/ui/visualization.ts` |
| `src/ui/bruteForce.ts` | `src/ui/dom.ts` |
| `src/ui/testRunner.ts` | `src/style.css`, `README.md` |

Only edit files you own. Work on a `feat/...` branch and open a PR; `npm test` and `npx tsc --noEmit` must pass before merging.
