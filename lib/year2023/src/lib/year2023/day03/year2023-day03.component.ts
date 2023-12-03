import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { sumAll } from '../utils';

interface PartNumber {
  number: number;
  symbol?: string;
}

@Component({
  selector: 'advent-year2023-day03',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day03Component {
  result1 = '';
  result2 = '';

  processInput(value: string): void {
    let lines = value.split('\n');
    const blankLine = ''.padEnd(lines[0].length, '.');
    lines = [blankLine, ...lines, blankLine];

    const result: PartNumber[] = this.findPartNumbers(
      lines.map((it) => it + '*')
    );
    console.dir(result);

    this.result1 = '' + sumAll(result.map((it) => it.number));
    this.result2 = '';
  }

  findPartNumbers(lines: string[]): PartNumber[] {
    const result: PartNumber[] = [];
    for (let index = 1; index < lines.length - 1; index++) {
      const numbersInLine = lines[index].matchAll(/\d+/g);
      let numberIndex = 0;
      for (let partNumberCandidate of Array.from(numbersInLine, (x) => x[0])) {
        numberIndex = lines[index].indexOf(partNumberCandidate, numberIndex);
        let symbol =
          this.findSymbolNearIndex(
            lines[index - 1],
            numberIndex,
            partNumberCandidate.length
          ) ||
          this.findSymbolNearIndex(
            lines[index],
            numberIndex,
            partNumberCandidate.length
          ) ||
          this.findSymbolNearIndex(
            lines[index + 1],
            numberIndex,
            partNumberCandidate.length
          );
        if (symbol) {
          result.push({ number: Number.parseInt(partNumberCandidate), symbol });
        }
        numberIndex += partNumberCandidate.length - 1;
      }
    }
    return result;
  }

  hasSymbolNearIndex(line: string, index: number, length: number): boolean {
    return /[^\d.]/.test(
      line.slice(index === 0 ? index : index - 1, index + length + 1)
    );
  }

  findSymbolNearIndex(
    line: string,
    index: number,
    length: number
  ): string | undefined {
    return line
      .slice(index === 0 ? index : index - 1, index + length + 1)
      .match(/[^\d.]/)
      ?.shift();
  }
}
