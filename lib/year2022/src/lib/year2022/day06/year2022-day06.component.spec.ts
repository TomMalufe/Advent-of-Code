import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2022Day05Component } from '../day05/year2022-day05.component';
import { Year2022Day06Component } from './year2022-day06.component';

describe('Year2022Day06Component', () => {
  let component: Year2022Day05Component;
  let fixture: ComponentFixture<Year2022Day05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2022Day06Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2022Day06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
