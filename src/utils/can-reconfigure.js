export function canReconfigure(from, to) {
  if (typeof from !== "string") throw new Error("first parameter should be a string");
  if (typeof to !== "string") throw new Error("second parameter should be a string");

  if (from.length !== to.length) return false;

  const isSameAmountOfUniqueLetters = new Set(from).size === new Set(to).size;

  if (!isSameAmountOfUniqueLetters) return false;

  return true;
}
