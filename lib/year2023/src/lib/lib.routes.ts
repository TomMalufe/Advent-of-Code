import { Route } from '@angular/router';
import { Year2023Day01Component } from './year2023/day01/year2023-day01.component';
import { Year2023Day02Component } from './year2023/day02/year2023-day02.component';
import { Year2023Day03Component } from './year2023/day03/year2023-day03.component';
import { Year2023Day04Component } from './year2023/day04/year2023-day04.component';
import { Year2023Day05Component } from './year2023/day05/year2023-day05.component';
import { Year2023Day06Component } from './year2023/day06/year2023-day06.component';
import { Year2023Day07Component } from './year2023/day07/year2023-day07.component';
import { Year2023Day08Component } from './year2023/day08/year2023-day08.component';
import { Year2023Day09Component } from './year2023/day09/year2023-day09.component';
import { Year2023Day10Component } from './year2023/day10/year2023-day10.component';
import { Year2023Day11Component } from './year2023/day11/year2023-day11.component';
import { Year2023Day12Component } from './year2023/day12/year2023-day12.component';
import { Year2023Day13Component } from './year2023/day13/year2023-day13.component';
import { Year2023Day14Component } from './year2023/day14/year2023-day14.component';
import { Year2023Day15Component } from './year2023/day15/year2023-day15.component';
import { Year2023Day16Component } from './year2023/day16/year2023-day16.component';
import { Year2023Day17Component } from './year2023/day17/year2023-day17.component';
import { Year2023Day18Component } from './year2023/day18/year2023-day18.component';
import { Year2023Day19Component } from './year2023/day19/year2023-day19.component';
import { Year2023Day20Component } from './year2023/day20/year2023-day20.component';
import { Year2023Day21Component } from './year2023/day21/year2023-day21.component';
import { Year2023Day22Component } from './year2023/day22/year2023-day22.component';
import { Year2023Day23Component } from './year2023/day23/year2023-day23.component';
import { Year2023Day24Component } from './year2023/day24/year2023-day24.component';
import { Year2023Day25Component } from './year2023/day25/year2023-day25.component';
import { Year2023Component } from './year2023/year2023.component';

const components = [
  Year2023Day01Component,
  Year2023Day02Component,
  Year2023Day03Component,
  Year2023Day04Component,
  Year2023Day05Component,
  Year2023Day06Component,
  Year2023Day07Component,
  Year2023Day08Component,
  Year2023Day09Component,
  Year2023Day10Component,
  Year2023Day11Component,
  Year2023Day12Component,
  Year2023Day13Component,
  Year2023Day14Component,
  Year2023Day15Component,
  Year2023Day16Component,
  Year2023Day17Component,
  Year2023Day18Component,
  Year2023Day19Component,
  Year2023Day20Component,
  Year2023Day21Component,
  Year2023Day22Component,
  Year2023Day23Component,
  Year2023Day24Component,
  Year2023Day25Component,
];

export const year2023Routes: Route[] = [
  {
    path: '',
    component: Year2023Component,
    children: [
      { path: '', redirectTo: 'day01', pathMatch: 'full' },
      ...components.map((component, index) => {
        const dayNumber = (index + 1).toString().padStart(2, '0');
        return {
          path: 'day' + dayNumber,
          component,
          data: { pathName: 'Year2023 - ' + dayNumber },
        };
      }),
    ],
  },
];
