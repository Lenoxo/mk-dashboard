import { describe, expect, test } from "vitest";
import { fizzbuzz } from "../src/utils/fizzbuzz";

/*
Debe haber una función que reciba un número de parametro y:

1. Retorne "fizz" si el número es múltiplo de 3
2. Retorne "buzz" si el número es múltiplo de 5
3. Returne "fizzbuzz" si el número es múltiplo de 3 y 5
4. Retorne el número si ninguno de los casos anteriores se cumple
*/

describe("fizzbuzz", () => {
  // Este test ya está cubierto por los siguientes
  // test("should be a function", () => {
  //   expect(typeof fizzbuzz).toBe("function");
  // });

  // Este test ya está cubierto por los siguientes
  // test("should throw an error if parameter is not a number", () => {
  //   expect(() => fizzbuzz()).toThrow();
  // });

  test("should throw specific error if parameter is not a number", () => {
    expect(() => fizzbuzz()).toThrow("parameter is not a number");
  });

  test("should return a number if a valid parameter is received", () => {
    expect(fizzbuzz(2)).toBe(2);
  });

  test("should return fizz if parameter is a multiple of 3", () => {
    expect(fizzbuzz(3)).toBe("fizz");
    expect(fizzbuzz(6)).toBe("fizz");
    expect(fizzbuzz(12)).toBe("fizz");
  });

  test("should return buzz if parameter is a multiple of 5", () => {
    expect(fizzbuzz(5)).toBe("buzz");
    expect(fizzbuzz(25)).toBe("buzz");
  });

  test("should return fizzbuzz if parameter is a multiple of 3 and 5", () => {
    expect(fizzbuzz(60)).toBe("fizzbuzz");
    expect(fizzbuzz(15)).toBe("fizzbuzz");
  });
});
