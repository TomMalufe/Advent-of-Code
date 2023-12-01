import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Year2022Day01Component } from './year2022-day01.component';

describe('Year2022Day01Component', () => {
  let component: Year2022Day01Component;
  let fixture: ComponentFixture<Year2022Day01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Year2022Day01Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2022Day01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
