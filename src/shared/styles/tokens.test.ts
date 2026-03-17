import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const tokensPath = path.resolve(__dirname, "tokens.css");
const tokensContent = fs.readFileSync(tokensPath, "utf-8");

describe("Design Tokens (tokens.css)", () => {
  it("should exist and not be empty", () => {
    expect(tokensContent.length).toBeGreaterThan(0);
  });

  it("should contain :root selector", () => {
    expect(tokensContent).toContain(":root");
  });

  it("should define primary color tokens", () => {
    expect(tokensContent).toContain("--color-primary:");
    expect(tokensContent).toContain("--color-primary-50:");
    expect(tokensContent).toContain("--color-primary-100:");
    expect(tokensContent).toContain("--color-primary-200:");
    expect(tokensContent).toContain("--color-primary-400:");
    expect(tokensContent).toContain("--color-primary-600:");
    expect(tokensContent).toContain("--color-primary-700:");
  });

  it("should define gray color tokens", () => {
    expect(tokensContent).toContain("--color-gray-100:");
    expect(tokensContent).toContain("--color-gray-200:");
    expect(tokensContent).toContain("--color-gray-500:");
    expect(tokensContent).toContain("--color-gray-primary:");
    expect(tokensContent).toContain("--color-gray-disabled:");
    expect(tokensContent).toContain("--color-white:");
  });

  it("should define semantic color tokens", () => {
    expect(tokensContent).toContain("--color-success:");
    expect(tokensContent).toContain("--color-danger:");
  });

  it("should only contain valid hex color values", () => {
    const hexValues = tokensContent.match(/#[A-Fa-f0-9]+/g) ?? [];
    for (const hex of hexValues) {
      expect(hex).toMatch(/^#[A-Fa-f0-9]{3,8}$/);
    }
  });

  it("should not contain hardcoded px values in color tokens", () => {
    const lines = tokensContent.split("\n").filter((l: string) => l.includes("--color-"));
    for (const line of lines) {
      expect(line).not.toMatch(/\d+px/);
    }
  });
});
