import { Route } from '@angular/router';
import { Year2023Day01Component } from './year2023/day01/year2023-day01.component';
import { Year2023Day02Component } from './year2023/day02/year2023-day02.component';
import { Year2023Day03Component } from './year2023/day03/year2023-day03.component';
import { Year2023Day04Component } from './year2023/day04/year2023-day04.component';
import { Year2023Day05Component } from './year2023/day05/year2023-day05.component';
import { Year2023Day06Component } from './year2023/day06/year2023-day06.component';
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
    ],
  },
];
