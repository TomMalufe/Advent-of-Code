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

    // expand universe width
    for (let row = 0; row < universe.length; row++) {
      for (let col = emptyColumns.length - 1; col >= 0; col--) {
        universe[row].splice(col, 0, '.');
      }
    }
    // expand universe height
    for (let row = emptyRows.length - 1; row >= 0; row--) {
      universe.splice(row, 0, [...universe[row]]);
    }

    this.result1 = '';
    this.result2 = '';
  }
}
