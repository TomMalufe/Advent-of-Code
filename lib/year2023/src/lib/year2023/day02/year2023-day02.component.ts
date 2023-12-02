import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { sumAll } from '../utils';

type Color = 'red' | 'green' | 'blue';

interface CubeSet {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  sets: CubeSet[];
}

@Component({
  selector: 'advent-year2023-day02',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './year2023-day02.component.html',
  styleUrl: './year2023-day02.component.scss',
})
export class Year2023Day02Component {
  result1 = '';
  result2 = '';

  processInput(value: string): void {
    const lines = value.split('\n');
    const games = lines.map(this.parseGames);

    const winningGames1 = games.filter(this.filterV1);
    const minWinningSets = games.map((it) =>
      it.sets.reduce(this.reduceToMinWinningSet, { red: 0, green: 0, blue: 0 })
    );
    console.log(minWinningSets);

    this.result1 = '' + sumAll(winningGames1.map((it) => it.id));
    this.result2 =
      '' + sumAll(minWinningSets.map((it) => it.red * it.green * it.blue));
  }

  parseGames(inputLine: string): Game {
    const startIndex = inputLine.indexOf(':');
    const id = Number.parseInt(inputLine.slice(5, startIndex));

    const matchs = inputLine.slice(startIndex + 1).match(/([^;]+)/g);

    // @ts-ignore
    const sets: CubeSet[] =
      matchs
        ?.map((match) => {
          const colorMatches = match
            .split(',')
            .map((it) => it.match(/ (\d+) (red|green|blue)/));
          return colorMatches.map((match) =>
            match
              ? { color: match[2] as Color, count: Number.parseInt(match[1]) }
              : null
          );
        })
        .filter((it) => it !== null)
        .map((it) =>
          it.reduce(
            (prev, cur) => {
              // @ts-ignore
              prev[cur.color] = cur.count;
              return prev;
            },
            { red: 0, green: 0, blue: 0 }
          )
        ) || [];

    return { id, sets };
  }

  /**
   * Determine which games would have been possible if the bag had been loaded with only
   * * 12 red cubes,
   * * 13 green cubes, and
   * * 14 blue cubes.
   * What is the sum of the IDs of those games?
   * @param inputLine
   */
  filterV1 = (item: Game) =>
    item.sets.every((it) => it.red <= 12 && it.green <= 13 && it.blue <= 14);

  reduceToMinWinningSet = (prev: CubeSet, cur: CubeSet) => {
    prev.red = cur.red > prev.red ? cur.red : prev.red;
    prev.green = cur.green > prev.green ? cur.green : prev.green;
    prev.blue = cur.blue > prev.blue ? cur.blue : prev.blue;
    return prev;
  };
}
