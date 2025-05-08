export function fizzbuzz(num) {
  if (typeof num !== "number") throw new Error("parameter is not a number");

  if ((num % 3 === 0) & (num % 5 === 0)) return "fizzbuzz";
  if (num % 3 === 0) return "fizz";
  if (num % 5 === 0) return "buzz";
  return num;
}
