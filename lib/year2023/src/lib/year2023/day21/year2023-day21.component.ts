import { addPoints, isSamePoint, sumAll } from '@advent/shared';
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

interface Farmland {
  position: Point;
  hasRock: boolean;
  isStart: boolean;
  steps: number;
}

@Component({
  selector: 'advent-year2023-day21',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day21Component extends DayTemplateComponent {
  private activeNodes: Farmland[] = [];
  private grid: Farmland[][] = [];
  private gridWidth: number = 0;
  private gridHeight: number = 0;
  private sub?: Subscription;
  private tick = 0;

  processInput(value: string): void {
    this.sub?.unsubscribe();
    this.result1 = '';
    this.result2 = '';
    this.tick = 0;

    this.grid = value.split('\n').map((row, y) =>
      row.split('').map(
        (it, x) =>
          ({
            position: { x, y },
            hasRock: it === '#',
            isStart: it === 'S',
            steps: it === 'S' ? 0 : Number.MAX_SAFE_INTEGER,
          } as Farmland)
      )
    );
    this.gridWidth = this.grid[0].length;
    this.gridHeight = this.grid.length;
    if (
      this.grid[(this.gridHeight / 2) | 0][(this.gridWidth / 2) | 0].isStart
    ) {
      this.activeNodes = [
        this.grid[(this.gridHeight / 2) | 0][(this.gridWidth / 2) | 0],
      ];
    } else {
      console.log(
        'Where is the start?!',
        (this.gridHeight / 2) | 0,
        (this.gridWidth / 2) | 0
      );
      return;
    }

    const tickSourceFrame$ = animationFrames();
    const tickSourceClick$ = fromEvent(document, 'click');
    this.sub = tickSourceFrame$.subscribe(this.step.bind(this));
    // this.sub = tickSourceClick$.subscribe(this.step.bind(this));
  }

  step(): void {
    this.tick++;
    const nodes: Farmland[] = this.activeNodes;
    this.activeNodes = [];
    for (const node of nodes) {
      for (const dir of Directions) {
        const checkPos = addPoints(node.position, DirectionMap[dir]);
        const gripPos = this.grid[checkPos.y][checkPos.x];
        if (!gripPos.hasRock && gripPos.steps === Number.MAX_SAFE_INTEGER) {
          gripPos.steps = this.tick;
          this.activeNodes.push(this.grid[checkPos.y][checkPos.x]);
        }
      }
    }
    if (this.tick >= ((this.gridWidth / 2) | 0)) {
      this.complete();
    }
    /**
     * 3768
     * 3877
     *
     * 3804
     * 3896
     *
     * 15327
     *
     *
     * 1814 #'s
     * 15347 .'s
     *
     * 407713*15347
     *
     * 26501365=407713*65+20
     */
  }

  getVisualResult(
    highlightNodes: Farmland[],
    showStyle: boolean = true
  ): string {
    const bold = (text: string) => (showStyle ? '<b>' + text + '</b>' : text);
    const italic = (text: string) => (showStyle ? '<i>' + text + '</i>' : text);
    return this.grid
      .map((row, y) =>
        row
          .map((it, x) =>
            it.hasRock || it.isStart || it.steps === Number.MAX_SAFE_INTEGER
              ? it.hasRock
                ? '#'
                : it.isStart
                ? 'S'
                : '.'
              : highlightNodes.some((node) =>
                  isSamePoint(node.position, { x, y })
                )
              ? bold('O')
              : (this.tick - it.steps) % 2 === 1
              ? italic('.')
              : italic('O')
          )
          .join('')
      )
      .join('\n');
  }

  complete(): void {
    this.sub?.unsubscribe();
    this.visualResult = this.getVisualResult([]);
    this.result1 =
      '' +
      sumAll(
        this.grid.map((row) =>
          row.reduce(
            (prev, cur) =>
              cur.steps === Number.MAX_SAFE_INTEGER ||
              (this.tick - cur.steps) % 2 === 1
                ? prev
                : prev + 1,
            0
          )
        )
      );
    this.result2 =
      '' +
      sumAll(
        this.grid.map((row) =>
          row.reduce(
            (prev, cur) =>
              cur.steps === Number.MAX_SAFE_INTEGER ||
              (this.tick - cur.steps) % 2 === 0
                ? prev
                : prev + 1,
            0
          )
        )
      );
  }
}
