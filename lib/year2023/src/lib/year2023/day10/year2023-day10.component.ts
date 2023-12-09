import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'advent-year2023-day10',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day10Component {
  result1 = '';
  result2 = '';

  processInput(value: string): void {
    const lines = value.split('\n');

    this.result1 = '';
    this.result2 = '';
  }
}
