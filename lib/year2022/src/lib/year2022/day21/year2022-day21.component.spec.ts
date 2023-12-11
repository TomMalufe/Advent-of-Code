import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2022Day21Component } from './year2022-day21.component';

describe('Year2022Day21Component', () => {
  let component: Year2022Day21Component;
  let fixture: ComponentFixture<Year2022Day21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2022Day21Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2022Day21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
