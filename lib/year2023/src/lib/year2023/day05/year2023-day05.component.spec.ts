import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  Source,
  SourceMap,
  Year2023Day05Component,
} from './year2023-day05.component';

describe('Year2023Day05Component', () => {
  let component: Year2023Day05Component;
  let fixture: ComponentFixture<Year2023Day05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day05Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Part1 - Find winning numbers', () => {
    it('Creates correct seed maps - source', () => {
      const seedMap = SourceMap.build('50 98 2');
      expect(seedMap.source).toEqual(98);
    });
    it('Creates correct seed maps - range', () => {
      const seedMap = SourceMap.build('52 50 48');
      expect(seedMap.range).toEqual(48);
    });

    it('getDestinationFromSource should return the correct mapped value', () => {
      const seedMap = SourceMap.build('50 98 2');
      expect(seedMap.getDestination(99)).toEqual(51);
    });
    it('getDestinationFromSource should return -1 when source is too small', () => {
      const seedMap = SourceMap.build('50 98 2');
      expect(seedMap.getDestination(20)).toEqual(-1);
    });
    it('getDestinationFromSource should return -1 when source is out of range', () => {
      const seedMap = SourceMap.build('50 98 2');
      expect(seedMap.getDestination(70)).toEqual(-1);
    });

    describe('given a simple conversion chart', () => {
      let conversionChart: Record<Source, SourceMap[]>;
      beforeEach(() => {
        conversionChart = component.processLines([
          'seeds: 79 14 55 13',
          '',
          'seed-to-soil map:',
          '50 98 2',
          '52 50 48',
        ]);
      });
      it('made a simple conversion chart', () => {
        expect(conversionChart.seed[0].range).toEqual(2);
      });
      it('made a simple conversion chart', () => {
        expect(conversionChart.seed[1].range).toEqual(48);
      });

      it('Seed number 79 corresponds to soil number 81', () => {
        const itt = component.createIterator(79, conversionChart);
        itt.next();
        expect(itt.next().value).toEqual(81);
      });
    });

    describe('given the full test input', () => {
      let itt: Iterator<any>;
      beforeAll(() => {
        const conversionChart = component.processLines([
          'seeds: 79 14 55 13',
          '',
          'seed-to-soil map:',
          '50 98 2',
          '52 50 48',
          '',
          'soil-to-fertilizer map:',
          '0 15 37',
          '37 52 2',
          '39 0 15',
          '',
          'fertilizer-to-water map:',
          '49 53 8',
          '0 11 42',
          '42 0 7',
          '57 7 4',
          '',
          'water-to-light map:',
          '88 18 7',
          '18 25 70',
          '',
          'light-to-temperature map:',
          '45 77 23',
          '81 45 19',
          '68 64 13',
          '',
          'temperature-to-humidity map:',
          '0 69 1',
          '1 0 69',
          '',
          'humidity-to-location map:',
          '60 56 37',
          '56 93 4',
        ]);
        itt = component.createIterator(14, conversionChart);
      });
      //Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
      it('Seed is 14', () => {
        expect(itt.next().value).toEqual(14);
      });
      it('soil is 14', () => {
        expect(itt.next().value).toEqual(14);
      });
      it('fertilizer is 53', () => {
        expect(itt.next().value).toEqual(53);
      });
      it('water is 42', () => {
        expect(itt.next().value).toEqual(49);
      });
      it('light is 42', () => {
        expect(itt.next().value).toEqual(42);
      });
      it('temperature is 42', () => {
        expect(itt.next().value).toEqual(42);
      });
      it('humidity is 43', () => {
        expect(itt.next().value).toEqual(43);
      });
      it('location is 43', () => {
        expect(itt.next().value).toEqual(43);
      });
    });

    describe('given the full test input', () => {
      let itt: Iterator<any>;
      beforeAll(() => {
        const conversionChart = component.processLines([
          'seeds: 79 14 55 13',
          '',
          'seed-to-soil map:',
          '50 98 2',
          '52 50 48',
          '',
          'soil-to-fertilizer map:',
          '0 15 37',
          '37 52 2',
          '39 0 15',
          '',
          'fertilizer-to-water map:',
          '49 53 8',
          '0 11 42',
          '42 0 7',
          '57 7 4',
          '',
          'water-to-light map:',
          '88 18 7',
          '18 25 70',
          '',
          'light-to-temperature map:',
          '45 77 23',
          '81 45 19',
          '68 64 13',
          '',
          'temperature-to-humidity map:',
          '0 69 1',
          '1 0 69',
          '',
          'humidity-to-location map:',
          '60 56 37',
          '56 93 4',
        ]);
        itt = component.createIterator(79, conversionChart);
      });
      //Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
      it('Seed is 79', () => {
        expect(itt.next().value).toEqual(79);
      });
      it('soil is 81', () => {
        expect(itt.next().value).toEqual(81);
      });
      it('fertilizer is 81', () => {
        expect(itt.next().value).toEqual(81);
      });
      it('water is 81', () => {
        expect(itt.next().value).toEqual(81);
      });
      it('light is 74', () => {
        expect(itt.next().value).toEqual(74);
      });
      it('temperature is 78', () => {
        expect(itt.next().value).toEqual(78);
      });
      it('humidity is 78', () => {
        expect(itt.next().value).toEqual(78);
      });
      it('location is 82', () => {
        expect(itt.next().value).toEqual(82);
      });
    });

    describe('given the full test input and the reverse iterator', () => {
      let itt: Iterator<any>;
      beforeAll(() => {
        const conversionChart = component.processLines([
          'seeds: 79 14 55 13',
          '',
          'seed-to-soil map:',
          '50 98 2',
          '52 50 48',
          '',
          'soil-to-fertilizer map:',
          '0 15 37',
          '37 52 2',
          '39 0 15',
          '',
          'fertilizer-to-water map:',
          '49 53 8',
          '0 11 42',
          '42 0 7',
          '57 7 4',
          '',
          'water-to-light map:',
          '88 18 7',
          '18 25 70',
          '',
          'light-to-temperature map:',
          '45 77 23',
          '81 45 19',
          '68 64 13',
          '',
          'temperature-to-humidity map:',
          '0 69 1',
          '1 0 69',
          '',
          'humidity-to-location map:',
          '60 56 37',
          '56 93 4',
        ]);
        itt = component.createReverseIterator(82, conversionChart);
      });
      //Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
      it('location is 82', () => {
        expect(itt.next().value).toEqual(82);
      });
      it('humidity is 78', () => {
        expect(itt.next().value).toEqual(78);
      });
      it('temperature is 78', () => {
        expect(itt.next().value).toEqual(78);
      });
      it('light is 74', () => {
        expect(itt.next().value).toEqual(74);
      });
      it('water is 81', () => {
        expect(itt.next().value).toEqual(81);
      });
      it('fertilizer is 81', () => {
        expect(itt.next().value).toEqual(81);
      });
      it('soil is 81', () => {
        expect(itt.next().value).toEqual(81);
      });
      it('Seed is 79', () => {
        expect(itt.next().value).toEqual(79);
      });
    });
  });

  // describe('Part2 - Count Copies of Cards', () => {
  //   it('Example card 1', () => {
  //     const card = component.parseCard(
  //       'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
  //     );
  //     expect(card.count).toEqual(4);
  //   });
  // });
});
