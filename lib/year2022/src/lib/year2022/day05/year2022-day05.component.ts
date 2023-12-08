import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'advent-year2022-day05',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2022Day05Component {
  result1 = '';
  result2 = '';

  processInput(value: string): void {
    const elves = value.split('\n\n');

    this.result1 = '';
    this.result2 = '';
  }
}
