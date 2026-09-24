// Caesar cipher core logic. Pure functions, no DOM access.

export const ALPHABET_SIZE = 26;

export type ValidationResult<T> = { ok: true; value: T } | { ok: false; error: string };

export interface BruteForceResult {
  key: number;
  text: string;
}

export interface ShiftStep {
  input: string;
  inputIndex: number;
  outputIndex: number;
  output: string;
}

// Shift one character; non-letters pass through unchanged, case is preserved.
function shiftChar(ch: string, shift: number): string {
  const code = ch.charCodeAt(0);
  let base: number;
  if (code >= 65 && code <= 90) base = 65;
  else if (code >= 97 && code <= 122) base = 97;
  else return ch;
  const index = (((code - base + shift) % ALPHABET_SIZE) + ALPHABET_SIZE) % ALPHABET_SIZE;
  return String.fromCharCode(base + index);
}

export function encrypt(text: string, key: number): string {
  return Array.from(text, (ch) => shiftChar(ch, key)).join("");
}

export function decrypt(text: string, key: number): string {
  return encrypt(text, -key);
}

export function bruteForce(ciphertext: string): BruteForceResult[] {
  return Array.from({ length: ALPHABET_SIZE }, (_, key) => ({ key, text: decrypt(ciphertext, key) }));
}

export function validateKey(raw: string): ValidationResult<number> {
  const trimmed = raw.trim();
  if (trimmed === "") return { ok: false, error: "Please enter a key." };
  if (!/^-?\d+$/.test(trimmed)) return { ok: false, error: "Key must be a whole number." };
  const key = Number(trimmed);
  if (key < 0 || key > ALPHABET_SIZE - 1) return { ok: false, error: "Key must be between 0 and 25." };
  return { ok: true, value: key };
}

const ALLOWED_CHAR = /[A-Za-z0-9\s.,!?'"():;\-]/;

export function validateText(raw: string, label: string): ValidationResult<string> {
  if (raw.trim() === "") return { ok: false, error: `Please enter ${label}.` };
  for (const ch of raw) {
    if (!ALLOWED_CHAR.test(ch)) {
      return { ok: false, error: `Unsupported character: '${ch}'. Use English letters A–Z.` };
    }
  }
  return { ok: true, value: raw };
}

// TODO(step 4): implement
export function shiftSteps(_text: string, _key: number, _mode: "encrypt" | "decrypt"): ShiftStep[] {
  throw new Error("Not implemented");
}
