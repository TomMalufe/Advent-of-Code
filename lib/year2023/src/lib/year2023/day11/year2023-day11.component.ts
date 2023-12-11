import { Point } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

@Component({
  selector: 'advent-year2023-day11',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day11Component extends DayTemplateComponent {
  processInput(value: string): void {
    const universe = value.split('\n').map((line) => line.split(''));

    // Find empty rows and columns
    let emptyRows: number[] = universe.map((_, index) => index);
    let emptyColumns: number[] = universe[0].map((_, index) => index);
    for (let row = 0; row < universe.length; row++) {
      for (let col = 0; col < universe[row].length; col++) {
        if (universe[row][col] === '#') {
          emptyColumns[col] = -1;
          emptyRows[row] = -1;
        }
      }
    }

    emptyRows = emptyRows.filter((it) => it >= 0);
    emptyColumns = emptyColumns.filter((it) => it >= 0);

    const stars: Point[] = [];
    for (let row = 0; row < universe.length; row++) {
      for (let col = 0; col < universe[row].length; col++) {
        if (universe[row][col] === '#') {
          const numberOfEmptyRows = emptyRows.filter((it) => it < row).length;
          const numberOfEmptyColumns = emptyColumns.filter(
            (it) => it < col
          ).length;
          stars.push({
            x: row + numberOfEmptyRows * 999999,
            y: col + numberOfEmptyColumns * 999999,
          });
        }
      }
    }

    const distancesBetween = (p1: Point, p2: Point): number =>
      Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    const totalDistances = stars.reduce(
      (previousValue, p1, currentIndex, array) =>
        previousValue +
        array
          .slice(currentIndex + 1)
          .reduce(
            (previousValue2, p2) => previousValue2 + distancesBetween(p1, p2),
            0
          ),
      0
    );

    this.result1 = '' + totalDistances;
    this.result2 = '';
  }
}
