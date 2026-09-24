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

## Status

Done: clean black/white UI, core cipher logic in `src/caesar.ts` (`encrypt`, `decrypt`, `bruteForce`, `validateKey`, `validateText`), and working Encrypt/Decrypt cards with error messages.

## Remaining tasks

All element IDs already exist in `index.html` and all CSS is already written — these are TypeScript-only. Reuse `byId`, `showError`, `clearError`, `showResult` from `src/ui/dom.ts`.

- [ ] **1. Visualization** — `src/caesar.ts` (`shiftSteps`) + `src/ui/visualization.ts`
  - `shiftSteps(text, key, mode)`: one `{ input, inputIndex, outputIndex, output }` per letter (skip non-letters).
  - `renderVisualization`: hide `#viz-empty`; render the plain A–Z row and the shifted A–Z row into `#viz-alphabet` (markup in the comment at the bottom of `style.css`, mark used letters with `.used`); render a table into `#viz-steps`: Letter | Index | (Index ± key) mod 26 | Result.
  - Already called after every Encrypt/Decrypt — no wiring needed.
- [ ] **2. Brute force** — `src/ui/bruteForce.ts` (+ `scoreEnglish` in `src/caesar.ts`)
  - `#bf-btn` click → `validateText(input, "ciphertext")` → error via `showError`, else `bruteForce()` → 26-row table (Key | Decrypted text) in `#bf-results`.
  - `scoreEnglish(text)`: simple letter-frequency score (E, T, A, O, I, N, spaces). Best row gets class `highlight`.
- [ ] **3. Test cases** — `src/ui/testRunner.ts`
  - `#tests-btn` click → run each entry of `testCases` (`src/testCases.ts`) with `encrypt`/`decrypt` by `mode`.
  - Table in `#tests-results`: Input | Key | Mode | Output | Expected | Result, with `<span class="pass">PASS</span>` / `<span class="fail">FAIL</span>`.
  - `#tests-summary` → e.g. `5/5 passed`.
- [ ] **4. Polish (both)** — short explanation of Caesar cipher + brute-force weakness here, screenshots, rehearse the demo (encrypt → decrypt → an error → Try All Keys → Run Tests).
