import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

export enum Directions {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
}
const oppositeDir: Record<Directions, Directions> = {
  UP: Directions.DOWN,
  DOWN: Directions.UP,
  LEFT: Directions.RIGHT,
  RIGHT: Directions.LEFT,
};
const rightHandDirection: Record<Directions, Directions> = {
  UP: Directions.RIGHT,
  DOWN: Directions.LEFT,
  LEFT: Directions.UP,
  RIGHT: Directions.DOWN,
};
const directionSymbol: Record<Directions, string> = {
  UP: '^',
  DOWN: 'v',
  LEFT: '«',
  RIGHT: '»',
};
type BendTypes = 'F' | 'L' | 'J' | '7';
type StraightTypes = '|' | '-';
type PipeType = BendTypes | StraightTypes;
const pipeDirections: Record<PipeType, [Directions, Directions]> = {
  '|': [Directions.UP, Directions.DOWN],
  F: [Directions.RIGHT, Directions.DOWN],
  L: [Directions.UP, Directions.RIGHT],
  J: [Directions.UP, Directions.LEFT],
  '7': [Directions.LEFT, Directions.DOWN],
  '-': [Directions.RIGHT, Directions.LEFT],
};
export interface MetalPipe {
  isStart: boolean;
  type?: PipeType;
  connections: Record<Directions, MetalPipe | undefined>;
  flow?: Directions;
  onRightHandSide: boolean;
  onLeftHandSide: boolean;
  position: Point;
}

