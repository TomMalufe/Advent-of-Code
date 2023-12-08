import { Route } from '@angular/router';
import { Year2022Day01Component } from './year2022/day01/year2022-day01.component';
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
    ],
  },
];
