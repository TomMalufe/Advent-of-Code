import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

export interface NodeNetwork {
  [name: string]: { L: string; R: string };
}

type Direction = 'L' | 'R';

@Component({
  selector: 'advent-year2023-day08',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day08Component {
  result1 = '';
  result2 = '';

  processInput(value: string): void {
    const instructions = value.match(/[RL]+/)?.shift();
    if (instructions === undefined) {
      return;
    }
    const nodes = value.matchAll(
      /([0-9A-Z]{3}) = \(([0-9A-Z]{3}), ([0-9A-Z]{3})\)/g
    );

    const testNodeEnd = (name: string) => name.charAt(2) === 'Z';
    const testNodeStart = (name: string) => name.charAt(2) === 'A';

    let network: NodeNetwork = {};
    let currentNodes: string[] = [];
    for (const [_, name, left, right] of nodes) {
      console.log(name, left, right, testNodeStart(name));
      if (testNodeStart(name)) currentNodes.push(name);
      network[name] = { L: left, R: right };
    }
    console.log(currentNodes);
    const allSteps: number[] = [];

    for (let j = 0; j < currentNodes.length; j++) {
      let steps = 0;
      let i = 0;
      let loopCount = 0;
      console.log('every', currentNodes.every(testNodeEnd));
      while (loopCount < 1000 && !testNodeEnd(currentNodes[j])) {
        currentNodes[j] =
          network[currentNodes[j]][instructions.charAt(i) as Direction];
        i++;
        if (i >= instructions.length) {
          i = 0;
          loopCount++;
        }
        steps++;
      }
      allSteps.push(steps);
    }
    // To be COMPLETE, find unique prime factors of each value in allSteps, then multiply them together

    this.result1 = '' + allSteps.join(',');
    this.result2 = '' + currentNodes.join(',');
  }
}
