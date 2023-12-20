import { addPoints, multiplyPoint } from '@advent/shared';
import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

type Direction = 'U' | 'R' | 'D' | 'L';
const DirectionMap: Record<Direction, Point> = {
  U: { x: 0, y: -1 },
  R: { x: 1, y: 0 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
};
const DirectionOrder: Direction[] = ['R', 'D', 'L', 'U'];
const cornerOffsets = {
  UL: { x: -0.5, y: 0.5 },
  UR: { x: -0.5, y: -0.5 },
  DL: { x: 0.5, y: 0.5 },
  DR: { x: 0.5, y: -0.5 },
  LU: { x: -0.5, y: 0.5 },
  LD: { x: 0.5, y: 0.5 },
  RU: { x: -0.5, y: -0.5 },
  RD: { x: 0.5, y: -0.5 },
};
interface Instruction {
  direction: Direction;
  length: number;
}
interface Trench {
  to: Point;
  dir: Direction;
}

@Component({
  selector: 'advent-year2023-day18',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day18Component extends DayTemplateComponent {
  override defaultInput = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

  processInput(value: string): void {
    const instructions: Instruction[] = value.split('\n').map((line) => {
      const match = Array.from(
        line.matchAll(/\(#([0-9a-f]{5})([0-3])\)/g),
        (x) => x
      )[0];
      return {
        direction: DirectionOrder[Number.parseInt(match[2])],
        length: Number.parseInt(match[1], 16),
      };
    });

    console.log(instructions);

    // Define border
    let currentPos: Point = { x: 0, y: 0 };
    const trench: Trench[] = [];
    for (const instruction of instructions) {
      currentPos = addPoints(
        currentPos,
        multiplyPoint(DirectionMap[instruction.direction], instruction.length)
      );
      trench.push({
        to: currentPos,
        dir: instruction.direction,
      });
    }

    // Adjust for border thickness
    for (let i = 0; i < trench.length; i++) {
      const cur = trench[i];
      const next = trench[(i + 1) % trench.length];
      //@ts-ignore
      cur.to = addPoints(cur.to, cornerOffsets[cur.dir + next.dir]);
    }

    // Fill trench
    const area = this.getTrenchArea(trench);

    this.result1 = '' + area; // 40131
    this.result2 = '';
  }

  getTrenchArea(trench: Trench[]): number {
    let area = 0;
    for (let i = 0; i < trench.length; i++) {
      let j = (i + 1) % trench.length;
      area += trench[i].to.x * trench[j].to.y;
      area -= trench[i].to.y * trench[j].to.x;
    }
    return area / 2;
  }
}
