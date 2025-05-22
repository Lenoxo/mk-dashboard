export function fizzbuzz(num) {
  if (typeof num !== "number") throw new Error("parameter is not a number");

  let output = "";
  if (num % 3 === 0) output += "fizz";
  if (num % 5 === 0) output += "buzz";
  return output === "" ? num : output;
}
