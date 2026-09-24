import { describe, expect, it } from "vitest";
import { decrypt, encrypt } from "./caesar";
import { testCases } from "./testCases";

describe("Caesar cipher test cases", () => {
  it.each(testCases)("$name: $input (key $key) → $expected", ({ mode, input, key, expected }) => {
    const output = mode === "encrypt" ? encrypt(input, key) : decrypt(input, key);
    expect(output).toBe(expected);
  });
});
