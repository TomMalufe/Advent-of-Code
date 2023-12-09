import { lastItem, sumAll } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

class Sequence {
  private _sequenceSteps: number[][] = [];
  private _nextValueInSequence: number = 0;
  get nextValue(): number {
    if (this._nextValueInSequence === 0) {
      for (let i = this._sequenceSteps.length - 1; i >= 0; i--) {
        this._nextValueInSequence += lastItem(this._sequenceSteps[i]);
      }
    }
    return this._nextValueInSequence;
  }
  private _previousValueInSequence: number = 0;
  get previousValue(): number {
    if (this._previousValueInSequence === 0) {
      for (let i = this._sequenceSteps.length - 1; i >= 0; i--) {
        this._previousValueInSequence =
          this._sequenceSteps[i][0] - this._previousValueInSequence;
      }
    }
    return this._previousValueInSequence;
  }

  private constructor(givenValues: number[]) {
    const getDifferenceSequence = (values: number[]): number[] => {
      const result: number[] = [];
      for (let i = 0; i < values.length - 1; i++) {
        result.push(values[i + 1] - values[i]);
      }
      return result;
    };
    this._sequenceSteps.push(givenValues);
    while (
      this._sequenceSteps[this._sequenceSteps.length - 1].some((it) => it !== 0)
    ) {
      this._sequenceSteps.push(
        getDifferenceSequence(
          this._sequenceSteps[this._sequenceSteps.length - 1]
        )
      );
    }
    console.log(this._sequenceSteps);
  }

  static create(givenValues: number[]): Sequence {
    return new Sequence(givenValues);
  }
}

@Component({
  selector: 'advent-year2023-day09',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day09Component {
  result1 = '';
  result2 = '';

  processInput(value: string): void {
    const lines = value.split('\n');

    const sequences: Sequence[] = lines.map((line) =>
      Sequence.create(line.split(' ').map((it) => Number.parseInt(it)))
    );

    this.result1 = '' + sumAll(sequences.map((seq) => seq.nextValue));
    this.result2 = '' + sumAll(sequences.map((seq) => seq.previousValue));
  }
}
