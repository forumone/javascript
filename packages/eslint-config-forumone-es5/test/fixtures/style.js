import { a } from "./clean.js";
import { load } from "./clean.js";

export function style(flag, other) {
  let neverReassigned = 1;
  const obj = { a: a, load: load };
  const { length } = obj;
  const items = [1];
  const first = items[0];
  flag = first;
  other.mutatedProp = length;
  let useless = 1;
  useless = 2;
  const shadow = 1;
  if (flag) {
    const shadow = 2;
    return shadow;
  } else {
    if (other) {
      return neverReassigned + useless + shadow;
    }
  }
  return 0;
}
