import { sumAll } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'advent-year2023-day01',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day01Component {
  result1 = '';
  result2 = '';

  static NUMBERS = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  processInput(value: string): void {
    const lines = value.split('\n');

    const lineValues1 = lines.map(Year2023Day01Component.parseV1);
    const lineValues2 = lines.map(Year2023Day01Component.parseV2);

    this.result1 = 'Total: ' + sumAll(lineValues1);
    this.result2 = 'Total: ' + sumAll(lineValues2);
  }

  static parseV1(inputLine: string): number {
    const match = inputLine.match(/\d/g);
    return match ? Number.parseInt(match[0] + match[match.length - 1]) : 0;
  }

  static parseV2(inputLine: string): number {
    const parseNumber = (val: string): string =>
      val.length === 1
        ? val
        : Year2023Day01Component.NUMBERS.indexOf(val).toString();

    const match = Array.from(
      inputLine.matchAll(
        /(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g
      ),
      (x) => x[1]
    );

    const value = match
      ? Number.parseInt(
          parseNumber(match[0]) + parseNumber(match[match.length - 1])
        )
      : 0;
    console.log(inputLine, match, value);
    return value;
  }
}
