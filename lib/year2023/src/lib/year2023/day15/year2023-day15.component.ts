import { sumAll } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

interface Lens {
  label: string;
  focalLength: string;
}

@Component({
  selector: 'advent-year2023-day15',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day15Component extends DayTemplateComponent {
  processInput(value: string): void {
    const commands = value.split('\n').join('').split(',');
    const BOXES: Lens[][] = Array.from({ length: 256 }, () => [] as Lens[]);

    commands.forEach((command, index) => {
      const remove = command.indexOf('-');
      if (remove >= 0) {
        const label = command.substring(0, remove);
        const boxNumber = this.hash(label);
        const lensPos = BOXES[boxNumber].findIndex(
          (lens) => lens.label === label
        );
        if (lensPos >= 0) {
          BOXES[boxNumber].splice(lensPos, 1);
        }
      } else {
        const [label, focalLength] = command.split('=');
        const boxNumber = this.hash(label);
        const lensPos = BOXES[boxNumber].findIndex(
          (lens) => lens.label === label
        );
        if (lensPos >= 0) {
          BOXES[boxNumber][lensPos].focalLength = focalLength;
        } else {
          BOXES[boxNumber].push({ label, focalLength });
        }
      }
    });

    this.result1 = '' + sumAll(commands.map(this.hash));
    this.result2 =
      '' +
      sumAll(
        BOXES.map((box, boxNumber) =>
          box.reduce(
            (prev, cur, slotNumber) =>
              prev +
              (boxNumber + 1) *
                (slotNumber + 1) *
                Number.parseInt(cur.focalLength),
            0
          )
        )
      );
  }

  hash(label: string): number {
    return Array.from(label, (char) => char.charCodeAt(0)).reduce(
      (prev, cur) => ((prev + cur) * 17) % 256,
      0
    );
  }
}
