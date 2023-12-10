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
import { Year2023Component } from './year2023/year2023.component';

export const year2023Routes: Route[] = [
  {
    path: '',
    component: Year2023Component,
    children: [
      { path: '', redirectTo: 'day01', pathMatch: 'full' },
      {
        path: 'day01',
        component: Year2023Day01Component,
        data: { pathName: 'Year2023 - Day01' },
      },
      {
        path: 'day02',
        component: Year2023Day02Component,
        data: { pathName: 'Year2023 - Day02' },
      },
      {
        path: 'day03',
        component: Year2023Day03Component,
        data: { pathName: 'Year2023 - Day03' },
      },
      {
        path: 'day04',
        component: Year2023Day04Component,
        data: { pathName: 'Year2023 - Day04' },
      },
      {
        path: 'day05',
        component: Year2023Day05Component,
        data: { pathName: 'Year2023 - Day05' },
      },
      {
        path: 'day06',
        component: Year2023Day06Component,
        data: { pathName: 'Year2023 - Day06' },
      },
      {
        path: 'day07',
        component: Year2023Day07Component,
        data: { pathName: 'Year2023 - Day07' },
      },
      {
        path: 'day08',
        component: Year2023Day08Component,
        data: { pathName: 'Year2023 - Day08' },
      },
      {
        path: 'day09',
        component: Year2023Day09Component,
        data: { pathName: 'Year2023 - Day09' },
      },
      {
        path: 'day10',
        component: Year2023Day10Component,
        data: { pathName: 'Year2023 - Day10' },
      },
      {
        path: 'day11',
        component: Year2023Day11Component,
        data: { pathName: 'Year2023 - Day11' },
      },
    ],
  },
];
