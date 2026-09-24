// Shared DOM helpers. Owner: Person B.

export function byId<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el as T;
}

export function showError(el: HTMLElement, message: string): void {
  el.textContent = `❌ Error: ${message}`;
  el.hidden = false;
}

export function clearError(el: HTMLElement): void {
  el.textContent = "";
  el.hidden = true;
}

export function showResult(el: HTMLElement, text: string): void {
  el.textContent = text;
  el.hidden = false;
}
