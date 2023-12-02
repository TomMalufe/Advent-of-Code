import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'advent-year2023',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './year2023.component.html',
  styleUrl: './year2023.component.scss',
})
export class Year2023Component {}
