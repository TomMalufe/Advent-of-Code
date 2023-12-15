import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2023Day15Component } from './year2023-day15.component';

describe('Year2023Day15Component', () => {
  let component: Year2023Day15Component;
  let fixture: ComponentFixture<Year2023Day15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2023Day15Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Part 1 tests', () => {
    it('should find HASH equal to 52', () => {
      component.processInput('HASH');
      expect(component.result1).toEqual('52');
    });
    it('should get the correct result from the test input', () => {
      component.processInput(
        'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'
      );
      expect(component.result1).toEqual('1320');
    });
  });
});
