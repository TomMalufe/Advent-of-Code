import { Point } from '@angular/cdk/drag-drop';

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

export const regExToArray = (
  itt: IterableIterator<RegExpMatchArray>
): Array<string> => Array.from(itt, (x) => x[0]);

export const lastItem = <T>(array: Array<T>): T => array[array.length - 1];

export const addPoints = (p1: Point, p2: Point): Point => ({
  x: p1.x + p2.x,
  y: p1.y + p2.y,
});
export const isOutOfBounds = (
  point: Point,
  width: number,
  height: number
): boolean =>
  point.x < 0 || point.y < 0 || point.x >= width || point.y >= height;
export const isSamePoint = (p1: Point, p2: Point): boolean =>
  p1.x === p2.x && p1.y === p2.y;
