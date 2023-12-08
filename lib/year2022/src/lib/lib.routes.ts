import { Route } from '@angular/router';
import { Year2022Day01Component } from './year2022/day01/year2022-day01.component';
import { Year2022Day02Component } from './year2022/day02/year2022-day02.component';
import { Year2022Day03Component } from './year2022/day03/year2022-day03.component';
import { Year2022Day04Component } from './year2022/day04/year2022-day04.component';
import { Year2022Day05Component } from './year2022/day05/year2022-day05.component';
import { Year2022Component } from './year2022/year2022.component';

export const year2022Routes: Route[] = [
  {
    path: '',
    component: Year2022Component,
    children: [
      { path: '', redirectTo: 'day01', pathMatch: 'full' },
      {
        path: 'day01',
        component: Year2022Day01Component,
        data: { pathName: 'Year2022 - Day01' },
      },
      {
        path: 'day02',
        component: Year2022Day02Component,
        data: { pathName: 'Year2022 - Day02' },
      },
      {
        path: 'day03',
        component: Year2022Day03Component,
        data: { pathName: 'Year2022 - Day03' },
      },
      {
        path: 'day04',
        component: Year2022Day04Component,
        data: { pathName: 'Year2022 - Day04' },
      },
      {
        path: 'day05',
        component: Year2022Day05Component,
        data: { pathName: 'Year2022 - Day05' },
      },
    ],
  },
];
