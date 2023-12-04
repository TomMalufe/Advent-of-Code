export const sumAll = (values: number[]): number =>
  values.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
export const wrapTag = (
  source: string,
  start: number,
  tagOpen: string,
  end: number,
  tagClose: string
): string =>
  source.slice(0, start) +
  tagOpen +
  source.slice(start, start + end) +
  tagClose +
  source.slice(start + end);
