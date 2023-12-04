import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TEST_CASES } from './test-cases';
import { Year2023Day03Component } from './year2023-day03.component';

describe('Day03Component', () => {
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

  describe('testCase1', () => {
    it('should correctly parse the given test case', () => {
      expect(component.testCase(TEST_CASES[0].input)).toEqual(
        TEST_CASES[0].expected
      );
    });
    it('should correctly parse the given test case', () => {
      expect(component.testCase(TEST_CASES[1].input)).toEqual(
        TEST_CASES[1].expected
      );
    });
    it('should correctly parse the given test case', () => {
      expect(component.testCase(TEST_CASES[2].input)).toEqual(
        TEST_CASES[2].expected
      );
    });
    it('should correctly parse the given test case', () => {
      expect(component.testCase(TEST_CASES[3].input)).toEqual(
        TEST_CASES[3].expected
      );
    });
    it('should correctly parse the given test case', () => {
      expect(component.testCase(TEST_CASES[4].input)).toEqual(
        TEST_CASES[4].expected
      );
    });
    it('should correctly parse the given test case', () => {
      expect(component.testCase(TEST_CASES[5].input)).toEqual(
        TEST_CASES[5].expected
      );
    });
    it('should correctly parse the given test case', () => {
      expect(component.testCase(TEST_CASES[6].input)).toEqual(
        TEST_CASES[6].expected
      );
    });
  });

  describe('testCase2', () => {
    it('should correctly parse test case 0', () => {
      expect(component.testCase2(TEST_CASES[0].input)).toEqual(
        TEST_CASES[0].expected2
      );
    });
    it('should correctly parse test case 1', () => {
      expect(component.testCase2(TEST_CASES[1].input)).toEqual(
        TEST_CASES[1].expected2
      );
    });
    it('should correctly parse test case 2', () => {
      expect(component.testCase2(TEST_CASES[2].input)).toEqual(
        TEST_CASES[2].expected2
      );
    });
  });
});
