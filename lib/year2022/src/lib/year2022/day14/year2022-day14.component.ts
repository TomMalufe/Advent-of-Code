import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

@Component({
  selector: 'advent-year2022-day14',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2022Day14Component extends DayTemplateComponent {
  processInput(value: string): void {
    const lines = value.split('\n');

    this.result1 = '';
    this.result2 = '';
  }
}
