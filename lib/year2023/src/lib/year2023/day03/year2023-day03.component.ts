import { sumAll, wrapTag } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface PartNumber {
  index: number;
  position: number;
  number: string;
  symbol?: string;
}

@Component({
  selector: 'advent-year2023-day03',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './year2023-day03.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day03Component {
  result1 = '';
  result2 = '';

  visualResult = '';

  processInput(input: string): void {
    this.result1 = '' + this.testCase(input);
    this.result2 = '' + this.testCase2(input);
  }

  testCase(input: string): number {
    let lines = input.split('\n');
    const blankLine = ''.padEnd(lines[0].length, '.');
    lines = [blankLine, ...lines, blankLine];

    const result: PartNumber[] = this.findPartNumbers(lines);
    for (let i = result.length - 1; i >= 0; i--) {
      const part = result[i];
      let line = lines[part.index];
      line = wrapTag(
        lines[part.index],
        part.position,
        part.symbol ? '<b>' : '<i>',
        part.number.length,
        part.symbol ? '</b>' : '</i>'
      );
      lines[part.index] = line;
    }
    this.visualResult = lines.join('\n');

    return sumAll(
      result.filter((it) => it.symbol).map((it) => Number.parseInt(it.number))
    );
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
        result.push({
          index,
          position: numberIndex,
          number: partNumberCandidate,
          symbol,
        });
        numberIndex += partNumberCandidate.length;
      }
    }
    return result;
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

  testCase2(input: string): number {
    const lineLength = input.indexOf('\n') + 1;
    let index = 0;
    let found: number[] = [];

    const findNumbersNearIndex = (_index: number): string[] => {
      let start,
        end = 0;
      if (/\d/.test(input.slice(_index - 1, _index + 2))) {
        start = _index - 1;
        while (start > 0 && /\d/.test(input.charAt(start))) start--;
        end = _index + 1;
        while (end < input.length && /\d/.test(input.charAt(end))) end++;
        return Array.from(
          input.slice(start, end).matchAll(/\d+/g),
          (x) => x[0]
        );
      }
      return [];
    };

    let step = 0;
    while ((step = input.slice(index).search(/\*/)) !== -1) {
      index += step;
      let searchResult: string[] = [];

      if (index > lineLength) {
        searchResult = findNumbersNearIndex(index - lineLength);
      }

      searchResult = searchResult.concat(findNumbersNearIndex(index));

      if (index < input.length - lineLength) {
        searchResult = searchResult.concat(
          findNumbersNearIndex(index + lineLength)
        );
      }
      console.log('search result', searchResult);

      if (searchResult.length > 1) {
        found.push(
          searchResult.reduce((prev, cur) => prev * Number.parseInt(cur), 1)
        );
      }

      index++;
    }

    return sumAll(found);
  }
}
