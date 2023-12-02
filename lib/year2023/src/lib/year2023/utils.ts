export const sumAll = (values: number[]): number =>
  values.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
