import { Route } from '@angular/router';
import { Year2022Day01Component } from './year2022/day01/year2022-day01.component';
import { Year2022Day02Component } from './year2022/day02/year2022-day02.component';
import { Year2022Day03Component } from './year2022/day03/year2022-day03.component';
import { Year2022Day04Component } from './year2022/day04/year2022-day04.component';
import { Year2022Day05Component } from './year2022/day05/year2022-day05.component';
import { Year2022Day06Component } from './year2022/day06/year2022-day06.component';
import { Year2022Day07Component } from './year2022/day07/year2022-day07.component';
import { Year2022Day08Component } from './year2022/day08/year2022-day08.component';
import { Year2022Day09Component } from './year2022/day09/year2022-day09.component';
import { Year2022Day10Component } from './year2022/day10/year2022-day10.component';
import { Year2022Day11Component } from './year2022/day11/year2022-day11.component';
import { Year2022Day12Component } from './year2022/day12/year2022-day12.component';
import { Year2022Day13Component } from './year2022/day13/year2022-day13.component';
import { Year2022Day14Component } from './year2022/day14/year2022-day14.component';
import { Year2022Day15Component } from './year2022/day15/year2022-day15.component';
import { Year2022Day16Component } from './year2022/day16/year2022-day16.component';
import { Year2022Day17Component } from './year2022/day17/year2022-day17.component';
import { Year2022Day18Component } from './year2022/day18/year2022-day18.component';
import { Year2022Day19Component } from './year2022/day19/year2022-day19.component';
import { Year2022Day20Component } from './year2022/day20/year2022-day20.component';
import { Year2022Day21Component } from './year2022/day21/year2022-day21.component';
import { Year2022Day22Component } from './year2022/day22/year2022-day22.component';
import { Year2022Day23Component } from './year2022/day23/year2022-day23.component';
import { Year2022Day24Component } from './year2022/day24/year2022-day24.component';
import { Year2022Day25Component } from './year2022/day25/year2022-day25.component';
import { Year2022Component } from './year2022/year2022.component';

const components = [
  Year2022Day01Component,
  Year2022Day02Component,
  Year2022Day03Component,
  Year2022Day04Component,
  Year2022Day05Component,
  Year2022Day06Component,
  Year2022Day07Component,
  Year2022Day08Component,
  Year2022Day09Component,
  Year2022Day10Component,
  Year2022Day11Component,
  Year2022Day12Component,
  Year2022Day13Component,
  Year2022Day14Component,
  Year2022Day15Component,
  Year2022Day16Component,
  Year2022Day17Component,
  Year2022Day18Component,
  Year2022Day19Component,
  Year2022Day20Component,
  Year2022Day21Component,
  Year2022Day22Component,
  Year2022Day23Component,
  Year2022Day24Component,
  Year2022Day25Component,
];

export const year2022Routes: Route[] = [
  {
    path: '',
    component: Year2022Component,
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
