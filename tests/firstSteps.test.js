import { describe, expect, test } from "vitest";

/*
Debe haber una función que reciba un número de parametro y:

1. Retorne "fizz" si el número es múltiplo de 3
2. Retorne "buzz" si el número es múltiplo de 5
3. Returne "fizzbuzz" si el número es múltiplo de 3 y 5
4. Retorne el número si ninguno de los casos anteriores se cumple
*/

function fizzbuzz(num) {
  if (typeof num !== "number") throw new Error();
}

describe("fizzbuzz", () => {
  test("fizzbuzz should be a function", () => {
    expect(typeof fizzbuzz).toBe("function");
  });

  test("fizzbuzz should throw an error if parameter is not a number", () => {
    expect(() => fizzbuzz()).toThrow();
  });
});
