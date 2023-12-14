import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

type Rocks = '.' | '#' | 'O';

@Component({
  selector: 'advent-year2023-day14',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day14Component extends DayTemplateComponent {
  memorize = new Map<string, string>();

  processInput(value: string): void {
    // @ts-ignore
    const patterns: Rocks[][] = value.split('\n').map((line) => line.split(''));

    let rocks: { type: Rocks; p: Point }[] = [];
    for (let y = 0; y < patterns.length; y++) {
      for (let x = 0; x < patterns[y].length; x++) {
        if (patterns[y][x] !== '.') {
          rocks.push({ type: patterns[y][x], p: { x, y } });
        }
      }
    }

    let rockHash = JSON.stringify(rocks);
    let foundHashes: string[] = [];
    let loop: number[] = [];
    let loopStart = -1;
    for (let i = 0; i < 1000; i++) {
      rockHash = this.cycle(rockHash, patterns[0].length, patterns.length);
      const hashIndex = foundHashes.indexOf(rockHash);
      if (hashIndex < 0) {
        foundHashes.push(rockHash);
      } else {
        const loopIndex = loop.indexOf(hashIndex);
        if (loopIndex < 0) {
          if (loopStart < 0) loopStart = i + 1;
          loop.push(hashIndex);
        } else {
          console.log(loopIndex, hashIndex, i);
          break;
        }
      }
    }
    const BILLION = 1000000000;

    rocks = JSON.parse(foundHashes[loop[(BILLION - loopStart) % loop.length]]);
    this.visualResult = this.generateVisualResult(
      rocks,
      patterns[0].length,
      patterns.length
    );
    this.result1 = '' + this.getLoadN(rocks, patterns.length);
    this.result2 = '';
  }

  cycle(rockHash: string, width: number, height: number) {
    let newHash = this.memorize.get(rockHash);
    if (!newHash) {
      let rocks = JSON.parse(rockHash);
      this.tiltNS(rocks!, width, height);
      this.tiltEW(rocks!, width, height);
      this.tiltNS(rocks!, width, height, -1);
      this.tiltEW(rocks!, width, height, -1);
      newHash = JSON.stringify(rocks);
      this.memorize.set(rockHash, newHash);
    }
    return newHash;
  }

  tiltNS(
    rocks: { type: Rocks; p: Point }[],
    width: number,
    height: number,
    direction: 1 | -1 = 1
  ) {
    rocks.sort((a, b) => direction * (a.p.y - b.p.y));
    Array.from({ length: width }, (_, index) => {
      let end = direction < 0 ? height - 1 : 0;
      const column = rocks.filter((rock) => rock.p.x === index);
      column.forEach((rock) =>
        rock.type === '#'
          ? (end = rock.p.y + direction)
          : direction < 0
          ? (rock.p.y = end--)
          : (rock.p.y = end++)
      );
    });
  }

  tiltEW(
    rocks: { type: Rocks; p: Point }[],
    width: number,
    height: number,
    direction: 1 | -1 = 1
  ) {
    rocks.sort((a, b) => direction * (a.p.x - b.p.x));
    Array.from({ length: height }, (_, index) => {
      let end = direction < 0 ? width - 1 : 0;
      const row = rocks.filter((rock) => rock.p.y === index);
      row.forEach((rock) =>
        rock.type === '#'
          ? (end = rock.p.x + direction)
          : direction < 0
          ? (rock.p.x = end--)
          : (rock.p.x = end++)
      );
    });
  }

  generateVisualResult(
    rocks: { type: Rocks; p: Point }[],
    width: number,
    height: number
  ): string {
    let result = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => '.')
    );
    rocks.forEach((rock) => (result[rock.p.y][rock.p.x] = rock.type));
    return result.map((line) => line.join('')).join('\n');
  }

  getLoadN(rocks: { type: Rocks; p: Point }[], height: number): number {
    return rocks.reduce(
      (acc, rock) => (rock.type === '#' ? acc : acc + height - rock.p.y),
      0
    );
  }
}
