import { addPoints, isOutOfBounds, isSamePoint } from '@advent/shared';
import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { animationFrames, fromEvent, Subscription } from 'rxjs';
import { DayTemplateComponent } from '../day-template.component';

type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
const DirectionMap: Record<Direction, Point> = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
};
const Directions: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
const oppositeDir: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};
const directionSymbol: Record<Direction, string> = {
  UP: '^',
  DOWN: 'v',
  LEFT: '«',
  RIGHT: '»',
};
interface PathNode {
  position: Point;
  value: number;
  direction: Direction;
  straightStretch: number;
  previousPath?: PathNode;
}
interface GridPosition {
  value: number;
  paths: PathNode[];
}

@Component({
  selector: 'advent-year2023-day17',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day17Component extends DayTemplateComponent {
  private completePaths: PathNode[] = [];
  private activeNodes: PathNode[] = [];
  private grid: GridPosition[][] = [];
  private gridWidth: number = 0;
  private gridHeight: number = 0;
  private sub?: Subscription;
  private startTime: number = 0;

  override defaultInput = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

  processInput(value: string): void {
    this.sub?.unsubscribe();
    this.grid = value.split('\n').map((row) =>
      row.split('').map(
        (it) =>
          ({
            value: Number.parseInt(it),
            paths: [],
          } as GridPosition)
      )
    );
    this.gridWidth = this.grid[0].length;
    this.gridHeight = this.grid.length;
    this.grid[0][0].paths = [
      {
        position: { x: 0, y: 0 },
        value: 0,
        direction: 'RIGHT',
        straightStretch: 0,
      },
      {
        position: { x: 0, y: 0 },
        value: 0,
        direction: 'DOWN',
        straightStretch: 0,
      },
    ];
    this.completePaths = [];
    this.activeNodes = [...this.grid[0][0].paths];
    this.startTime = Date.now();

    const tickSourceFrame$ = animationFrames();
    const tickSourceClick$ = fromEvent(document, 'click');
    this.sub = tickSourceFrame$.subscribe(this.step.bind(this));
    // this.sub = tickSourceClick$.subscribe(this.step.bind(this));
  }

  step(): void {
    const extraNodes = this.activeNodes
      .sort((a, b) => a.value - b.value)
      .splice(500);
    const nodes = this.activeNodes;
    this.activeNodes = [];

    for (let node of nodes) {
      for (let dir of Directions) {
        if (
          dir === oppositeDir[node.direction] ||
          (node.straightStretch < 4 && dir !== node.direction) ||
          (node.straightStretch >= 10 && dir === node.direction)
        ) {
          continue;
        }
        const pos = addPoints(node.position, DirectionMap[dir]);
        if (isOutOfBounds(pos, this.gridWidth, this.gridHeight)) {
          continue;
        }

        const gridPos = this.grid[pos.y][pos.x];
        const newNode = {
          position: pos,
          value: node.value + gridPos.value,
          direction: dir,
          straightStretch:
            dir === node.direction ? node.straightStretch + 1 : 1,
          previousPath: node,
        };

        if (
          this.completePaths.length > 0 &&
          this.completePaths.some((path) => path.value <= newNode.value)
        ) {
          continue;
        }

        const betterPath = gridPos.paths.find(
          (path) =>
            path.direction === newNode.direction &&
            path.value <= newNode.value &&
            path.straightStretch <= newNode.straightStretch &&
            (path.straightStretch === newNode.straightStretch ||
              (path.straightStretch >= 4 && newNode.straightStretch >= 4))
        );
        if (betterPath) {
          continue;
        }
        gridPos.paths.push(newNode);

        if (
          pos.x === this.gridWidth - 1 &&
          pos.y === this.gridHeight - 1 &&
          newNode.straightStretch >= 4
        ) {
          this.completePaths.push(newNode);
        } else {
          this.activeNodes.push(newNode);
        }
      }
    }
    this.visualResult = this.getVisualResult(this.activeNodes);
    this.activeNodes.push(...extraNodes);
    if (this.activeNodes.length === 0) {
      this.complete();
    }
  }

  complete(): void {
    this.sub?.unsubscribe();
    const bestNode = this.completePaths.sort((a, b) => a.value - b.value)[0];
    const bestPath = this.buildPathHistory(bestNode);
    this.visualResult = this.getVisualResult(bestPath);
    this.result1 = '' + bestNode.value;
    this.result2 = '' + (Date.now() - this.startTime);
  }

  getVisualResult(
    highlightNodes: PathNode[],
    showDir: boolean = false,
    showStyle: boolean = true
  ): string {
    const bold = (text: string) => (showStyle ? '<b>' + text + '</b>' : text);
    const italic = (text: string) => (showStyle ? '<i>' + text + '</i>' : text);
    return this.grid
      .map((row, y) =>
        row
          .map((it, x) =>
            it.paths.length === 0
              ? it.value.toString()
              : highlightNodes.some((node) =>
                  isSamePoint(node.position, { x, y })
                )
              ? bold(
                  '' +
                    (showDir
                      ? directionSymbol[
                          highlightNodes.find((node) =>
                            isSamePoint(node.position, { x, y })
                          )!.direction
                        ]
                      : it.value)
                )
              : italic('' + it.value)
          )
          .join('')
      )
      .join('\n');
  }

  buildPathHistory(node: PathNode): PathNode[] {
    const history = [node];
    let prevNode = node.previousPath;
    while (prevNode) {
      history.push(prevNode);
      prevNode = prevNode.previousPath;
    }
    return history;
  }
}
