import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

enum RoShamBo {
  ROCK = 0,
  PAPER = 1,
  SCISSORS = 2,
}

@Component({
  selector: 'advent-year2022-day02',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2022Day02Component extends DayTemplateComponent {
  processInput(value: string): void {
    const plays = value.matchAll(/(ABC) (XYZ)/g);

    this.result1 = '';
    this.result2 = '';
  }
}
