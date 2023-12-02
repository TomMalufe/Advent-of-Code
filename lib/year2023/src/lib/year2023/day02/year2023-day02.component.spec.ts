import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Year2023Day02Component } from './year2023-day02.component';

describe('Day02Component', () => {
  let component: Year2023Day02Component;
  let fixture: ComponentFixture<Year2023Day02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Year2023Day02Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Year2023Day02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
