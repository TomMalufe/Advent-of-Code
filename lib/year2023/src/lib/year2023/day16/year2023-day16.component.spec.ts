import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2023Day16Component } from './year2023-day16.component';

describe('Year2023Day16Component', () => {
  let component: Year2023Day16Component;
  let fixture: ComponentFixture<Year2023Day16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day16Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Part 1', () => {
    it('should give correct result from example input', () => {
      component.processInput(
        String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`
      );
      expect(component.result1).toEqual('46');
    });
  });
});
