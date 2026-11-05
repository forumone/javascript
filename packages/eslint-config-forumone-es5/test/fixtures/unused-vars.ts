const _ignored = 1;
const reported = 2;
export function run(_ignoredArg: string, usedArg: string): string {
  try {
    return usedArg;
  } catch (_ignoredError) {
    return "";
  }
}
