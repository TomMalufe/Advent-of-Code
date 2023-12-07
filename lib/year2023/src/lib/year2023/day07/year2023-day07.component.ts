import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

type CardType =
  | 'A'
  | 'K'
  | 'Q'
  | 'T'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2'
  | 'J';
const CARD_VALUES: Record<CardType, number> = {
  A: 12,
  K: 11,
  Q: 10,
  T: 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1,
  J: 0,
};
export enum HandValues {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  FIVE_OF_A_KIND,
}

export class CamelCardHand {
  private _cards: Record<CardType, number> = {
    A: 0,
    K: 0,
    Q: 0,
    J: 0,
    T: 0,
    '9': 0,
    '8': 0,
    '7': 0,
    '6': 0,
    '5': 0,
    '4': 0,
    '3': 0,
    '2': 0,
  };
  get hand(): string {
    return this._hand;
  }
  get bet(): number {
    return this._bet;
  }
  private _handValue: HandValues = 0;
  get handValue(): HandValues {
    return this._handValue;
  }
  compare(handB: CamelCardHand): number {
    if (this.handValue === handB.handValue) {
      let i = 0;
      while (
        i < this.hand.length &&
        CARD_VALUES[this.hand.charAt(i) as CardType] ===
          CARD_VALUES[handB.hand.charAt(i) as CardType]
      ) {
        i++;
      }
      if (i >= this.hand.length) {
        return 0;
      }
      return (
        CARD_VALUES[this.hand.charAt(i) as CardType] -
        CARD_VALUES[handB.hand.charAt(i) as CardType]
      );
    }
    return this.handValue - handB.handValue;
  }

  private constructor(private _hand: string, private _bet: number) {
    for (let i = 0; i < _hand.length; i++) {
      this._cards[_hand.charAt(i) as CardType]++;
    }
    const JOKERS = this._cards.J;
    this._cards.J = 0;
    const counts = Object.values(this._cards)
      .filter((it) => it > 0)
      .sort((a, b) => b - a);
    switch ((counts[0] || 0) + JOKERS) {
      case 5:
        this._handValue = HandValues.FIVE_OF_A_KIND;
        break;
      case 4:
        this._handValue = HandValues.FOUR_OF_A_KIND;
        break;
      case 3:
        if (counts[1] === 2) {
          this._handValue = HandValues.FULL_HOUSE;
        } else {
          this._handValue = HandValues.THREE_OF_A_KIND;
        }
        break;
      case 2:
        if (counts[1] === 2) {
          this._handValue = HandValues.TWO_PAIR;
        } else {
          this._handValue = HandValues.ONE_PAIR;
        }
        break;
      default:
        this._handValue = HandValues.HIGH_CARD;
    }
  }

  static create(hand: string, bet: number): CamelCardHand {
    return new CamelCardHand(hand, bet);
  }
}

@Component({
  selector: 'advent-year2023-day07',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule],
  templateUrl: '../day-template.component.html',
  styleUrl: '../day-template.component.scss',
})
export class Year2023Day07Component {
  result1 = '';
  result2 = '';

  processInput(value: string): void {
    const matches = value.matchAll(/([2-9AKQJT]{5}) (\d+)/g);

    const hands = Array.from(matches, (it) =>
      CamelCardHand.create(it[1], Number.parseInt(it[2]))
    );
    hands.sort((a, b) => a.compare(b));
    const winnings = hands.reduce(
      (previousValue, currentValue, currentIndex) =>
        previousValue + currentValue.bet * (currentIndex + 1),
      0
    );

    this.result1 = '' + winnings;
    this.result2 = '';
  }
}
