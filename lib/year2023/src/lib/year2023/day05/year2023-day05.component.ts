import { regExToArray } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { formatDuration } from 'date-fns';
import {
  BehaviorSubject,
  delay,
  distinctUntilChanged,
  expand,
  interval,
  of,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';

export type Source =
  | 'seed'
  | 'soil'
  | 'fertilizer'
  | 'water'
  | 'light'
  | 'temperature'
  | 'humidity'
  | 'location';

const sourceToDestinationMap: Record<Source, Source> = {
  seed: 'soil',
  soil: 'fertilizer',
  fertilizer: 'water',
  water: 'light',
  light: 'temperature',
  temperature: 'humidity',
  humidity: 'location',
  location: 'location',
};
const destinationToSourceMap: Record<Source, Source> = {
  seed: 'seed',
  soil: 'seed',
  fertilizer: 'soil',
  water: 'fertilizer',
  light: 'water',
  temperature: 'light',
  humidity: 'temperature',
  location: 'humidity',
};

export class SourceMap {
  static build(line: string): SourceMap {
    const matches = line.matchAll(/\d+/g);
    return new SourceMap(
      Number.parseInt(matches.next().value),
      Number.parseInt(matches.next().value),
      Number.parseInt(matches.next().value)
    );
  }

  private constructor(
    public destination: number,
    public source: number,
    public range: number
  ) {}

  test(value: number): boolean {
    return value >= this.source && value - this.source < this.range;
  }
  testD(value: number): boolean {
    return value >= this.destination && value - this.destination < this.range;
  }

  getDestination(value: number): number {
    if (value < this.source || value - this.source > this.range) {
      return -1;
    }
    return this.destination + (value - this.source);
  }

  getSource(value: number): number {
    if (value < this.destination || value - this.destination > this.range) {
      return -1;
    }
    return this.source + (value - this.destination);
  }
}

@Component({
  selector: 'advent-year2023-day05',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './year2023-day05.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day05Component {
  results: string[] = [];
  progress$ = new BehaviorSubject<number>(0);
  progressToDisplay$ = this.progress$
    .asObservable()
    .pipe(distinctUntilChanged(), shareReplay(1));
  private previousTime = 0;
  timeRemaining$ = this.progressToDisplay$.pipe(
    switchMap((percent) => {
      const estimateTimeRemaining =
        (((100 - percent) * (Date.now() - this.previousTime)) / 1000) | 0;
      this.previousTime = Date.now();
      return of(
        formatDuration(
          {
            seconds: estimateTimeRemaining % 60,
            minutes: ((estimateTimeRemaining / 60) | 0) % 60,
          },
          { format: ['minutes', 'seconds'] }
        )
      );
    })
  );
  duration$ = new BehaviorSubject<string>('');

  processInput(value: string): void {
    const startDate = Date.now();
    const lines = value.split('\n');

    const seedsNumbers = regExToArray(lines[0].matchAll(/\d+/g)).map((it) =>
      Number.parseInt(it)
    );

    const conversionChart: Record<Source, SourceMap[]> =
      this.processLines(lines);
    let smallestLocation = Number.MAX_SAFE_INTEGER;

    let current = 0;
    const complete$ = new Subject<void>();
    of({ i: 0, j: 0 })
      .pipe(
        expand(({ i, j }) => {
          let seed = seedsNumbers[i];
          const range = Math.min(j + 100000, seedsNumbers[i + 1]);
          current += range - j;
          for (; j < range; j++) {
            const converter = this.createIterator(seed + j, conversionChart);
            while (!converter.next().done) {}
            if (converter.next().value < smallestLocation) {
              smallestLocation = converter.next().value;
              console.log(seed + j, smallestLocation);
            }
          }
          this.progress$.next((100 * (current / seedsNumbers[i + 1])) | 0);
          if (j >= seedsNumbers[i + 1]) {
            this.previousTime = Date.now();
            this.results.push(seedsNumbers[i] + '->' + smallestLocation);
            i += 2;
            j = 0;
            if (i >= seedsNumbers.length) {
              complete$.next();
              complete$.complete();
            }
          }
          return of({ i, j }).pipe(delay(1));
        }),
        takeUntil(complete$)
      )
      .subscribe();

    interval(1000)
      .pipe(takeUntil(complete$))
      .subscribe(() => {
        const seconds = ((Date.now() - startDate) / 1000) | 0;
        this.duration$.next(
          formatDuration(
            { seconds: seconds % 60, minutes: ((seconds / 60) | 0) % 60 },
            { format: ['minutes', 'seconds'] }
          )
        );
      });
  }

  processLines(lines: string[]): Record<Source, SourceMap[]> {
    const conversionChart: Record<Source, SourceMap[]> = {
      seed: [],
      soil: [],
      fertilizer: [],
      water: [],
      light: [],
      temperature: [],
      humidity: [],
      location: [],
    };
    let currentSource: Source = 'seed';

    for (let i = 3; i < lines.length; i++) {
      if (/^\d/.test(lines[i])) {
        conversionChart[currentSource].push(SourceMap.build(lines[i]));
      } else {
        conversionChart[currentSource].sort((a, b) => a.source - b.source);
        currentSource = sourceToDestinationMap[currentSource];
        i++;
      }
    }
    return conversionChart;
  }

  createIterator(seed: number, conversionChart: Record<Source, SourceMap[]>) {
    let sourceType: Source = 'seed';
    let value = seed;

    return {
      next() {
        let result;
        if (sourceType !== 'location') {
          result = { value, type: sourceType, done: false };
          value =
            conversionChart[sourceType]
              .find((it) => it.test(value))
              ?.getDestination(value) || value;
          sourceType = sourceToDestinationMap[sourceType];
          return result;
        }
        return { value, type: sourceType, done: true };
      },
    };
  }
  createReverseIterator(
    location: number,
    conversionChart: Record<Source, SourceMap[]>
  ) {
    let sourceType: Source = 'location';
    let value = location;

    return {
      next() {
        let result;
        if (sourceType !== 'seed') {
          result = { value, type: sourceType, done: false };
          sourceType = destinationToSourceMap[sourceType];
          value =
            conversionChart[sourceType]
              .find((it) => it.testD(value))
              ?.getSource(value) || value;
          return result;
        }
        return { value, type: sourceType, done: true };
      },
    };
  }
}
