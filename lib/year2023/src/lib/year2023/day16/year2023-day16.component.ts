import { sumAll } from '@advent/shared';
import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

type Symbols = '-' | '|' | '/' | '\\' | '.';
type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
const DirectionMap: Record<Direction, Point> = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
};
const Directions: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];

class Mirror {
  private readonly reflection: Record<Direction, Direction[]>;
  private visitedFrom: Record<Direction, boolean> = {
    UP: false,
    RIGHT: false,
    DOWN: false,
    LEFT: false,
  };

  constructor(type: Symbols) {
    switch (type) {
      case '-':
        this.reflection = {
          UP: ['LEFT', 'RIGHT'],
          RIGHT: ['RIGHT'],
          DOWN: ['LEFT', 'RIGHT'],
          LEFT: ['LEFT'],
        };
        break;
      case '|':
        this.reflection = {
          UP: ['UP'],
          RIGHT: ['UP', 'DOWN'],
          DOWN: ['DOWN'],
          LEFT: ['UP', 'DOWN'],
        };
        break;
      case '/':
        this.reflection = {
          UP: ['RIGHT'],
          RIGHT: ['UP'],
          DOWN: ['LEFT'],
          LEFT: ['DOWN'],
        };
        break;
      case '\\':
        this.reflection = {
          UP: ['LEFT'],
          RIGHT: ['DOWN'],
          DOWN: ['RIGHT'],
          LEFT: ['UP'],
        };
        break;
      case '.':
        this.reflection = {
          UP: ['UP'],
          RIGHT: ['RIGHT'],
          DOWN: ['DOWN'],
          LEFT: ['LEFT'],
        };
    }
  }

  receiveBeam(beam: Direction): Direction[] | null {
    if (this.visitedFrom[beam]) {
      return null;
    }
    this.visitedFrom[beam] = true;
    return this.reflection[beam];
  }

  isEnergized(): boolean {
    return Directions.some((dir) => this.visitedFrom[dir]);
  }

  reset(): void {
    this.visitedFrom = {
      UP: false,
      RIGHT: false,
      DOWN: false,
      LEFT: false,
    };
  }
}

@Component({
  selector: 'advent-year2023-day16',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day16Component extends DayTemplateComponent {
  processInput(value: string): void {
    const grid = value
      .split('\n')
      .map((line) => line.split('').map((char) => new Mirror(char as Symbols)));

    const width = grid[0].length;
    const height = grid.length;

    const reset = () =>
      grid.forEach((row) => row.forEach((pos) => pos.reset()));
    const getCount = () =>
      sumAll(grid.flat(1).map((pos) => (pos.isEnergized() ? 1 : 0)));
    const getVisualResult = () =>
      grid
        .map((row) =>
          row.map((pos) => (pos.isEnergized() ? '#' : '.')).join('')
        )
        .join('\n');
    const checkPosition = (x: number, y: number, beam: Direction) => {
      const newBeams: Direction[] | null = grid[y][x].receiveBeam(beam);
      if (newBeams) {
        newBeams.forEach((beam) => {
          if (
            x + DirectionMap[beam].x < 0 ||
            x + DirectionMap[beam].x >= width
          ) {
            return;
          }
          if (
            y + DirectionMap[beam].y < 0 ||
            y + DirectionMap[beam].y >= height
          ) {
            return;
          }
          checkPosition(
            x + DirectionMap[beam].x,
            y + DirectionMap[beam].y,
            beam
          );
        });
      }
    };
    const sortDescValue = (a: number, b: number) => b - a;

    const downValues = Array.from({ length: width }, (_, index) => {
      checkPosition(index, 0, 'DOWN');
      const count = getCount();
      reset();
      return count;
    }).sort(sortDescValue);
    const upValues = Array.from({ length: width }, (_, index) => {
      checkPosition(index, height - 1, 'UP');
      const count = getCount();
      reset();
      return count;
    }).sort(sortDescValue);
    const rightValues = Array.from({ length: width }, (_, index) => {
      checkPosition(0, index, 'RIGHT');
      const count = getCount();
      reset();
      return count;
    }).sort(sortDescValue);
    const leftValues = Array.from({ length: width }, (_, index) => {
      checkPosition(width - 1, index, 'LEFT');
      const count = getCount();
      reset();
      return count;
    }).sort(sortDescValue);

    this.result1 = upValues[0] + ':' + downValues[0];
    this.result2 = leftValues[0] + ':' + rightValues[0];
  }
}
