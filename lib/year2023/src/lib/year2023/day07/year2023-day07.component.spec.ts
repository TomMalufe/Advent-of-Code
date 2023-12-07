import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  CamelCardHand,
  HandValues,
  Year2023Day07Component,
} from './year2023-day07.component';

describe('Year2022Day07Component', () => {
  let component: Year2023Day07Component;
  let fixture: ComponentFixture<Year2023Day07Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day07Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('CamelCardHand test', () => {
    it('should find a High Card in 42T3K', () => {
      const hand = CamelCardHand.create('42T3K', 0);
      expect(hand.handValue).toEqual(HandValues.HIGH_CARD);
    });
    it('should find a pair in 32T3K', () => {
      const hand = CamelCardHand.create('32T3K', 0);
      expect(hand.handValue).toEqual(HandValues.ONE_PAIR);
    });
    it('should find a pair in KK677', () => {
      const hand = CamelCardHand.create('KK677', 0);
      expect(hand.handValue).toEqual(HandValues.TWO_PAIR);
    });
    it('should find Three of a Kind in T55J5', () => {
      const hand = CamelCardHand.create('T55J5', 0);
      expect(hand.handValue).toEqual(HandValues.FOUR_OF_A_KIND);
    });
    it('should find a pair in TTJJT', () => {
      const hand = CamelCardHand.create('TTJJT', 0);
      expect(hand.handValue).toEqual(HandValues.FIVE_OF_A_KIND);
    });
    it('should find a pair in QQQQA', () => {
      const hand = CamelCardHand.create('QQQQA', 0);
      expect(hand.handValue).toEqual(HandValues.FOUR_OF_A_KIND);
    });
    it('should find a pair in JJJJJ', () => {
      const hand = CamelCardHand.create('JJJJJ', 0);
      expect(hand.handValue).toEqual(HandValues.FIVE_OF_A_KIND);
    });

    it('should be able to compare two hands', () => {
      const handA = CamelCardHand.create('T55J5', 0);
      const handB = CamelCardHand.create('KK677', 0);
      expect(handA.compare(handB)).toBeGreaterThan(0);
    });

    it('should be able to compare two similar hands', () => {
      const handA = CamelCardHand.create('KK677', 0);
      const handB = CamelCardHand.create('KK877', 0);
      expect(handA.compare(handB)).toBeLessThan(0);
    });

    it('should be able to compare two similar hands', () => {
      const handA = CamelCardHand.create('55577', 0);
      const handB = CamelCardHand.create('J5577', 0);
      expect(handA.compare(handB)).toBeGreaterThan(0);
    });
  });
});
