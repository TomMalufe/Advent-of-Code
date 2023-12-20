import { sumAll } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

interface Part {
  x: number;
  m: number;
  a: number;
  s: number;
}
class Range {
  get min(): number {
    return this._min;
  }
  get max(): number {
    return this._max;
  }
  get value(): number {
    return this.max - this.min + 1;
  }
  constructor(
    private _min: number = Number.MIN_SAFE_INTEGER,
    private _max: number = Number.MAX_SAFE_INTEGER
  ) {}

  clone(): Range {
    return new Range(this._min, this._max);
  }

  updateMin(value: number): boolean {
    if (value < this._min || value > this._max) {
      console.log('Add Exceptions');
      return false;
    }
    this._min = value;
    return true;
  }
  updateMax(value: number): boolean {
    if (value < this._min || value > this._max) {
      console.log('Add Exceptions');
      return false;
    }
    this._max = value;
    return true;
  }
}
class AcceptablePart {
  constructor(
    public x: Range = new Range(1, 4000),
    public m: Range = new Range(1, 4000),
    public a: Range = new Range(1, 4000),
    public s: Range = new Range(1, 4000)
  ) {}

  applyRule(rule: Rule): AcceptablePart {
    const passing = new AcceptablePart(
      this.x.clone(),
      this.m.clone(),
      this.a.clone(),
      this.s.clone()
    );

    if (rule.lessThan) {
      passing[rule.attribute]?.updateMax(rule.value - 1);
      this[rule.attribute]?.updateMin(rule.value);
    } else {
      passing[rule.attribute]?.updateMin(rule.value + 1);
      this[rule.attribute]?.updateMax(rule.value);
    }
    return passing;
  }

  get value(): number {
    return this.x.value * this.m.value * this.a.value * this.s.value;
  }
}
interface Rule {
  attribute: keyof Part;
  lessThan: boolean;
  value: number;
  goto: string;
}
interface Workflow {
  rules: Rule[];
  goto: string;
}

@Component({
  selector: 'advent-year2023-day19',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day19Component extends DayTemplateComponent {
  override defaultInput = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;

  processInput(value: string): void {
    const sections = value.split('\n\n');

    // Gather parts
    const parts: Part[] = sections[1].split('\n').map((part) => {
      const match = part
        .matchAll(/\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)}/g)
        .next().value;
      return {
        x: Number.parseInt(match[1]),
        m: Number.parseInt(match[2]),
        a: Number.parseInt(match[3]),
        s: Number.parseInt(match[4]),
      };
    });

    // Setup workflow
    const workflows: Map<string, Workflow> = new Map();
    sections[0].split('\n').forEach((line) => {
      const matches = line
        .matchAll(/([a-z]+)\{((?:[xmas][<>]\d+:[a-zAR]+,)+)([a-zAR]+)}/g)
        .next().value;
      const rules: Rule[] = (matches[2] as string)
        .split(',')
        .filter((it) => it.length > 0)
        .map((rule) => {
          const breakdown = rule
            .matchAll(/([xmas])([<>])(\d+):([a-zAR]+)/g)
            .next().value;
          return {
            attribute: breakdown[1],
            lessThan: breakdown[2] === '<',
            value: Number.parseInt(breakdown[3]),
            goto: breakdown[4],
          };
        });
      workflows.set(matches[1], {
        rules,
        goto: matches[3],
      });
    });

    // Part 1
    const accepted: Part[] = [];
    const test = (part: Part, workflow: Workflow): string => {
      for (const rule of workflow.rules) {
        if (
          rule.lessThan
            ? part[rule.attribute] < rule.value
            : part[rule.attribute] > rule.value
        ) {
          return rule.goto;
        }
      }
      return workflow.goto;
    };
    parts.forEach((part) => {
      let result = test(part, workflows.get('in')!);
      while (result !== 'A' && result !== 'R') {
        result = test(part, workflows.get(result)!);
      }
      if (result === 'A') {
        accepted.push(part);
      }
    });

    // Part 2
    const acceptableParts: AcceptablePart[] = [];
    const consider = (
      part: AcceptablePart,
      workflow: Workflow
    ): AcceptablePart[] => {
      const found: AcceptablePart[] = [];

      for (const rule of workflow.rules) {
        const passingPart = part.applyRule(rule);
        if (rule.goto !== 'A' && rule.goto !== 'R') {
          found.push(...consider(passingPart, workflows.get(rule.goto)!));
        }
        if (rule.goto === 'A') {
          acceptableParts.push(passingPart);
        }
      }
      if (workflow.goto !== 'A' && workflow.goto !== 'R') {
        found.push(...consider(part, workflows.get(workflow.goto)!));
      }
      if (workflow.goto === 'A') {
        acceptableParts.push(part);
      }

      return found;
    };
    const found = consider(new AcceptablePart(), workflows.get('in')!);
    console.log(found);
    console.log(acceptableParts);

    this.result1 =
      '' + sumAll(accepted.map((part) => sumAll(Object.values(part))));
    this.result2 = '' + sumAll(acceptableParts.map((it) => it.value));
  }
}
