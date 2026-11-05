import { readFile } from "node:fs/promises";

const greeting = "hello";

export async function load(path) {
  const { length } = greeting;
  console.warn("loading", path, length);
  return readFile(path, "utf8");
}
