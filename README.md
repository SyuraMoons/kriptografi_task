# Caesar Cipher — Kriptografi Mini-Project
**harfi

An interactive web app for learning the **Caesar cipher**: encrypt and decrypt messages, see step by step how every letter is shifted, and break a ciphertext by trying all possible keys. Built as a group mini-project for the Cryptography course.

## What is the Caesar cipher?

The Caesar cipher is one of the oldest encryption techniques. Every letter is replaced by the letter a fixed number of positions (the **key**) further along the alphabet, wrapping around from Z back to A.

Letters are numbered `A = 0, B = 1, …, Z = 25`, and with key `k`:

```
Encryption:  E(x) = (x + k) mod 26
Decryption:  D(x) = (x − k) mod 26
```

**Example** — `CRYPTOGRAPHY` with key `4` → `GVCTXSKVETLC`

| Letter | Index x | (x + 4) mod 26 | Result |
|---|---|---|---|
| C | 2 | 6 | G |
| R | 17 | 21 | V |
| Y | 24 | 28 mod 26 = 2 | C |
| … | | | |

## Features

| | Feature | Description |
|---|---|---|
| ✅ | **Encryption** | Plaintext + key → ciphertext |
| ✅ | **Decryption** | Ciphertext + key → plaintext |
| ✅ | **Input validation** | Clear error messages instead of crashes |
| 🚧 | **Visualization** | Shifted alphabet + per-letter table of the calculation |
| 🚧 | **Brute-force attack** | "Try All Keys" lists all 26 decryptions and highlights the most likely one |
| 🚧 | **Test cases** | Input → Algorithm → Output → Expected → PASS/FAIL, shown on the page |

## Rules & input validation

- Only English letters `A–Z` / `a–z` are shifted; upper/lower case is kept.
- Spaces, digits and basic punctuation (`. , ! ? ' " ( ) : ; -`) pass through unchanged.
- The key must be a whole number from `0` to `25`.

| Invalid input | Message shown |
|---|---|
| Empty plaintext / ciphertext | `❌ Error: Please enter plaintext.` / `… ciphertext.` |
| Empty key | `❌ Error: Please enter a key.` |
| Key is not a number (e.g. `abc`, `3.5`) | `❌ Error: Key must be a whole number.` |
| Key out of range (e.g. `30`, `-1`) | `❌ Error: Key must be between 0 and 25.` |
| Unsupported character (e.g. `é`) | `❌ Error: Unsupported character: 'é'. Use English letters A–Z.` |

## Security: why the Caesar cipher is weak

There are only **26 possible keys**, so an attacker can simply try every one of them — a *brute-force attack* — which takes a computer less than a millisecond. The correct key is the one whose output reads as normal English; the app picks it automatically with a simple English letter-frequency score. The Caesar cipher is therefore useful for learning the ideas of substitution and modular arithmetic, but it provides **no real security**.

## Test cases

Deliberately different from the classroom examples (HELLO / ATTACK / SECRET). Defined in `src/testCases.ts`; run with `npm test` or the **Run Tests** button on the page.

| # | Mode | Input | Key | Expected output | Checks |
|---|---|---|---|---|---|
| 1 | Encrypt | `CRYPTOGRAPHY` | 4 | `GVCTXSKVETLC` | Basic encryption |
| 2 | Encrypt | `XYZ` | 3 | `ABC` | Wrap-around Z → A |
| 3 | Encrypt | `Meet me at noon!` | 13 | `Zrrg zr ng abba!` | Case & punctuation preserved |
| 4 | Decrypt | `WKH TXLFN` | 3 | `THE QUICK` | Basic decryption |
| 5 | Decrypt | `Byffi Qilfx` | 20 | `Hello World` | Large key |

## Tech stack

- **TypeScript** — cipher logic and UI
- **Vite** — dev server and build
- **Vitest** — automated tests
- Plain HTML + CSS, no framework

## Getting started

```bash
npm install
npm run dev      # then open http://localhost:5173
npm test         # run test cases (Vitest)
npm run build    # static build to dist/
```

## Project structure

```
index.html               page layout (all sections)
src/
  caesar.ts              cipher logic + validation (pure functions, no DOM)
  caesar.test.ts         Vitest tests
  testCases.ts           the test cases shown on the page
  style.css              black/white styling
  main.ts                entry point
  ui/
    encryptDecrypt.ts    Encrypt & Decrypt sections
    visualization.ts     "How It Works" section
    bruteForce.ts        "Try All Keys" attack section
    testRunner.ts        on-page test results
    dom.ts               shared DOM helpers
```

## Team & contribution

| Person A — Crypto & Attack | Person B — Interface & Visualization |
|---|---|
| `src/caesar.ts` (logic + validation) | `src/ui/encryptDecrypt.ts` |
| `src/caesar.test.ts` | `src/ui/visualization.ts` |
| `src/ui/bruteForce.ts` | `src/ui/dom.ts` |
| `src/ui/testRunner.ts` | `src/style.css`, `README.md` |

Only edit files you own. Work on a `feat/...` branch and open a PR; `npm test` and `npx tsc --noEmit` must pass before merging.

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
