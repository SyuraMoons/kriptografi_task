// Encrypt & Decrypt sections. Owner: Person B.
// Elements: #enc-input #enc-key #enc-btn #enc-error #enc-output
//           #dec-input #dec-key #dec-btn #dec-error #dec-output

import { decrypt, encrypt, validateKey, validateText } from "../caesar";
import { byId, clearError, showError, showResult } from "./dom";
import { renderVisualization } from "./visualization";

type Mode = "encrypt" | "decrypt";

function wire(prefix: "enc" | "dec", mode: Mode, label: string): void {
  const input = byId<HTMLTextAreaElement>(`${prefix}-input`);
  const keyInput = byId<HTMLInputElement>(`${prefix}-key`);
  const button = byId<HTMLButtonElement>(`${prefix}-btn`);
  const error = byId<HTMLDivElement>(`${prefix}-error`);
  const output = byId<HTMLDivElement>(`${prefix}-output`);

  const run = (): void => {
    const text = validateText(input.value, label);
    const key = validateKey(keyInput.value);
    if (!text.ok || !key.ok) {
      showError(error, !text.ok ? text.error : !key.ok ? key.error : "");
      output.hidden = true;
      return;
    }

    clearError(error);
    const result = mode === "encrypt" ? encrypt(text.value, key.value) : decrypt(text.value, key.value);
    showResult(output, result);
    renderVisualization(text.value, key.value, mode);
  };

  button.addEventListener("click", run);
  keyInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") run();
  });
}

export function initEncryptDecrypt(): void {
  wire("enc", "encrypt", "plaintext");
  wire("dec", "decrypt", "ciphertext");
}
