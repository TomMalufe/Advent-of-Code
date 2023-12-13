import { sumAll } from '@advent/shared';
import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

@Component({
  selector: 'advent-year2023-day13',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day13Component extends DayTemplateComponent {
  processInput(value: string): void {
    const patterns = value.split('\n\n').map((pat) => pat.split('\n'));

    const colMirrors: number[] = [];
    const rowMirrors: number[] = [];
    for (const pattern of patterns) {
      const row = this.findMirroring(pattern);
      if (row >= 0) {
        rowMirrors.push(row + 1);
      } else {
        const rotatedPattern = this.rotatePattern(pattern);
        const col = this.findMirroring(rotatedPattern);
        if (col >= 0) {
          colMirrors.push(col + 1);
        } else {
          console.log('NO MIRRORING FOUND!');
          console.log(pattern.join('\n'));
          console.log('NO MIRRORING FOUND! ROTATED');
          console.log(this.rotatePattern(pattern).join('\n'));
        }
      }
    }

    const part1 = sumAll(colMirrors) + 100 * sumAll(rowMirrors);

    this.result1 = '' + part1;
    this.result2 = '';
  }

  rotatePattern(lines: string[]): string[] {
    const result: string[] = [];
    for (let i = 0; i < lines[0].length; i++) {
      result.push(lines.map((it) => it.charAt(i)).join(''));
    }
    return result;
  }

  findMirroring(lines: string[]): number {
    let duplicateAt = -1;
    let diffFound = false;
    let diffAt: Point = { x: 0, y: 0 };
    for (let i = 0; i < lines.length; i++) {
      if (duplicateAt < 0) {
        if (lines[i] === lines[i + 1]) {
          duplicateAt = i;
        } else {
          const diff = this.diffValue(lines[i], lines[i + 1]);
          if (diff === 1) {
            diffAt.x = i;
            diffAt.y = i + 1;
            diffFound = true;
            duplicateAt = i;
          }
        }
        if (i === lines.length - 2) {
          break;
        }
      } else {
        let mirror = duplicateAt - (i - duplicateAt);
        if (mirror < 0 || i === lines.length - 1) {
          if (diffFound) {
            break;
          }
          i = duplicateAt;
          duplicateAt = -1;
        } else if (lines[mirror] !== lines[i + 1]) {
          if (!diffFound) {
            const diff = this.diffValue(lines[mirror], lines[i + 1]);
            if (diff === 1) {
              diffAt.x = mirror;
              diffAt.y = i + 1;
              diffFound = true;
            } else {
              i = duplicateAt;
              duplicateAt = -1;
            }
          } else {
            i = duplicateAt;
            duplicateAt = -1;
            diffAt.x = 0;
            diffAt.y = 0;
            diffFound = false;
          }
        }
      }
    }
    if (!diffFound) {
      duplicateAt = -1;
    }
    return duplicateAt;
  }

  diffValue(stringA: string, stringB: string): number {
    return Array.from(stringA).reduce(
      (amountDifferent: number, valA, index) =>
        valA !== stringB[index] ? amountDifferent + 1 : amountDifferent,
      0
    );
  }
}
