import { Route } from '@angular/router';
import { Year2023Day01Component } from './year2023/day01/year2023-day01.component';
import { Year2023Day02Component } from './year2023/day02/year2023-day02.component';
import { Year2023Component } from './year2023/year2023.component';

export const year2023Routes: Route[] = [
  {
    path: '',
    component: Year2023Component,
    children: [
      { path: '', redirectTo: 'day01', pathMatch: 'full' },
      { path: 'day01', component: Year2023Day01Component },
      { path: 'day02', component: Year2023Day02Component },
    ],
  },
];
