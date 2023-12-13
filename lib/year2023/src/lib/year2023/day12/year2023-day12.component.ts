import { sumAll } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

@Component({
  selector: 'advent-year2023-day12',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day12Component extends DayTemplateComponent {
  processInput(value: string): void {
    const lines = value.split('\n');
    const start = Date.now();

    const counts = lines.map(this.countArrangements);
    const countsV2 = lines.map(this.countArrangementsV2);

    this.result1 = '' + sumAll(counts);
    this.result2 = '' + sumAll(countsV2);
  }

  countArrangements(line: string): number {
    const [springs, brokenString] = line.split(' ');
    const groupSizes = brokenString.split(',').map((it) => Number.parseInt(it));

    let arrangements = 0;
    const search = (searchString: string, groups: number[]) => {
      const regex = new RegExp('(?<!#)[#?]{' + groups[0] + '}(?!#)');
      let matchIndex = searchString.search(regex);
      if (matchIndex === -1) {
        return;
      }
      if (/#/.test(searchString.substring(0, matchIndex))) {
        return;
      }
      if (groups.length > 1) {
        search(
          searchString.substring(matchIndex + groups[0] + 1),
          groups.slice(1)
        );
      } else if (
        !/#/.test(searchString.substring(matchIndex + groups[0] + 1))
      ) {
        arrangements++;
      }
      if (searchString.charAt(matchIndex) !== '#') {
        search(searchString.substring(matchIndex + 1), groups);
      }
    };
    search(springs, groupSizes);

    return arrangements;
  }

  countArrangementsV2(line: string): number {
    const [springs, brokenString] = line.split(' ');
    const unfoldedSprings = [1, 2, 3, 4, 5].map(() => springs).join('?');
    const groupSizes = [1, 2, 3, 4, 5]
      .map(() => brokenString)
      .join(',')
      .split(',')
      .map((it) => Number.parseInt(it));

    return 0;
  }
}
