import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2023Day06Component } from './year2023-day06.component';

describe('Year2023Day06Component', () => {
  let component: Year2023Day06Component;
  let fixture: ComponentFixture<Year2023Day06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day06Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Time:      7  15   30
   * Distance:  9  40  200
   */
  it('should find 4 options', () => {
    expect(component.countWinningDuration(7, 9)).toEqual(4);
  });

  it('should find 8 options', () => {
    expect(component.countWinningDuration(15, 40)).toEqual(8);
  });

  it('should find 9 options', () => {
    expect(component.countWinningDuration(30, 200)).toEqual(9);
  });

  it('Process test input', () => {
    component.processInput(`Time:      7  15   30
Distance:  9  40  200`);
    expect(component.result1).toEqual('288');
  });
});
