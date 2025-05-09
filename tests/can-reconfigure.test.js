import { describe, test, expect } from "vitest";

import { canReconfigure } from "../src/utils/can-reconfigure";

describe("canReconfigure", () => {
  test("should be a function", () => {
    expect(canReconfigure).toBeTypeOf("function");
  });

  test("first parameter should be a string", () => {
    expect(() => canReconfigure()).toThrow("first parameter should be a string");
    expect(() => canReconfigure(3)).toThrow("first parameter should be a string");
  });

  test("second parameter should be a string", () => {
    expect(() => canReconfigure("a")).toThrow("second parameter should be a string");
    expect(() => canReconfigure("a", 2)).toThrow("second parameter should be a string");
  });

  test("should return a boolean", () => {
    expect(canReconfigure("a", "b")).toBe(true);
  });

  test("should return false if the length of the first parameter is different to the second parameter, and true otherwise", () => {
    expect(canReconfigure("apc", "ap")).toBe(false);
  });

  test("should return false if it does not have the same amount of unique letters in both parameters", () => {
    expect(canReconfigure("apc", "eee")).toBe(false);
  });
});