@Component({
  selector: 'advent-year2023-day10',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: './year2023-day10.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day10Component {
  result1 = '';
  result2 = '';
  visualResult = '';

  processInput(value: string): void {
    const lines = value.split('\n');

    const checkDirection = (
      dir: Directions,
      x: number,
      y: number
    ): MetalPipe | undefined => {
      let checkPipe: MetalPipe | undefined;
      const testPipe = (pipe: MetalPipe | undefined) =>
        pipe &&
        (pipe.isStart ||
          (pipe.type !== undefined &&
            pipeDirections[pipe.type!].includes(oppositeDir[dir])));

      switch (dir) {
        case Directions.UP:
          checkPipe = y > 0 ? pipes[y - 1][x] : undefined;
          return testPipe(checkPipe) ? checkPipe : undefined;
        case Directions.DOWN:
          checkPipe = y + 1 < pipes.length ? pipes[y + 1][x] : undefined;
          return testPipe(checkPipe) ? checkPipe : undefined;
        case Directions.LEFT:
          checkPipe = x > 0 ? pipes[y][x - 1] : undefined;
          return testPipe(checkPipe) ? checkPipe : undefined;
        case Directions.RIGHT:
          checkPipe = x + 1 < pipes[y].length ? pipes[y][x + 1] : undefined;
          return testPipe(checkPipe) ? checkPipe : undefined;
      }
    };

    const findFlowDirection = (pipe: MetalPipe, from?: Directions) =>
      Object.keys(pipe.connections).find(
        (dir) =>
          (!from || (dir as Directions) !== oppositeDir[from]) &&
          pipe.connections[dir as Directions] !== undefined
      ) as Directions;

    const stepIn = (pipe: MetalPipe, dir: Directions) => {
      const p = pipe.position;
      switch (dir) {
        case Directions.UP:
          return p.y > 0 ? pipes[p.y - 1][p.x] : undefined;
        case Directions.DOWN:
          return p.y + 1 < pipes.length ? pipes[p.y + 1][p.x] : undefined;
        case Directions.LEFT:
          return p.x > 0 ? pipes[p.y][p.x - 1] : undefined;
        case Directions.RIGHT:
          return p.x + 1 < pipes[p.y].length ? pipes[p.y][p.x + 1] : undefined;
      }
    };

    // Get Metal Pipes
    const pipes: MetalPipe[][] = lines.map((line, y) =>
      line.split('').map(
        (char, x) =>
          ({
            isStart: char === 'S',
            type: ['.', 'S'].includes(char) ? undefined : (char as PipeType),
            connections: {
              UP: undefined,
              DOWN: undefined,
              LEFT: undefined,
              RIGHT: undefined,
            },
            position: { x, y },
          } as MetalPipe)
      )
    );

    // Connect all pipes in loop
    let startPipe: MetalPipe;
    for (let y = 0; y < pipes.length; y++) {
      for (let x = 0; x < pipes[y].length; x++) {
        const curPipe = pipes[y][x];
        if (curPipe.type) {
          curPipe.connections[pipeDirections[curPipe.type!][0]] =
            checkDirection(pipeDirections[curPipe.type!][0], x, y);
          if (curPipe.connections[pipeDirections[curPipe.type!][0]]) {
            curPipe.connections[pipeDirections[curPipe.type!][0]]!.connections[
              oppositeDir[pipeDirections[curPipe.type!][0]]
            ] = curPipe;
          }

          curPipe.connections[pipeDirections[curPipe.type!][1]] =
            checkDirection(pipeDirections[curPipe.type!][1], x, y);
          if (curPipe.connections[pipeDirections[curPipe.type!][1]]) {
            curPipe.connections[pipeDirections[curPipe.type!][1]]!.connections[
              oppositeDir[pipeDirections[curPipe.type!][1]]
            ] = curPipe;
          }
        } else if (curPipe.isStart) {
          startPipe = curPipe;
        }
      }
    }

    // Traverse the pipe loop and count how long it is
    let step = 0;
    let curPipe: MetalPipe = startPipe!;
    let prevPipe: MetalPipe = startPipe!;
    let nextPipe: MetalPipe = startPipe!;
    do {
      curPipe.flow = findFlowDirection(curPipe, prevPipe.flow);
      nextPipe = curPipe.connections[curPipe.flow]!;
      prevPipe = curPipe;
      curPipe = nextPipe;
      step++;
    } while (!curPipe.isStart && step < 100000);

    // Mark all positions on the right hand side
    curPipe = startPipe!;
    let prevFlow: Directions = curPipe.flow!;
    do {
      let right = rightHandDirection[curPipe.flow!];
      let position = stepIn(curPipe, right);
      while (position && !position.flow) {
        position.onRightHandSide = true;
        position = stepIn(position, right);
      }
      if (right === prevFlow) {
        right = oppositeDir[curPipe.flow!];
        position = stepIn(curPipe, right);
        while (position && !position.flow) {
          position.onRightHandSide = true;
          position = stepIn(position, right);
        }
      }

      let left = oppositeDir[right];
      position = stepIn(curPipe, left);
      while (position && !position.flow) {
        position.onLeftHandSide = true;
        position = stepIn(position, left);
      }
      if (left === prevFlow) {
        left = oppositeDir[curPipe.flow!];
        position = stepIn(curPipe, left);
        while (position && !position.flow) {
          position.onLeftHandSide = true;
          position = stepIn(position, left);
        }
      }

      prevFlow = curPipe.flow!;
      curPipe = curPipe.connections[curPipe.flow!]!;
    } while (!curPipe.isStart && step < 100000);

    // Count how many are on the "inside"
    const insideIsRight = pipes[0].some((pipe) => pipe.onLeftHandSide);
    let count = pipes.reduce(
      (previousValue, currentValue) =>
        previousValue +
        currentValue.reduce(
          (prev, cur) =>
            insideIsRight
              ? cur.onRightHandSide
                ? prev + 1
                : prev
              : cur.onLeftHandSide
              ? prev + 1
              : prev,
          0
        ),
      0
    );

    const getSymbol = (pipe: MetalPipe) =>
      pipe.isStart ? 'S' : pipe.flow ? directionSymbol[pipe.flow] : '@';
    this.visualResult = pipes
      .map((row) =>
        row
          .map((it) =>
            it.onRightHandSide
              ? '<b>' + getSymbol(it) + '</b>'
              : it.onLeftHandSide
              ? '<i>' + getSymbol(it) + '</i>'
              : getSymbol(it)
          )
          .join('')
      )
      .join('</br>');

    this.result1 = '' + step / 2;
    this.result2 = '' + count;
  }
}
