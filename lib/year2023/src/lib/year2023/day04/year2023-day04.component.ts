import { regExToArray, sumAll } from '@advent/shared';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DayTemplateComponent } from '../day-template.component';

interface Card {
  id: number;
  winning: number[];
  given: number[];
  value: number;
  count: number;
}

@Component({
  selector: 'advent-year2023-day04',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day04Component extends DayTemplateComponent {
  processInput(value: string): void {
    const lines = value.split('\n');

    const cards = lines.map(this.parseCard);
    console.log(cards);

    this.result1 = '' + sumAll(cards.map((it) => it.value));
    this.result2 = '' + this.expandCards(cards);
  }

  parseCard(inputLine: string): Card {
    const [_, idPart, winningPart, givenPart] = inputLine
      .matchAll(/Card\s+(\d+): ([^|]+)\|(.+)$/g)
      .next().value;

    const winning = regExToArray(winningPart.matchAll(/\d+/g));
    const given = regExToArray(givenPart.matchAll(/\d+/g));
    const count = given.reduce(
      (previousValue, currentValue) =>
        winning.includes(currentValue) ? previousValue + 1 : previousValue,
      0
    );

    return {
      id: Number.parseInt(idPart),
      winning: winning.map(Number.parseInt),
      given: given.map(Number.parseInt),
      value: count > 0 ? Math.pow(2, count - 1) : 0,
      count,
    };
  }

  expandCards(cards: Card[]): number {
    const cardCounts = cards.map(() => 1);
    for (let j = 0; j < cards.length; j++) {
      for (let i = 1; i <= cards[j].count; i++) {
        cardCounts[j + i] += cardCounts[j];
      }
    }
    console.log(cardCounts);
    return sumAll(cardCounts);
  }
}
