import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2023Day03Component } from './year2023-day03.component';

describe('Day02Component', () => {
  let component: Year2023Day03Component;
  let fixture: ComponentFixture<Year2023Day03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day03Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly parse the given test case', () => {
    expect(
      component.testCase(
        `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
      )
    ).toEqual(4361);
  });
  it('should correctly parse the given test case', () => {
    expect(
      component.testCase(
        `12.......*..
+.........34
.......-12..
..78........
..*....60...
78..........
.......23...
....90*12...
............
2.2......12.
.*.........*
1.1.......56`
      )
    ).toEqual(413);
  });
  it('should correctly parse the given test case', () => {
    expect(
      component.testCase(
        `12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56`
      )
    ).toEqual(925);
  });
  it('should correctly parse the given test case', () => {
    expect(
      component.testCase(
        `........
.24..4..
......*.`
      )
    ).toEqual(4);
  });
  it('should correctly parse the given test case', () => {
    expect(
      component.testCase(
        `....................
..-52..52-..52..52..
..................-.`
      )
    ).toEqual(156);
  });
});
