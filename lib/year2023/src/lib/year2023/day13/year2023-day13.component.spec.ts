import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2023Day13Component } from './year2023-day13.component';

describe('Year2023Day13Component', () => {
  let component: Year2023Day13Component;
  let fixture: ComponentFixture<Year2023Day13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day13Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Part 1 tests', () => {
    it('given the first test pattern', () => {
      component.processInput(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`);
      expect(component.result1).toEqual('300');
    });
    it('given the second test pattern', () => {
      component.processInput(`#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`);
      expect(component.result1).toEqual('100');
    });
    it('given the full test pattern', () => {
      component.processInput(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`);
      expect(component.result1).toEqual('400');
    });
    it('given a real input pattern', () => {
      component.processInput(`..#....#.
..######.
..###.##.
####..###
...####..
###.##.##
##.####.#
...#..#..
..######.`);
      expect(component.result1).toEqual('5');
    });
    it('given a real pattern that previously failed', () => {
      component.processInput(`#..#.##.#..
###.####.##
###.####.##
###.####.##
###.####.##
#..#.##.#..
.#..#..#..#
..#.####.#.
####....###
..#......#.
.#.........
#...#..#...
####....###
.##......##
#...####...
###.#..#.##
#.########.`);
      expect(component.result1).toEqual('6');
    });
    it('given another real pattern that previously failed', () => {
      component.processInput(`##.##....##...#
.####....####..
#####....####..
#...####.#.....
#..##..####...#
#..##......##..
.##...##..#..##
#.#...#.#.#..##
..##.#..####...
..##.#..####...
#.#...#.#.#..##
.##...##..#..##
#..##......##..
#..##..####...#
#...####.#.....
#####....####..
.####....####..`);
      expect(component.result1).toEqual('1600');
    });
  });
});
