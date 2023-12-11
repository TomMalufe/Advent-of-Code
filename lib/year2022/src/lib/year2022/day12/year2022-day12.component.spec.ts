import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Year2022Day12Component } from './year2022-day12.component';

describe('Year2022Day12Component', () => {
  let component: Year2022Day12Component;
  let fixture: ComponentFixture<Year2022Day12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Year2022Day12Component,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2022Day12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
