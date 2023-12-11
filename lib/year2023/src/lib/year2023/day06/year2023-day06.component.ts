import { regExToArray } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

@Component({
  selector: 'advent-year2023-day06',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day06Component extends DayTemplateComponent {
  processInput(value: string): void {
    const lines = value.split('\n');

    const times = regExToArray(lines[0].matchAll(/\d+/g)).map((match) =>
      Number.parseInt(match)
    );
    const distances = regExToArray(lines[1].matchAll(/\d+/g)).map((match) =>
      Number.parseInt(match)
    );

    const total = times.reduce(
      (previousValue, currentValue, currentIndex) =>
        previousValue *
        this.countWinningDuration(currentValue, distances[currentIndex]),
      1
    );

    this.result1 = '' + total;
    this.result2 = '';
  }

  countWinningDuration(time: number, distance: number): number {
    const min = Math.ceil(
      (time - Math.sqrt(time * time - 4 * (distance + 1))) / 2
    );
    const max = Math.floor(
      (time + Math.sqrt(time * time - 4 * (distance + 1))) / 2
    );
    return max - min + 1;
  }
}
