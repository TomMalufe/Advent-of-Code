import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2023Day17Component } from './year2023-day17.component';

describe('Year2023Day17Component', () => {
  let component: Year2023Day17Component;
  let fixture: ComponentFixture<Year2023Day17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day17Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given the Part 1 example input', () => {
    it('should find a route that takes only 102 heat loss', () => {
      component.processInput(`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`);
      expect(component.result1).toEqual('102');
    });
  });
});
