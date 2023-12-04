import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2023Day04Component } from './year2023-day04.component';

describe('Day04Component', () => {
  let component: Year2023Day04Component;
  let fixture: ComponentFixture<Year2023Day04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day04Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Part1 - Find winning numbers', () => {
    it('Example card 1', () => {
      const card = component.parseCard(
        'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
      );
      expect(card.value).toEqual(8);
    });
    it('Example card 2', () => {
      const card = component.parseCard(
        'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19'
      );
      expect(card.value).toEqual(2);
    });
    it('Example card 3', () => {
      const card = component.parseCard(
        'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1'
      );
      expect(card.value).toEqual(2);
    });
    it('Example card 4', () => {
      const card = component.parseCard(
        'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83'
      );
      expect(card.value).toEqual(1);
    });
    it('Example card 5', () => {
      const card = component.parseCard(
        'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'
      );
      expect(card.value).toEqual(0);
    });
    it('Example card 6', () => {
      const card = component.parseCard(
        'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
      );
      expect(card.value).toEqual(0);
    });
    it('Example card 7 - Real Input', () => {
      const card = component.parseCard(
        'Card   5: 81 89 38 24 64 17 48 69 43 60 | 26 45 49 48  8 19 33 38 28 60 83 27 12 23 89 13 36 88 95 65  4 20 64 62 69'
      );
      expect(card.value).toEqual(32);
    });
  });

  describe('Part2 - Count Copies of Cards', () => {
    it('Example card 1', () => {
      const card = component.parseCard(
        'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
      );
      expect(card.count).toEqual(4);
    });
    it('Example card 2', () => {
      const card = component.parseCard(
        'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19'
      );
      expect(card.count).toEqual(2);
    });
    it('Example card 3', () => {
      const card = component.parseCard(
        'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1'
      );
      expect(card.count).toEqual(2);
    });
    it('Example card 4', () => {
      const card = component.parseCard(
        'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83'
      );
      expect(card.count).toEqual(1);
    });
    it('Example card 5', () => {
      const card = component.parseCard(
        'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'
      );
      expect(card.count).toEqual(0);
    });
    it('Example card 6', () => {
      const card = component.parseCard(
        'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
      );
      expect(card.count).toEqual(0);
    });
    it('Full Card Set', () => {
      const total = component.expandCards([
        component.parseCard('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'),
        component.parseCard('Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19'),
        component.parseCard('Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1'),
        component.parseCard('Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83'),
        component.parseCard('Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'),
        component.parseCard('Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'),
      ]);
      expect(total).toEqual(30);
    });
  });
});
