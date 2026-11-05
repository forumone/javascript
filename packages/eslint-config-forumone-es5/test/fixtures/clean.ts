export interface Options {
  verbose: boolean;
}

export function format(
  value: number,
  _unused: string,
  options: Options,
): string {
  return options.verbose ? `value: ${value}` : String(value);
}
