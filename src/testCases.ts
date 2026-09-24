// Known input → expected output pairs, shown on the page and run by Vitest.
// Deliberately different from the development examples (HELLO / ATTACK / SECRET).

export interface TestCase {
  name: string;
  mode: "encrypt" | "decrypt";
  input: string;
  key: number;
  expected: string;
}

export const testCases: TestCase[] = [
  { name: "Basic encryption", mode: "encrypt", input: "CRYPTOGRAPHY", key: 4, expected: "GVCTXSKVETLC" },
  { name: "Wrap-around Z → A", mode: "encrypt", input: "XYZ", key: 3, expected: "ABC" },
  { name: "Case & punctuation preserved", mode: "encrypt", input: "Meet me at noon!", key: 13, expected: "Zrrg zr ng abba!" },
  { name: "Basic decryption", mode: "decrypt", input: "WKH TXLFN", key: 3, expected: "THE QUICK" },
  { name: "Decryption with large key", mode: "decrypt", input: "Byffi Qilfx", key: 20, expected: "Hello World" },
];
