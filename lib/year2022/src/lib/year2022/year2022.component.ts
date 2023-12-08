import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'advent-year2022',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './year2022.component.html',
  styleUrl: './year2022.component.scss',
})
export class Year2022Component {}
