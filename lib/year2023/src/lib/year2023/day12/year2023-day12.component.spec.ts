import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2023Day12Component } from './year2023-day12.component';

describe('Year2023Day12Component', () => {
  let component: Year2023Day12Component;
  let fixture: ComponentFixture<Year2023Day12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day12Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given some simple test cases', () => {
    it('should find 3 arrangement for "??? 1"', () => {
      expect(component.countArrangements('??? 1')).toEqual(3);
    });
    it('should find 2 arrangement for "??? 2"', () => {
      expect(component.countArrangements('??? 2')).toEqual(2);
    });
    it('should find 1 arrangement for "?#? 1"', () => {
      expect(component.countArrangements('?#? 1')).toEqual(1);
    });
    it('should find 2 arrangement for "?#? 2"', () => {
      expect(component.countArrangements('?#? 2')).toEqual(2);
    });

    it('should find 1 arrangement for "??? 1,1"', () => {
      expect(component.countArrangements('??? 1,1')).toEqual(1);
    });
    it('should find 3 arrangement for "???? 1,1"', () => {
      expect(component.countArrangements('???? 1,1')).toEqual(3); // #.#. / #..# / .#.#
    });
    it('should find 2 arrangement for "???# 1,1"', () => {
      expect(component.countArrangements('???# 1,1')).toEqual(2);
    });
    it('should find 1 arrangement for "???? 1,2"', () => {
      expect(component.countArrangements('???? 1,2')).toEqual(1);
    });

    it('should find 2 arrangement for "?.? 1"', () => {
      expect(component.countArrangements('?.? 1')).toEqual(2);
    });
  });

  describe('given the test data', () => {
    it('should find 1 arrangement for "???.### 1,1,3"', () => {
      expect(component.countArrangements('???.### 1,1,3')).toEqual(1);
    });
    it('should find 1 arrangement for "????.#...#... 4,1,1"', () => {
      expect(component.countArrangements('????.#...#... 4,1,1')).toEqual(1);
    });
    it('should find 4 arrangement for ".??..??...?##. 1,1,3"', () => {
      expect(component.countArrangements('.??..??...?##. 1,1,3')).toEqual(4);
    });
    it('should find 1 arrangement for "?#?#?#?#?#?#?#? 1,3,1,6"', () => {
      expect(component.countArrangements('?#?#?#?#?#?#?#? 1,3,1,6')).toEqual(1);
    });
    it('should find 4 arrangement for "????.######..#####. 1,6,5"', () => {
      expect(component.countArrangements('????.######..#####. 1,6,5')).toEqual(
        4
      );
    });
    it('should find 10 arrangement for "?###???????? 3,2,1"', () => {
      expect(component.countArrangements('?###???????? 3,2,1')).toEqual(10);
    });
    it('should find 22 arrangement for "???.????????#.. 1,1,1,2,1"', () => {
      expect(component.countArrangements('???.????????#.. 1,1,1,2,1')).toEqual(
        22
      );
    });
    it('should find 1 arrangement for "??#?##?#?. 1,5"', () => {
      expect(component.countArrangements('??#?##?#?. 1,5')).toEqual(1);
    });

    it('should find 3 arrangement for "??#???? 3"', () => {
      expect(component.countArrangements('??#???? 3')).toEqual(3);
    });
  });

  describe('given the test data for Part 2', () => {
    it('should find 1 arrangement for "???.### 1,1,3"', () => {
      expect(component.countArrangementsV2('???.### 1,1,3')).toEqual(1);
    });
    it('should find 16 arrangement for "????.#...#... 4,1,1"', () => {
      expect(component.countArrangementsV2('????.#...#... 4,1,1')).toEqual(16);
    });
    it('should find 16384 arrangement for ".??..??...?##. 1,1,3"', () => {
      expect(component.countArrangementsV2('.??..??...?##. 1,1,3')).toEqual(
        16384
      );
    });
    it('should find 1 arrangement for "?#?#?#?#?#?#?#? 1,3,1,6"', () => {
      expect(component.countArrangementsV2('?#?#?#?#?#?#?#? 1,3,1,6')).toEqual(
        1
      );
    });
    it('should find 2500 arrangement for "????.######..#####. 1,6,5"', () => {
      expect(
        component.countArrangementsV2('????.######..#####. 1,6,5')
      ).toEqual(2500);
    });
    it('should find 506250 arrangement for "?###???????? 3,2,1"', () => {
      expect(component.countArrangementsV2('?###???????? 3,2,1')).toEqual(
        506250
      );
    });
  });
});
