import { regExToArray, sumAll } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

@Component({
  selector: 'advent-year2022-day01',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2022Day01Component extends DayTemplateComponent {
  processInput(value: string): void {
    const elves = value.split('\n\n');

    const elfCalories: number[] = elves.map((elf) =>
      sumAll(
        regExToArray(elf.matchAll(/\d+/g)).map((it) => Number.parseInt(it))
      )
    );

    elfCalories.sort((a, b) => b - a);

    this.result1 = '' + elfCalories[0];
    this.result2 = '' + (elfCalories[0] + elfCalories[1] + elfCalories[2]);
  }
}
