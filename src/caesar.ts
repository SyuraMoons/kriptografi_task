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

// TODO(step 2): implement
export function encrypt(_text: string, _key: number): string {
  throw new Error("Not implemented");
}

// TODO(step 2): implement
export function decrypt(_text: string, _key: number): string {
  throw new Error("Not implemented");
}

// TODO(step 2): implement
export function bruteForce(_ciphertext: string): BruteForceResult[] {
  throw new Error("Not implemented");
}

// TODO(step 2): implement
export function validateKey(_raw: string): ValidationResult<number> {
  throw new Error("Not implemented");
}

// TODO(step 2): implement
export function validateText(_raw: string, _label: string): ValidationResult<string> {
  throw new Error("Not implemented");
}

// TODO(step 4): implement
export function shiftSteps(_text: string, _key: number, _mode: "encrypt" | "decrypt"): ShiftStep[] {
  throw new Error("Not implemented");
}
